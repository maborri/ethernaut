const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Elevetor', function () {
  const INITIAL_ETH = ethers.utils.parseEther('0.001');
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const Elevator = await ethers.getContractFactory('Elevator', deployer);
    const ElevatorSolution = await ethers.getContractFactory('ElevatorSolution', attacker);

    this.elevator = await Elevator.deploy();
    this.elevatorSolution = await ElevatorSolution.deploy(this.elevator.address);
  });

  it('Goes to the top', async function () {
    await this.elevatorSolution.goTo(1);

    expect(await this.elevator.top()).to.be.eq(true);
    expect(await this.elevator.floor()).to.be.eq(1);
  });
});
