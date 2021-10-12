// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IERC721.sol";

//Contractsare considered abstract if at least ONE of their functions is not implemented

abstract contract Kittycontract is IERC721 {

    constructor() IERC721() {}

    uint allNFTs;

    mapping(address => uint) NFTamount;

    function balanceOf(address owner) external view returns (uint256 balance) {
        return NFTamount[owner];
    }

    function totalSupply() external view returns (uint256 total) {
        return allNFTs;
    }

}