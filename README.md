# Mirror Yield Anchor

Inspired by [YunSuk Yeo](https://github.com/YunSuk-Yeo)'s [autostaker](https://github.com/YunSuk-Yeo/autostaker), this helper tool automates claiming liquidity providing rewards from [Mirror Protocol](https://mirror.finance), swapping the rewards to TerraUSD stablecoin, and putting the rewards into [Anchor Protocol](https://anchorprotocol.com).

## Usage

1. Create .env file with following contents

```env
MNEMONIC=""
TARGET_ASSET="MIR"
```  

* MNEMONIC is your wallet seed phrase
* TARGET is your desired autostake asset, one of ['MIR', 'mTSLA', 'mETH', etc...]

> You can leave `MNEMONIC=""` and then run the program using `npm start -- --mnemonic="your mnemonic"`

1. install dependency

```bash
yarn
```

2. start 

```bash
npm start
```
