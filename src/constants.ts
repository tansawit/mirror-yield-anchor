export const args = require('minimist')(process.argv.slice(2));

export const LCD_URL =
  args.lcd == undefined
    ? process.env.LCD_URL || 'https://lcd.terra.dev'
    : args.lcd;

export const MNEMONIC =
  process.env.MNEMONIC == '' ? args.mnemonic : process.env.MNEMONIC;

export const MNEMONIC_INDEX = parseInt(process.env.MNEMONIC_INDEX || '0');
export const COIN_TYPE = parseInt(process.env.COIN_TYPE || '330');
export const CONTRACT_EXEC_DELAY_SEC = parseInt(
  process.env.CONTRACT_EXEC_DELAY_SEC || '15000'
);

export const TARGET_ASSET = process.env.TARGET_ASSET || 'MIR';

export const CONTRACTS = {
  bLunaHub: 'terra1mtwph2juhj0rvjz7dy92gvl6xvukaxu8rfv8ts',
  blunaToken: 'terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp',
  blunaReward: 'terra17yap3mhph35pcwvhza38c2lkj7gzywzy05h7l0',
  blunaAirdrop: 'terra199t7hg7w5vymehhg834r6799pju2q3a0ya7ae9',
  mmInterestModel: 'terra1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n',
  mmOracle: 'terra1cgg6yef7qcdm070qftghfulaxmllgmvk77nc7t',
  mmMarket: 'terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s',
  mmOverseer: 'terra1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8',
  mmCustody: 'terra1ptjp2vfjrwh0j0faj9r6katm640kgjxnwwq9kn',
  mmLiquidation: 'terra1w9ky73v4g7v98zzdqpqgf3kjmusnx4d4mvnac6',
  mmDistributionModel: 'terra14mufqpr5mevdfn92p4jchpkxp7xr46uyknqjwq',
  aTerra: 'terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu',
  terraswapblunaLunaPair: 'terra1jxazgm67et0ce260kvrpfv50acuushpjsz2y0p',
  terraswapblunaLunaLPToken: 'terra1nuy34nwnsh53ygpc4xprlj263cztw7vc99leh2',
  terraswapAncUstPair: 'terra1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3',
  terraswapAncUstLPToken: 'terra1gecs98vcuktyfkrve9czrpgtg0m3aq586x6gzm',
  gov: 'terra1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5',
  distributor: 'terra1mxf7d5updqxfgvchd7lv6575ehhm8qfdttuqzz',
  collector: 'terra14ku9pgw5ld90dexlyju02u4rn6frheexr5f96h',
  community: 'terra12wk8dey0kffwp27l5ucfumczlsc9aned8rqueg',
  staking: 'terra1897an2xux840p9lrh6py3ryankc6mspw49xse3',
  ANC: 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
  airdrop: 'terra146ahqn6d3qgdvmj8cj96hh03dzmeedhsf0kxqm'
};
