// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IERC721.sol";

//Contractsare considered abstract if at least ONE of their functions is not implemented

abstract contract Kittycontract is IERC721 {

    constructor() IERC721() {}

    uint numberOfNFTs;
    //uint[] tokenIDs;
    Token[] allTokens;

    struct Token {
        address owner;
        uint NFTId;
        uint structId;
        string name;
        string symbol;
    }

    mapping(address => uint) NFTamount;
    mapping(address => Token) token;
    mapping(address => Token[]) allTokensPerOwner;

    function balanceOf(address owner) external view returns (uint256 balance) {
        return NFTamount[owner];
    }

    function allNFTsPerOwner() public view returns (Token[] memory) {
        return allTokensPerOwner[msg.sender];
    }

    function totalSupply() external view returns (uint256 total) {
        return numberOfNFTs;
    }

    function name() external view returns (string memory tokenName) {
        return token[msg.sender].name;
    }

    function symbol() external view returns (string memory tokenSymbol) {
        return token[msg.sender].symbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        return allTokens[tokenId].owner;
    }

    //What about multiple tokens????

    /* @dev Transfers `tokenId` token from `msg.sender` to `to`.
     *
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `to` can not be the contract address.
     * - `tokenId` token must be owned by `msg.sender`.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 tokenId) external {
        require(to != address(0));
        require(to != address(this));
        require(allTokens[tokenId].owner == msg.sender);
    }

}