const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Force', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const Force = await ethers.getContractFactory('Force', deployer);
    const ForceSolution = await ethers.getContractFactory('ForceSolution', attacker);

    this.force = await Force.deploy();
    this.forceSolution = await ForceSolution.deploy(this.force.address);
  });

  it('Sends coins', async function () {
    await this.forceSolution.forceThem({ value: 1 });
    expect(await ethers.provider.getBalance(this.force.address)).to.be.eq(1);
  });
});
