const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Gatekeeper Two', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const GatekeeperTwo = await ethers.getContractFactory('GatekeeperTwo', deployer);
    const GatekeeperTwoSolution = await ethers.getContractFactory('GatekeeperTwoSolution', attacker);

    this.gatekeeperTwo = await GatekeeperTwo.deploy();
    this.gatekeeperTwoSolution = await GatekeeperTwoSolution.deploy(this.gatekeeperTwo.address, {
      gasLimit: 500000
    });
  });

  it('Pass the gatekeeper again', async function () {
    expect(await this.gatekeeperTwo.entrant()).to.be.eq(attacker.address);
  });
});
