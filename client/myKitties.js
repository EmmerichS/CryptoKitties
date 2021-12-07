var web3js = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xEc2bC529c05cA6958EcF1E1D7ae822E06Bd2c325";

$(document).ready(function() {
    checkAccount();
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

async function myKitties() {

    var arrayId = await instance.methods.allNFTsPerOwner().call();

    for (i = 0; i < arrayId.length; i++) {

        appendKitty(arrayId[i])

    }

}

async function appendKitty(id) {

    var kitty = await instance.methods.getKitty(id).call();

    appendCat(kitty.genes, id, kitty.generation);

}

function appendCat(genes, id, generation){

    //Notice that im using these special quotes in order to write html with break lines
    
      let catBox = `<div id="`+id+`">
    
                        <div id="cat`+id+`">
                            <div id="body`+id+`">
                                <div id="tummy`+id+`">
                                    <div id="decoration`+id+`">
                                        <div id="top_decoration`+id+`"></div>
                                        <div id="middle_decoration`+id+`"></div>
                                        <div id="bottom_decoration`+id+`"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="left_arm`+id+`">
                                <div id="paw`+id+`"></div>
                            </div>
                            <div id="right_arm`+id+`"></div>
                            <div id="ears`+id+`">
                                <div class="ear left_ear`+id+`"></div>
                                <div class="ear right_ear`+id+`"></div>
                            </div>
                            <div id="head`+id+`">
                                <div id="eyes`+id+`">
                                    <div class="eye eye_left`+id+`">
                                        <div class="pupil left_pupil`+id+`">
                                            <div class="pupil left_pupil2`+id+`"></div>
                                        </div>
                                    </div>
                                    <div class="eye eye_right`+id+`">
                                        <div class="pupil right_pupil`+id+`">
                                            <div class="pupil right_pupil2`+id+`"></div>
                                        </div>
                                    </div>
                                </div>
                                <div id="mouth_area`+id+`">
                                    <div id="nose`+id+`"></div>
                                    <div id="mouth`+id+`">
                                        <div id="tongue`+id+`"></div>
                                    </div>
                                </div>
                                <div id="whiskers`+id+`">
                                    <div id="whiskers_left`+id+`">
                                        <div class="whisker`+id+`"></div>
                                        <div class="whisker`+id+`"></div>
                                        <div class="whisker`+id+`"></div>
                                    </div>
                                    <div id="whiskers_right`+id+`">
                                        <div class="whisker`+id+`"></div>
                                        <div class="whisker`+id+`"></div>
                                        <div class="whisker`+id+`"></div>
                                    </div>
                                </div>
                            </div>
                            <div id="feet`+id+`">
                                <div id="left_foot`+id+`">
                                        <div id="big_toe_left`+id+`"></div>
                                        <div id="little_toe_left`+id+`"></div>
                                </div>
                                <div id="right_foot`+id+`">
                                    <div id="big_toe_right`+id+`"></div>
                                    <div id="little_toe_right`+id+`"></div>                   
                                </div>
                            </div>
                        </div>
    
                    </div>`
    
       
       document.getElementById("catBoxes").innerHTML += catBox;
       renderCat(genes);
    
    }

