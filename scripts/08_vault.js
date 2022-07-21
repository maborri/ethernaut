const hre = require('hardhat');

async function main() {
  // Run on the console:
  // await contract.unlock(await web3.eth.getStorageAt(contract.address, 1, console.log))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
