var web3js = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xAEBc3F9340cd9D52e6722C90c96E987F7A16b9c5";

$(document).ready(function() {
    checkAccount();
})

function checkAccount() {   
    ethereum.request({ method: 'eth_accounts' }).then(function(accounts) {
        let account = accounts[0]; 

        //This console.log is just for my own reference and will be deleted later
        console.log(account + " Waddup " + " " + localStorage.getItem("currentAccount"));
        
        //This is where I compare the two addresses to one another. If they are the same I call the connect function which
        //will save me the hassle of always having to manually re-connect
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

        //Here I store the address I've just logged in with in localSotrage
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

