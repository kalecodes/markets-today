var apiKey = "474472b4-03dd-49c8-94ae-0d662fed1a8b"

var searchEl = document.getElementById("searchEl");
var submitBtn = document.getElementById("submitBtn");
var topCryptosEl = document.getElementById("topCryptos");
var cryptoResultsArea = document.getElementById("search-results");
var newsResultsArea = document.getElementById("news-results")
var recentCards = document.getElementById("recent-cards");
var historyList = document.getElementById("historyList")
var historyTitle = document.getElementById("historyTitle");
var searchHistory = [];

var displayCrypto = function(searchData) {
    cryptoResultsArea.textContent = "";

    var resultCryptoEl = document.createElement("div")
    // resultCryptoEl.setAttribute("class", "seven columns");
    
    var coinName = document.createElement("h3");
    coinName.textContent = searchData.data.name;
    var coinSymbol = document.createElement("h5");
    coinSymbol.textContent = "Coin Symbol: " + searchData.data.symbol;
    var coinRank = document.createElement("h6");
    coinRank.textContent = "Rank: " + searchData.data.rank;
    var coinPrice = document.createElement("h6");
    var formatPrice = parseFloat(searchData.data.priceUsd).toFixed(2);
    coinPrice.textContent = "Price: $" + formatPrice;
    var coinChange = document.createElement("h6");
    var formatPercent = parseFloat(searchData.data.changePercent24Hr).toFixed(2)
    coinChange.textContent = "24hr Change: " + formatPercent + "%";

    resultCryptoEl.appendChild(coinName);
    resultCryptoEl.appendChild(coinSymbol);
    resultCryptoEl.appendChild(coinRank);
    resultCryptoEl.appendChild(coinPrice);
    resultCryptoEl.appendChild(coinChange);

    cryptoResultsArea.appendChild(resultCryptoEl);
}


var displayNews = function(data) {
    if (data.results.length > 0) {
        newsResultsArea.textContent = "";
        for (i = 0; i < 5; i++) {
            var articleEl = document.createElement("div");

            var articleTitle = document.createElement("h6");
            articleTitle.textContent = data.results[i].title;
            var articleLink = document.createElement("a");
            articleLink.setAttribute("href", data.results[i].link);
            articleLink.textContent = "Read the full article at " + data.results[i].source_id;

            articleEl.appendChild(articleTitle);
            articleEl.appendChild(articleLink);

            newsResultsArea.appendChild(articleEl);
        }
    }
}

var searchNews = function(cryptoName) {
    var newsApiKey = "pub_36838563b1ae241d78d9e8f2f4e5fa9b73b4"
    var apiUrl = "https://newsdata.io/api/1/news?apikey=" + newsApiKey + "&qInTitle=" + cryptoName + "&language=en";

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayNews(data);
            })
        } else {
            console.log("Error: Data not found")
        }
    }).catch(function(error) {
        console.log("Unable to connect to Newsdata.io")
    })
}


var addToHistory = function(searchData) {
    if (searchHistory.length > 7) {
        searchHistory.shift();
    }
    searchHistory.push(searchData.data.name);
    localStorage.setItem("searches", JSON.stringify(searchHistory));
    loadSearchHistory();
}

var searchCrypto = function(cryptoName) {
    var apiUrl = "https://api.coincap.io/v2/assets/" + cryptoName;
        console.log(apiUrl);
    
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(searchData) {
                // console.log(searchData);
                displayCrypto(searchData);
                addToHistory(searchData);
            })
        } else {
            console.log("Error: Crypto Data Not Found")
        }
    }).catch(function(error) {
        console.log("Unable to connect to API")
    })
}

var submitHandler = function(event) {
    var cryptoName = searchEl.value.trim().toLowerCase();
    searchEl.value = "";

    if (cryptoName) {
    searchCrypto(cryptoName);
    searchNews(cryptoName);
    } else {
    console.log("Please enter a valid cryptocurrency name")
    }
}

submitBtn.addEventListener("click", submitHandler)

//----------------------------------HISTORY AND STORAGE SECTIONS---------------------------------------------//

var displayHistory = function(searchHistory) {
    for (i = 0; i < searchHistory.length; i++) {
        var recentSearchEl = document.createElement("li");
        recentSearchEl.textContent = searchHistory[i];
        historyTitle.textContent = "Search History: "
        historyList.prepend(recentSearchEl);
    }
}

var displayRecentCrypto = function(searchData) {
    var recentCardEl = document.createElement("div");
    recentCardEl.setAttribute("class", "four columns c-card")
    var recentCryptoName = document.createElement("h5");
    recentCryptoName.textContent = searchData.data.name;
    recentCardEl.appendChild(recentCryptoName);
    var recentCryptoSymbol = document.createElement("h6");
    recentCryptoSymbol.textContent = searchData.data.symbol;
    recentCardEl.appendChild(recentCryptoSymbol)
    var recentCryptoRank = document.createElement("p");
    recentCryptoRank.textContent = "Rank: #" + searchData.data.rank;
    recentCardEl.appendChild(recentCryptoRank);
    var recentCryptoPrice = document.createElement("p");
    var formatPrice = parseFloat(searchData.data.priceUsd).toFixed(2);
    recentCryptoPrice.textContent = "Price: $" + formatPrice;
    recentCardEl.appendChild(recentCryptoPrice);
    var recentCryptoChange = document.createElement("p");
    var formatPercent = parseFloat(searchData.data.changePercent24Hr).toFixed(2);
    recentCryptoChange.textContent = "24hr Change: " + formatPercent + "%";
    recentCardEl.appendChild(recentCryptoChange);

    recentCards.prepend(recentCardEl);
}

var fetchRecentCrypto = function(cryptoName) {
    var apiUrl = "https://api.coincap.io/v2/assets/" + cryptoName;
        
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(searchData) {
                console.log(searchData);
                displayRecentCrypto(searchData);
            })
        } else {
            console.log("Error: Crypto Data Not Found")
        }
    }).catch(function(error) {
        console.log("Unable to connect to API")
    })
}


var loadRecentCrypto = function(searchHistory) {
    recentCards.textContent = "";
    for (i = 5; i < 8; i++) {
        var cryptoName = searchHistory[i].toLowerCase();
        console.log(cryptoName);
        fetchRecentCrypto(cryptoName)
    }
}

var loadSearchHistory = function() {
    historyList.textContent = "";
    searchHistory = [];
    var storedHistory = JSON.parse(localStorage.getItem("searches"))
    for (i = 0; i < storedHistory.length; i++) {
        searchHistory.push(storedHistory[i]);
    }
    console.log(searchHistory);
    displayHistory(searchHistory);
    loadRecentCrypto(searchHistory);
}

document.addEventListener("load", loadSearchHistory());

//-------------------------------AUTO SHOW TOP THREE---------------------------------------//

var showTopThree = function() {
    var apiUrl = "https://api.coincap.io/v2/assets?limit=3";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(responseData) {
                // console.log(responseData)

                for (i =  0; i < responseData.data.length; i++) {
                    var topCryptoCard = document.createElement("div");
                    topCryptoCard.setAttribute("class", "four columns c-card")
                    var topCryptoName = document.createElement("h5");
                    topCryptoName.textContent = responseData.data[i].name;
                    topCryptoCard.appendChild(topCryptoName);
                    var topCryptoSymbol = document.createElement("h6");
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
            console.log("Error: Unable to load data")
        } 
    }).catch(function(error) {
        console.log("Unable to connect to API");
    })
}

document.addEventListener("load", showTopThree());