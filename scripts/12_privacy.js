const hre = require('hardhat');

async function main() {
  // Run on the console:
  // const key = await web3.eth.getStorageAt(contract.address, 5, console.log)
  // await contract.unlock(key.slice(0,34))
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
