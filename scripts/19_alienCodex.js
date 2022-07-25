const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const alienCodexContract = '0x4c1beCEB8748B71607d84B2428B4082e7DdFbDBa';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const AlienCodexSolution = await ethers.getContractFactory('AlienCodexSolution', deployer);
  const alienCodexSolution = await AlienCodexSolution.deploy(alienCodexContract);

  const tx = await alienCodexSolution.takeOwnership();
  await tx.wait();

  console.log('Got the alien codex');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
