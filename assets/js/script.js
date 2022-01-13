var searchEl = document.getElementById("searchEl");
var submitBtn = document.getElementById("submitBtn");
var cryptoName = searchEl.value.trim();
var topCryptosEl = document.getElementById("topCryptos");

var showTopThree = function() {
    var apiUrl = "https://api.coincap.io/v2/assets?limit=5";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)

                for (i =  0; i < data.length; i++) {
                    var topCryptoCard = document.createElement("div");
                    var topCryptoName = document.createElement("h4");
                        topCryptoName.textContent = data[i].name;
                        topCryptoCard.appendChild(topCryptoName);
                    var topCryptoSymbol = document.createElement("h5");
                        topCryptoSymbol.textContent = data[i].symbol;
                        topCryptoCard.appendChild(topCryptoSymbol)
                    var topCryptoRank = document.createElement("p");
                        topCryptoRank.textContent = data[i].rank;
                        topCryptoCard.appendChild(topCryptoRank);
                    var topCryptoPrice = document.createElement("p");
                        topCryptoPrice.textContent = data[i].priceUsd;
                        topCryptoCard.appendChild(topCryptoPrice);
                    var topCryptoChange = document.createElement("p");
                        topCryptoChange.textContent = data[i].changePercent24Hr;
                        topCryptoCard.appendChild(topCryptoChange);
            
                    topCryptosEl.appendChild(topCryptoCard);

                    console.log("Top 3 Cryptos loaded");
                }
            }) 
        } else {
            alert("Error: Unable to load data")
        } 
    }).catch(function(error) {
        alert("Unable to connect to API");
    })
}

var searchCrypto = function(cryptoName) {
    var apiUrl = "https://api.coincap.io/v2/assets/" + cryptoName;
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        } else {
            alert("Error: Crypto Data Not Found")
        }
    }).catch(function(error) {
        alert("Unable to connect to API")
    })
}

var submitHandler = function(event) {

}

topCryptosEl.addEventListener("click", showTopThree());

//------------------------------------------------------------//
var getCryptoData = function() {
    var apiUrl = "https://api.coincap.io/v2/assets?limit=5";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        } else {
            alert("Error: Github User Not Found")
        }
        
    })
    .catch(function(error) {
        alert("Unable to connect to API")
    })
}

getCryptoData();