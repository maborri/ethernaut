const hre = require('hardhat');

async function main() {
  const INITIAL_ETH = ethers.utils.parseEther('0.001');
  // Ethernaut level
  const elevatorContract = '0xeae994a652277BDf914f26D8CB8ebf4C9fe8354A';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const ElevatorSolution = await ethers.getContractFactory('ElevatorSolution', deployer);
  const elevatorSolution = await ElevatorSolution.deploy(elevatorContract);

  const tx = await elevatorSolution.goTo(1);
  await tx.wait();

  console.log('On the top');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
