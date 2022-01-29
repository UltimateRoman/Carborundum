// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Carborundum is Ownable {

    uint public memberCount;
    address payable public organizationAddress;
    address[] public members;
    mapping(address => uint) public memberScores;

    function isMember(address _Address) public view returns (bool) {
        bool ismember = false;
        for (uint i = 0; i < memberCount; ++i) {
            if (members[i] == _Address) {
                ismember = true;
            }
        }
        return ismember;
    }

    function setOrgAddress(address _orgAddress) external onlyOwner {
        organizationAddress = payable(_orgAddress);
    }

    function donate(uint _score) external payable {
        if (!isMember(msg.sender)) {
            members.push(msg.sender);
        }
        memberScores[msg.sender] += _score;
        if (organizationAddress != address(0)) {
            organizationAddress.transfer(msg.value);
        }
    }
}