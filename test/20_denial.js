const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Denial', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const Denial = await ethers.getContractFactory('Denial', deployer);
    const DenialSolution = await ethers.getContractFactory('DenialSolution', attacker);

    this.denial = await Denial.deploy();
    this.denialSolution = await DenialSolution.deploy(this.denial.address);
  });

  it('Reverts on withdraw', async function () {
    await this.denialSolution.setPartner();

    expect(this.denial.withdraw({ gasLimit: 1000000 })).to.be.reverted;
  });
});
