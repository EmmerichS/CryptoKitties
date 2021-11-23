var web3js = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x508bA0EFC43526aC0F17F5Ddeed79Fa4Fc30F0c4";

$(document).ready(function() {

    instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})
    user = accounts[0];
    console.log(instance)

    /*window.ethereum.enable().then(function(accounts) {
       
        //Creating an instance of the contract
        instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];
        console.log(instance)
        
        instance.events.Birth()
        .on('data', function(event) {

            //Here I console the DNA (genes), but only get a partial value.
            console.log(event.returnValues.genes); 

            alert("Congratulations Em!!! Your cat has been created! And here are all the stats:" + JSON.stringify(event.returnValues, null, 4));

            console.log(event.returnValues);
        })
        .on('error', function(error) {
            console.log(error);
        })
    })*/
})

function connect() {

    window.ethereum.enable().then(function(accounts) {

        //Creating an instance of the contract
        instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})

        user = accounts[0];

        console.log(instance)

        instance.events.Birth()
        .on('data', function(event) {

            //Here I console the DNA (genes), but only get a partial value.
            console.log(event.returnValues.genes); 

            alert("Congratulations Em!!! Your cat has been created! And here are all the stats:" + 
            JSON.stringify(event.returnValues, null, 4));

            console.log(event.returnValues);
        })
        .on('error', function(error) {
            console.log(error);
        })

    })
}
