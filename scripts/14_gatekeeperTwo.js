const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const gatekeeperTwoContract = '0x7c32b3cA9ef59dF669cE1fa6fAE464b1302da0E7';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const GatekeeperTwoSolution = await ethers.getContractFactory('GatekeeperTwoSolution', deployer);
  await GatekeeperTwoSolution.deploy(gatekeeperTwoContract);

  console.log('Gatekeeper passed again');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
