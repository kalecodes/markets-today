var searchEl = document.getElementById("searchEl");
var submitBtn = document.getElementById("submitBtn");
var topCryptosEl = document.getElementById("topCryptos");




var displayCrypto = function(data) {
    
}

var searchCrypto = function(cryptoName) {
    var apiUrl = "https://api.coincap.io/v2/assets/" + cryptoName;
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayCrypto(data);
            })
        } else {
            alert("Error: Crypto Data Not Found")
        }
    }).catch(function(error) {
        alert("Unable to connect to API")
    })
}

var submitHandler = function(event) {
    var cryptoName = searchEl.value.trim().toLowerCase();

    if (cryptoName) {
    searchCrypto(cryptoName);
    } else {
    alert("Please enter a valid cryptocurrency name")
    }
}

submitBtn.addEventListener("click", submitHandler)

//--------------------------------------------------------------------//

var showTopThree = function() {
    var apiUrl = "https://api.coincap.io/v2/assets?limit=3";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(responseData) {
                console.log(responseData)

                for (i =  0; i < responseData.data.length; i++) {
                    var topCryptoCard = document.createElement("div");
                    topCryptoCard.setAttribute("class", "four columns c-card")
                    var topCryptoName = document.createElement("h4");
                        topCryptoName.textContent = responseData.data[i].name;
                        topCryptoCard.appendChild(topCryptoName);
                    var topCryptoSymbol = document.createElement("h5");
                        topCryptoSymbol.textContent = responseData.data[i].symbol;
                        topCryptoCard.appendChild(topCryptoSymbol)
                    var topCryptoRank = document.createElement("p");
                        topCryptoRank.textContent = "Rank: #" + responseData.data[i].rank;
                        topCryptoCard.appendChild(topCryptoRank);
                    var topCryptoPrice = document.createElement("p");
                        var formatPrice = parseFloat(responseData.data[i].priceUsd).toFixed(2);
                        topCryptoPrice.textContent = "Price: $" + formatPrice;
                        topCryptoCard.appendChild(topCryptoPrice);
                    var topCryptoChange = document.createElement("p");
                        var formatPercent = parseFloat(responseData.data[i].changePercent24Hr).toFixed(2);
                        topCryptoChange.textContent = "24hr Change: " + formatPercent + "%";
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

document.addEventListener("load", showTopThree());