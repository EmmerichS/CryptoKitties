var web3js = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xc2B1512EAEEfe984a9bb5C85158cbD57Ac91b060";

function getAccount() {
   
    ethereum.request({ method: 'eth_accounts' }).then(function(accounts) {
        let account = accounts[0]; 
        console.log(account + " Waddup " + " " + localStorage.getItem("currentAccount"));
        if(account == localStorage.getItem("currentAccount")) {
            connect();
        }
    });
}

function connect() {

    ethereum.request({ method: 'eth_requestAccounts' })
    .then(function(accounts) {

        instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];

        localStorage.setItem("currentAccount", accounts[0]);

        instance.events.Birth()
            .on('data', function(event) {
                alert("Congratulations Em!!! Your cat has been created! And here are all the stats:" + 
                JSON.stringify(event.returnValues, null, 4));
            })
            .on('error', function(error) {
                console.log(error);
            })
            
        })
    .catch((error) => {
        console.log(error);
    }) 
    
}

$(document).ready(function() {

    getAccount();

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

