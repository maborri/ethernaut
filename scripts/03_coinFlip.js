const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const coinFlipContractAddress = '0xf521721105D94bb466B4b12467622bD459be079e';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const CoinFlipSolution = await hre.ethers.getContractFactory('CoinFlipSolution', deployer);
  const coinFlipSolution = await CoinFlipSolution.deploy(coinFlipContractAddress);

  for (let i = 0; i < 10; i++) {
    let turn = await coinFlipSolution.play();
    await turn.wait();
  }
  console.log('Coin flipped 10 times');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
