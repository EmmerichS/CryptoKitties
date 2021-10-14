// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IERC721.sol";

//Contracts are considered abstract if at least ONE of their functions is not implemented

abstract contract Kittycontract is IERC721 {

    constructor() IERC721() {}

    string public constant Name = "HelloKitties";
    string public constant Symbol ="HKTS";

    struct Token {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
        
        address owner;
        uint id;
    }
    Token[] allTokens;

    mapping(uint256 => address) ownership;
    mapping(address => uint) tokenAmount;
    mapping(address => Token[]) allTokensPerOwner;  //My own addition

    function balanceOf(address owner) external view returns (uint256 balance) {
        return tokenAmount[owner];
    }

    //My own addition
    function allNFTsPerOwner() public view returns (Token[] memory) {
        return allTokensPerOwner[msg.sender];
    }

    function totalSupply() external view returns (uint256 total) {
        return allTokens.length;
    }

    function name() external pure returns (string memory tokenName) {
        return Name;
    }

    function symbol() external pure returns (string memory tokenSymbol) {
        return Symbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        return ownership[tokenId];
    }

    function transfer(address to, uint256 tokenId) external {
        require(to != address(0));
        require(to != address(this));
        require(allTokens[tokenId].owner == msg.sender);
        //require(_owns(msg.sender, tokenId));

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address _from, address _to, uint tokenId) internal {
        tokenAmount[_to] ++;
        ownership[tokenId] = _to;

        if(_from != address(0)) {
            tokenAmount[_from] --;
        }

        emit Transfer(_from, _to, tokenId);
    }

    /*
    function _owns(address claimant, uint tokenId) internal view returns(bool) {
        return ownership[tokenId] == claimant;
    }
    */
}