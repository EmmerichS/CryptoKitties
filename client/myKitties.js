var web3js = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xCAfB23e3278a8156a304Db72ef2A34eb9F6Ee8eE";

$(document).ready(function() {
    checkAccount();
    renderAllMyCats();
    console.log("This is from .ready()");
})

function checkAccount() {   
    ethereum.request({ method: 'eth_accounts' })
    .then(function(accounts) {
        let account = accounts[0]; 

        //This console.log is just for my own reference and will be deleted later
        console.log(account + " Waddup " + localStorage.getItem("currentAccount"));
        
        //This is where I compare the two addresses to one another. If they are the same I call the connect function which
        //will save me the hassle of always having to manually re-connect
        if(account == localStorage.getItem("currentAccount")) {
            connect();
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

function connect() {
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(function(accounts) {
        instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0];
        //Here I store the address I've just logged in with in localSotrage
        localStorage.setItem("currentAccount", accounts[0]);           
        })
    .catch((error) => {
        console.log(error);
    })     
}

function renderAllMyCats() {

    ethereum.request({ method: 'eth_requestAccounts' })
    .then(function(accounts) {
        instance = new web3js.eth.Contract(abi, contractAddress, {from: accounts[0]})

        console.log("This is from renderAllMyCats()")

        //get the owner array of all the cats
        var ownerArray = instance.methods.allNFTsPerOwner();

        //loop through array using renderMyCat() to display the cat
        if(ownerArray > 0) {
            for(i = 0; i < ownerArray.length; i++) {
                let id = ownerArray[i];
                renderMyCat(id);
            }
        }
    })
}

function renderMyCat(id) {

    //This is where I need to render my cat

}
