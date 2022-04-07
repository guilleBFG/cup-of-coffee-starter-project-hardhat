// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CupOfCoffeePortal {
    uint256 totalCupsOfCoffee;

    uint256 private seed;

    event coffeeTalk(address indexed from, uint256 timestamp, string message);

    /*
     * I created a struct here named Wave.
     * A struct is basically a custom datatype where we can customize what we want to hold inside it.
     */

    struct NewCoffeeTalk {
        address talker;
        uint256 timestamp;
        string message;
    }

    NewCoffeeTalk[] smalltalks;

    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user waved at us.
     */
    mapping(address => uint256) public lastCoffeeRequest;

    constructor() payable {
        console.log("smart contract created");

        /**
         *generate a new seed for constructor
         */
        seed = (block.difficulty + block.timestamp) % 100;
    }

    function buyCoffee(string memory _message) public {
        /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */
        require(
            lastCoffeeRequest[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        /*
         * Update the current timestamp we have for the user
         */
        lastCoffeeRequest[msg.sender] = block.timestamp;

        totalCupsOfCoffee += 1;
        console.log("%s bought a cup of coffee", msg.sender);

        // stpre the data into the array
        smalltalks.push(NewCoffeeTalk(msg.sender, block.timestamp, _message));

        /**
         *generate a new seed for the next user that sends a coffee request
         */
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("random # generated: %d", seed);
        /**
         *give a 50% chance to get the user wins the prize
         */

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 customerRewards = 0.0001 ether;

            require(
                customerRewards <= address(this).balance,
                "trying to withdraw more money than the contract has"
            );

            (bool success, ) = (msg.sender).call{value: customerRewards}("");
            require(success, "failed to withdraw money from contract");
        }

        // trigger the event

        /*
         * I added some fanciness here, Google it and try to figure out what it is!
         * Let me know what you learn in #general-chill-chat
         */

        //send event into the blockchain

        emit coffeeTalk(msg.sender, block.timestamp, _message);
    }

    function getAllCoffeeTalks() public view returns (NewCoffeeTalk[] memory) {
        return smalltalks;
    }

    function getTotalCupsOfCoffees() public view returns (uint256) {
        console.log("We have %d total cups of coffee", totalCupsOfCoffee);
        return totalCupsOfCoffee;
    }
}
