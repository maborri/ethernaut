const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Ethernaut level
  const magicNumContract = '0x18eD4cb6c55A923bD8D6c01422150d3D3cb741af';
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const MagicNum = await ethers.getContractFactory('MagicNum', deployer);
  const magicNum = await MagicNum.attach(magicNumContract);

  //https://monokh.com/posts/ethereum-contract-creation-bytecode
  //602a60005260206000f3
  //602a60005360206000f3 --> careful, 53 only stores uint8.
  const tx = await deployer.sendTransaction({ data: '0x600A600C600039600A6000F3602A60005260206000F3' });
  const res = await tx.wait();
  console.log('New solver created at address:', res.contractAddress);

  await magicNum.setSolver(res.contractAddress);
  console.log('Solver set');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
