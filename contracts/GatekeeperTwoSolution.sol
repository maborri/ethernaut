// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './utils/SafeMath.sol';
import './GatekeeperTwo.sol';

contract GatekeeperTwoSolution {
  GatekeeperTwo public gateKeeper;

  constructor(address _gateOne) public {
    gateKeeper = GatekeeperTwo(_gateOne);
    bytes8 key = bytes8(keccak256(abi.encodePacked(address(this))));
    gateKeeper.enter(~key);
  }
}