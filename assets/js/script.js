var searchEl = document.getElementById("searchEl");
var submitBtn = document.getElementById("submitBtn");
var topCryptosEl = document.getElementById("topCryptos");
var cryptoResultsArea = document.getElementById("search-results")



var displayCrypto = function(searchData) {
    cryptoResultsArea.textContent = "";

    var resultCryptoEl = document.createElement("div")
    resultCryptoEl.setAttribute("class", "seven columns");
    
    var coinName = document.createElement("h3");
    coinName.textContent = searchData.data.name;
    var coinSymbol = document.createElement("h4");
    coinSymbol.textContent = "Coin Symbol: " + searchData.data.symbol;
    var coinRank = document.createElement("h5");
    coinRank.textContent = "Rank: " + searchData.data.rank;
    var coinPrice = document.createElement("h5");
    var formatPrice = parseFloat(searchData.data.priceUsd).toFixed(2);
    coinPrice.textContent = "Price: $" + formatPrice;
    var coinChange = document.createElement("h5");
    var formatPercent = parseFloat(searchData.data.changePercent24Hr).toFixed(2)
    coinChange.textContent = "24hr Change: " + formatPercent + "%";

    resultCryptoEl.appendChild(coinName);
    resultCryptoEl.appendChild(coinSymbol);
    resultCryptoEl.appendChild(coinRank);
    resultCryptoEl.appendChild(coinPrice);
    resultCryptoEl.appendChild(coinChange);

    cryptoResultsArea.appendChild(resultCryptoEl);
}

var searchCrypto = function(cryptoName) {
    var apiUrl = "https://api.coincap.io/v2/assets/" + cryptoName;
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(searchData) {
                console.log(searchData);
                displayCrypto(searchData);
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
    searchEl.textContent = "";

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