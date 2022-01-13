
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