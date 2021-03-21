require('dotenv').config();
import {
  LCD_URL,
  MNEMONIC,
  MNEMONIC_INDEX,
  COIN_TYPE,
  CONTRACTS
} from './constants';
import {
  LCDClient,
  Wallet,
  MnemonicKey,
  StdFee,
  Coins
} from '@terra-money/terra.js';
import {
  fabricateDepositStableCoin,
  AddressProvider,
  AddressProviderFromJson,
  AddressMap
} from '@anchor-protocol/anchor.js';

export default class Anc {
  address: string;
  wallet: Wallet;
  lcd: LCDClient;
  addressProvider: AddressProvider;

  constructor() {
    const key = new MnemonicKey({
      mnemonic: MNEMONIC,
      index: MNEMONIC_INDEX,
      coinType: COIN_TYPE
    });

    const lcd = new LCDClient({
      URL: LCD_URL,
      chainID: 'columbus-4',
      gasPrices: new Coins({ uusd: 0.15 }),
      gasAdjustment: 1.2
    });

    this.address = key.accAddress;
    this.addressProvider = new AddressProviderFromJson(<AddressMap>CONTRACTS);
    this.wallet = new Wallet(lcd, key);
    this.lcd = lcd;
  }

  async balance() {
    const balance = await this.lcd.bank.balance(this.address);
    if ('uusd' in balance['_coins']) {
      return (
        (balance['_coins']['uusd']['amount'] - 20_000_000) /
        1e6
      ).toString();
    }
    return '0';
  }

  async process() {
    console.log('Depositing UST balance to Anchor');
    const balance: string = await this.balance();
    const depositMsg = fabricateDepositStableCoin({
      address: this.address,
      symbol: 'usd',
      amount: balance
    })(this.addressProvider);
    const tx = await this.wallet.createAndSignTx({
      msgs: depositMsg,
      fee: new StdFee(2_000_000, { uusd: 2_000_000 })
    });
    const details = await this.lcd.tx.broadcastSync(tx);
    console.log(`  >> ${balance} UST deposited.`);
    return details;
  }
}
