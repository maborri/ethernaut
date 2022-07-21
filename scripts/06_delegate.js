const hre = require('hardhat');

async function main() {
  // Run on the console:
  // await sendTransaction({
  //   from: player,
  //   to: contract.address,
  //   data: web3.eth.abi.encodeFunctionSignature('pwn()'),
  // });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
