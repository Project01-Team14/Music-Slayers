var artistId = $(this).attr("artistId").substr(15);
const options = {
method: "GET",
headers: {
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    "X-RapidAPI-Key": "8953cc16a8msh362e3da83f41059p119f26jsn264a41186942",
},
};

fetch(
"https://spotify23.p.rapidapi.com/artist_overview/?id=" + artistId,
options
)
.then((response) => response.json())
.then(function (data) {
    console.log(data);
    var topCities = data.data.artist.stats.topCities;

    var citiesUsers = [];

    for (var i = 0; i < 3; i++) {
    var numberOfListeners = topCities.items[i].numberOfListeners;
    var listenersByCity = topCities.items[i].city;
    var tempArr = {
        numbers: numberOfListeners,
        city: listenersByCity,
    };
    citiesUsers.push(tempArr);
    }



//   var graphContEl = $("<div>")
//         .addClass("graph-container")
//     var chartEl = $("<div>")
//         .attr("id", "chart-div")
//     var spaceEl = $("<br/>")
//         .attr("id", "space")  
//     var btnEl = $("<div>")
//         .attr("id", "btn-group")
//     graphContEl.append(chartEl, spaceEl, btnEl);


    console.log($(this));
    console.log(citiesUsers);
})
.catch((err) => console.error(err));
