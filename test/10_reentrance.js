const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Reentrance', function () {
  const INITIAL_ETH = ethers.utils.parseEther('0.001');
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const Reentrance = await ethers.getContractFactory('Reentrance', deployer);
    const ReentranceSolution = await ethers.getContractFactory('ReentranceSolution', attacker);

    this.reentrance = await Reentrance.deploy();
    this.reentranceSolution = await ReentranceSolution.deploy(this.reentrance.address);
    // Send 0.001 eth
    await ethers.provider.send('hardhat_setBalance', [this.reentrance.address, '0x38D7EA4C68000']);

    expect(await ethers.provider.getBalance(this.reentrance.address)).to.be.eq(INITIAL_ETH);
  });

  it('Drains the contract eth', async function () {
    const tx = await this.reentranceSolution.connect(attacker).attack({ value: INITIAL_ETH });
    await tx.wait();

    // TODO: Need to figure out how to import SafeMath on 0.6 version in order to make this test pass
    expect(await ethers.provider.getBalance(this.reentrance.address)).to.be.eq(ethers.utils.parseEther('0'));
  });
});
