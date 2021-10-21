var web3js = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x6af4aDbB49930796858D007D36A164C11F55D0a8";

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
        instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];

        console.log(instance);
    })
})