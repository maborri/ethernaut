const hre = require('hardhat');

async function main() {
  // Run on the console the following to get an overflow:
  // await contract.transfer('0x0000000000000000000000000000000000000000', 21);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
