var web3js = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xe5b3efc88d0c4955fE52BA14ac9ADc0916Aa6de8";

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
        instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];

        console.log(instance);
        
    })
})