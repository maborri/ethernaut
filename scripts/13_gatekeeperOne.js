const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const gatekeeperOneContract = '0xC8A9378E6bC8a3e65648363D259aA2dAd620586b';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const GatekeeperOneSolution = await ethers.getContractFactory('GatekeeperOneSolution', deployer);
  const gatekeeperOneSolution = await GatekeeperOneSolution.deploy(gatekeeperOneContract);

  const tx = await gatekeeperOneSolution.enter(deployer.address, {
    gasLimit: 120000
  });
  await tx.wait();

  console.log('Gatekeeper passed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
