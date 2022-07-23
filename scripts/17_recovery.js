const hre = require('hardhat');

async function main() {
  // Simple token contract (found via etherscan)
  const simpleTokenContract = '0x3961Ffa4720891b8b492e1d20B9357B627Bc70A2';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const SimpleToken = await ethers.getContractFactory('SimpleToken', deployer);
  const simpleToken = await SimpleToken.attach(simpleTokenContract);

  await simpleToken.destroy(deployer.address);

  console.log('Recovery/destroy done');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
