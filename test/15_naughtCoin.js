const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Naught Coin', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const NaughtCoin = await ethers.getContractFactory('NaughtCoin', deployer);
    const NaughtCoinSolution = await ethers.getContractFactory('NaughtCoinSolution', attacker);

    this.naughtCoin = await NaughtCoin.deploy(attacker.address);
    this.naughtCoinSolution = await NaughtCoinSolution.deploy(this.naughtCoin.address);
  });

  it('Removes all the tokens', async function () {
    await this.naughtCoin
      .connect(attacker)
      .approve(this.naughtCoinSolution.address, await this.naughtCoin.balanceOf(attacker.address));
    await this.naughtCoinSolution.bypassLock();
    expect(await this.naughtCoin.balanceOf(attacker.address)).to.be.eq(0);
  });
});
