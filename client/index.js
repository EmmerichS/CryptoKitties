var web3js = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x4F6590C245D8B500A14CB407FDf7218A8E9C661E";

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {

        instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})

        user = accounts[0];

        console.log(instance)

        instance.events.Birth()
        .on('data', function(event) {
            alert("Congratulations Em!!! Your cat has been created! And here are all the stats:" + JSON.stringify(event.returnValues, null, 4));
            console.log(event.returnValues);
        })
        .on('error', function(error) {
            console.log(error);
        })  

    })
})
