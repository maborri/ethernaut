require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const { ALCHEMY_API_KEY, RINKEBY_PRIVATE_KEY } = process.env;
console.log('ALCHEMY_API_KEY', ALCHEMY_API_KEY);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{ version: '0.8.9' }, { version: '0.7.6' }, { version: '0.6.6' }]
  },
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [RINKEBY_PRIVATE_KEY]
    }
  }
};
