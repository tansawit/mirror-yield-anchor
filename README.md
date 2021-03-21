# Mirror Yield Anchor

Based off of [YunSuk Yeo](https://github.com/YunSuk-Yeo)'s [autostaker](https://github.com/YunSuk-Yeo/autostaker), this helper tool automates claiming liquidity providing rewards from [Mirror Protocol](https://mirror.finance), swapping the rewards to TerraUSD stablecoin, and putting the rewards into [Anchor Protocol](https://anchorprotocol.com).

## Usage

1. Create .env file with following contents

```env
MNEMONIC="..."
TARGET_ASSET="mSLV"

REWARD_CHECK_INTERVAL_MIN=720
CONTRACT_EXEC_DELAY_SEC=15
MNEMONIC_INDEX=0
COIN_TYPE=330
LCD_URL="https://lcd.terra.dev"

bLunaHub= 'terra1mtwph2juhj0rvjz7dy92gvl6xvukaxu8rfv8ts',
blunaToken= 'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp',
blunaReward= 'terra17yap3mhph35pcwvhza38c2lkj7gzywzy05h7l0',
blunaAirdrop= 'terra199t7hg7w5vymehhg834r6799pju2q3a0ya7ae9',
mmInterestModel= 'terra1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n',
mmOracle= 'terra1cgg6yef7qcdm070qftghfulaxmllgmvk77nc7t',
mmMarket= 'terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s',
mmOverseer= 'terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8',
mmCustody= 'terra1ptjp2vfjrwh0j0faj9r6katm640kgjxnwwq9kn',
mmLiquidation= 'terra1w9ky73v4g7v98zzdqpqgf3kjmusnx4d4mvnac6',
mmDistributionModel= 'terra14mufqpr5mevdfn92p4jchpkxp7xr46uyknqjwq',
aTerra= 'terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu',
terraswapblunaLunaPair= 'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p',
terraswapblunaLunaLPToken= 'terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2',
terraswapAncUstPair= 'terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3',
terraswapAncUstLPToken= 'terra1gecs98vcuktyfkrve9czrpgtg0m3aq586x6gzm',
gov= 'terra1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5',
distributor= 'terra1mxf7d5updqxfgvchd7lv6575ehhm8qfdttuqzz',
collector= 'terra14ku9pgw5ld90dexlyju02u4rn6frheexr5f96h',
community= 'terra12wk8dey0kffwp27l5ucfumczlsc9aned8rqueg',
staking= 'terra1897an2xux840p9lrh6py3ryankc6mspw49xse3',
ANC= 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
airdrop= 'terra146ahqn6d3qgdvmj8cj96hh03dzmeedhsf0kxqm',
team_vesting= 'terra1pm54pmw3ej0vfwn3gtn6cdmaqxt0x37e9jt0za',
investor_vesting= 'terra10evq9zxk2m86n3n3xnpw28jpqwp628c6dzuq42'
```  

* MNEMONIC is your wallet seed phrase

> You can leave `MNEMONIC=""` and then run the program using `npm start -- --mnemonic="your mnemonic"`

1. install dependency

```bash
yarn
```

2. start 

```bash
npm start
```
