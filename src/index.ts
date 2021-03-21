require('dotenv').config();

import Mir from './Mirror';
import Anc from './Anchor';
const REWARD_CHECK_INTERVAL_MIN = parseInt(
  process.env.REWARD_CHECK_INTERVAL_MIN || '10'
);

async function main() {
  const mir = new Mir();
  const anc = new Anc();

  // Graceful shutdown
  let shutdown = false;

  const gracefulShutdown = () => {
    shutdown = true;
  };

  process.once('SIGINT', gracefulShutdown);
  process.once('SIGTERM', gracefulShutdown);

  while (!shutdown) {
    await mir.process().catch((err) => {
      console.log(err);
      process.exit(-1);
    });
    await anc.process().catch((err) => {
      console.log(err);
      process.exit(-1);
    });
    console.log('Done');
    await sleep(REWARD_CHECK_INTERVAL_MIN * 60 * 1000);
  }

  process.exit(0);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((err) => {
  console.error(`Exit with ${err}`);
});
