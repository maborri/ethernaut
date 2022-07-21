const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Gatekeeper One', function () {
  const INITIAL_ETH = ethers.utils.parseEther('0.001');
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const GatekeeperOne = await ethers.getContractFactory('GatekeeperOne', deployer);
    const GatekeeperOneSolution = await ethers.getContractFactory('GatekeeperOneSolution', attacker);

    this.gatekeeperOne = await GatekeeperOne.deploy();
    this.gatekeeperOneSolution = await GatekeeperOneSolution.deploy(this.gatekeeperOne.address);
  });

  it('Goes to the top', async function () {
    const testAddress = attacker.address;
    console.log('Entering with address:', attacker.address);

    await this.gatekeeperOneSolution.enter(testAddress);

    expect(await this.gatekeeperOne.entrant()).to.be.eq(testAddress);
  });
});
