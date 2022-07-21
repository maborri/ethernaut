const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('King', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const King = await ethers.getContractFactory('King', deployer);
    const KingSolution = await ethers.getContractFactory('KingSolution', attacker);

    this.king = await King.deploy({ value: 1000000000000000 });
    this.kingSolution = await KingSolution.deploy(this.king.address);
  });

  it('Denies the game', async function () {
    const prize = await this.king.prize();
    await this.kingSolution.play({ value: prize });
    expect(deployer.sendTransaction({ to: this.king.address, value: prize })).to.be.revertedWith('Denied');
  });
});
