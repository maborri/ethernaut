const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const denialContract = '0x0dC5f905131A064074234b484B1cEC49bc90256a';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const DenialSolution = await ethers.getContractFactory('DenialSolution', deployer);
  const denialSolution = await DenialSolution.deploy(denialContract);

  const tx = await denialSolution.setPartner();
  await tx.wait();

  console.log('Denied');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
