// SPDX-License-Identifier: MIT

pragma solidity <0.7.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";

contract MotorbikeSolution {
    function destroy() external {
      selfdestruct(msg.sender);
    }
}
