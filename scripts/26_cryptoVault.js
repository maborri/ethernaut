const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const cryptoVaultContract = '0xc3e823D2CB8B6aCc887f04953269aAc93cc790F5';
  const fortaAddress = '0xAE1c749A2ec5BDaa988D7b2ce36F9F620239df1c';
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const CryptoVaultSolution = await ethers.getContractFactory('CryptoVaultSolution', deployer);
  const cryptoVaultSolution = await CryptoVaultSolution.deploy(cryptoVaultContract);

  const forta = await ethers.getContractAt('Forta', fortaAddress);
  await forta.connect(deployer).setDetectionBot(cryptoVaultSolution.address);

  console.log('Bot set');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
