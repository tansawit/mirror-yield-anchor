// Original code taken from https://github.com/YunSuk-Yeo/autostaker/blob/master/src/AutoStaker.ts

import {
  LCD_URL,
  MNEMONIC,
  MNEMONIC_INDEX,
  COIN_TYPE,
  CONTRACTS,
  CONTRACT_EXEC_DELAY_SEC,
  TARGET_ASSET
} from './constants';
import { Mirror } from '@mirror-protocol/mirror.js';
import {
  MnemonicKey,
  LCDClient,
  MsgExecuteContract,
  Wallet,
  isTxError,
  Int,
  Coin,
  StdFee,
  Coins
} from '@terra-money/terra.js';

export default class AutoStaker {
  wallet: Wallet;
  mirror: Mirror;
  lcd: LCDClient;
  assetTokenAddr: string;

  constructor() {
    const key = new MnemonicKey({
      mnemonic: MNEMONIC,
      index: MNEMONIC_INDEX,
      coinType: COIN_TYPE
    });

    const lcd = new LCDClient({
      URL: LCD_URL,
      chainID: 'columbus-4',
      gasPrices: new Coins({ uluna: 1.5 }),
      gasAdjustment: 1.2
    });

    this.mirror = new Mirror({
      key,
      lcd
    });

    this.wallet = new Wallet(lcd, key);
    this.lcd = lcd;
    this.assetTokenAddr = '';
  }

  async execute(msgs: Array<MsgExecuteContract>) {
    // Use static fee
    const tx = await this.wallet.createAndSignTx({
      msgs
    });

    const result = await this.wallet.lcd.tx.broadcastSync(tx);

    if (isTxError(result)) {
      console.log(JSON.stringify(result));
      throw new Error(
        `Error while executing: ${result.code} - ${result.raw_log}`
      );
    }

    await this.pollingTx(result.txhash);
    await sleep(CONTRACT_EXEC_DELAY_SEC * 1000); // necessary to stagger contract execution so that various LB'd servers can be synced on the last transaction completed
  }

  async pollingTx(txHash: string) {
    let isFound = false;

    while (!isFound) {
      try {
        await this.wallet.lcd.tx.txInfo(txHash);
        isFound = true;
      } catch (err) {
        await sleep(3000);
      }
    }
  }

  async process() {
    const mirrorToken = this.mirror.assets['MIR'];
    const assetToken = this.mirror.assets[TARGET_ASSET];

    this.assetTokenAddr = assetToken.token.contractAddress as string;

    console.log(`============== ${new Date().toLocaleString()} ==============`);

    // if no rewards exists, skip procedure
    if (!(await this.rewardsToClaim())) return;

    console.log('Claim Rewards');
    await this.execute([this.mirror.staking.withdraw()]);
    const mirBalanceResponse = await this.mirror.mirrorToken.getBalance();
    const mirBalance = new Int(mirBalanceResponse.balance);
    console.log('  >> Wallet Mirror Balance:', toDecimal(mirBalance));

    console.log('Swap mirror rewards to UST');
    await this.execute([
      mirrorToken.pair.swap(
        {
          info: {
            token: {
              contract_addr: mirrorToken.token.contractAddress as string
            }
          },
          amount: new Int(mirBalance).toString()
        },
        {
          offer_token: mirrorToken.token
        }
      )
    ]);
    const uusdBalanceResponse = await this.lcd.bank.balance(
      this.wallet.key.accAddress
    );
    const uusdBalance = (uusdBalanceResponse.get('uusd') as Coin).amount; // balance in wallet
    console.log('  >> Wallet UST Balance:', toDecimal(uusdBalance));
  }
  async rewardsToClaim() {
    const poolInfo = await this.mirror.staking.getPoolInfo(this.assetTokenAddr);
    const rewardInfoResponse = await this.mirror.staking.getRewardInfo(
      this.wallet.key.accAddress,
      this.assetTokenAddr
    );
    const hasRewards =
      poolInfo.reward_index !== rewardInfoResponse.reward_infos[0].index;
    if (!hasRewards) console.log('No Rewards to Claim this Interval');
    return hasRewards;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toDecimal(ms: any) {
  if (ms.d.length === 1) {
    return ms.d[0] / 1000000;
  } else {
    return ms.d[0] * 10 + ms.d[1] / 1000000;
  }
}
