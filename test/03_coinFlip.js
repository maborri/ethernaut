const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Coin Flip', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const CoinFlip = await ethers.getContractFactory('CoinFlip', deployer);
    const CoinFlipSolution = await ethers.getContractFactory('CoinFlipSolution', deployer);

    this.coinFlip = await CoinFlip.deploy();
    this.coinFlipSolution = await CoinFlipSolution.deploy(this.coinFlip.address);
  });

  it('Succeeds 10 times in a row', async function () {
    for (let i = 0; i < 10; i++) {
      const tx = await this.coinFlipSolution.play();
      await tx.wait();
    }

    expect(await this.coinFlip.consecutiveWins()).to.be.eq('10');
  });
});
