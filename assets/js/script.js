var searchEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn");

var searchCriteria = "";
var selectedBtn = "";
var data = "";
var songPreview = "";
var listEl = "";
var resultData = "";
var recent5Searches = [];
var spotifyKey = "e1574ce24bmshb618600d41a7010p1ec78ejsn0dc9ca4741c2";
///////////////////////////////////////////////////////front page//////////////////////////////////////////////
$(".main").append("<div class='remove'></div>")
var genreList = function (title,data,id){
 
  $(".remove").append("<h2 class='p-4' id='result-subtitle'>"+title+"</h2>")
  $(".remove").append("<div class='list"+id+" flex space-x-5 p-3 overflow-scroll'></div>" );
  for (var i = 0; i < 7; i++) {
    $(".list" + id).append(
      "<img class ='h-32 w-32 'src='https://e-cdns-images.dzcdn.net/images/cover/" +
        data.tracks.data[i].album.md5_image +
        "/250x250-000000-80-0-0.jpg' alt=''></img>"
    );
  }
};

$(document).ready(function () {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/7277496744", {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d",
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      var title = "Pop music";
      var id = "pop";
      console.log(data);
      genreList(title, data, id);
    })
    .catch((err) => console.error(err));

  fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/8053794282", {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d",
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      var title = "Classic Songs";
      var id = "classic";
      console.log(data);
      genreList(title, data, id);
    })
    .catch((err) => console.error(err));

  fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/1615514485", {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d",
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      var title = "Jazz Music";
      var id = "jazz";
      console.log(data);
      genreList(title, data, id);
    })
    .catch((err) => console.error(err));

  fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/914651125", {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d",
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      var title = "Chill and relax";
      var id = "chill";
      console.log(data);
      genreList(title, data, id);
    })
    .catch((err) => console.error(err));

  fetch("https://deezerdevs-deezer.p.rapidapi.com/playlist/1154685481", {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d",
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      var title = "Sports music";
      var id = "sports";
      console.log(data);
      genreList(title, data, id);
    })
    .catch((err) => console.error(err));
});

/////////////////////////////////////////////////////////Second page/////////////////////////////////////////////////////
// fetch data from spotify
var getSearch = function (searchCriteria) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    
      "X-RapidAPI-Key": spotifyKey,
    },
  };

  fetch(
    "https://spotify23.p.rapidapi.com/search/?q=" +
      searchCriteria +
      "&type=multi&offset=0&limit=10&numberOfTopResults=5",
    options
  )
    .then((response) => response.json())
    .then(function (response) {
      createSongList(response);
    })
    // if error show the error
    .catch((err) => console.error(err));
};

// search by "Songs"
var createSongList = function (response) {
  // dought here ///////
  if ($(".song-list") !== null) {
    $(".song-list").detach();
  }

  var searchesArr = [
    searchCriteria,
  ];

  $(".main").append("<div class='remove'></div>");
  // var listEl = $("<ul>").addClass("song-list");
  ///////////////////////////////////////////////////////////////////////////////Lyrics/////////////////////////////////////
  //   var displayLyrics = JSON.parse(localStorage.getItem("Lyrics"));

  // var divEl = $("<div>").attr("id", "show");
  // console.log(displayLyrics)
  // for (var i = 0; i < displayLyrics.length; i++) {
  //   var pEl= $("<p>")
  //     .attr("id", "paragraph")
  //     .html(displayLyrics[i].line);
  //   divEl.append(pEl);
  // }

  // console.log(divEl);

  // $("#display-container").append(divEl);

  // console.log(displayLyrics);

  // localStorage.removeItem("Lyrics");
  ////////////////////////////////////////

  for (var i = 0; i < 10; i++) {
    data = response.tracks.items[i].data;

    // getMusicData(data.name, data.artists.items[0].profile.name);

    resultData = {
      trackName: data.name,
      trackUri: data.uri,
      artistName: data.artists.items[0].profile.name,
      artistUri: data.artists.items[0].uri,
      albumName: data.albumOfTrack.name,
      albumId: data.albumOfTrack.id,
      albumCover: data.albumOfTrack.coverArt.sources[1].url,
      playability: data.playability.playable,
    };
    searchesArr.push(resultData);
    console.log(resultData);

    createSongListElements(resultData, listEl);
  }

  $("#display-container").append(listEl);

  recent5Searches.push(searchesArr);
  saveRecentSearches(recent5Searches);

  var checkElement = document.querySelector(".song-list");
  console.log(checkElement);

  if (checkElement) {
    $("#result-subtitle").html(
      "Showing results for: " + searchCriteria + " (" + selectedBtn + ")"
    );
  } else {
    $("#result-subtitle").html(
      "No results found for: " + searchCriteria + " (" + selectedBtn + ")"
    );
    createSongListElements(resultData, i);
  }
};

// $("#display-container").append(listEl);

//   var checkElement = document.querySelector(".song-list");
//   console.log(checkElement);

//   if (checkElement) {
//     $("#result-subtitle").html(
//       "Showing results for: " + searchCriteria + " (" + selectedBtn + ")"
//     );
//   } else {
//     $("#result-subtitle").html(
//       "No results found for: " + searchCriteria + " (" + selectedBtn + ")"
//     );
//   }
// };

var createSongListElements = function (data, i) {
  $(".remove").append("<div class='songContain" + i + " p-3 '></div>");
  $(".songContain" + i).append(
    "<div class='songMain" + i + " flex p-3'></div>"
  );
  // $(".songContain"+i).append("<p class='lyricsLines"+i+" h-64 overflow-auto'></p>")
  $(".songMain" + i).append("<div class='songMainLeft" + i + " '></div>");
  $(".songMain" + i).append(
    "<div class='songMainRight" + i + " pl-3 flex-1'></div>"
  );
  $(".songMainLeft" + i).append(
    "<img class='h-40 w-40' src='" +
      data.albumCover +
      "' alt='" +
      data.artistName +
      "'s album " +
      data.albumName +
      "'></img>"
  );
  // var listItemEl = $("<li>").addClass("song-item");
  $(".songMainRight" + i).append(
    "<h3 class='song-title text-lg font-bold'>" + data.trackName + "<h3>"
  );
  $(".songMainRight" + i).append(
    "<p class='song-info'>Artist name:  " + data.artistName + "</p>"
  );
  $(".songMainRight" + i).append(
    "<p class='song-info'>Album name:  " + data.albumName + "</p>"
  );

  $(".songMainRight" + i).append(
    "<div class='buttons justify-end flex mt-3 '></div>"
  );
  $(".songMainRight" + i).append(
    "<button trackIndex='" +
      i +
      "' trackInsert='lyricsLines" +
      i +
      "' trackId='" +
      data.trackUri +
      "' class='lyrics-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Lyrics</button>"
  );
  // $(".remove").append("<a href=./display-lyrics.html?track=" + data.trackName ")
  $(".songMainRight" + i).append(
    "<button playability='" +
      data.playability +
      "' trackId='" +
      data.trackUri +
      "' trackIndex='" +
      i +
      "' class='play-btn play" +
      i +
      " ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Play</button>"
  );
  $(".songMainRight" + i).append(
    "<button  trackIndex='" +
      i +
      "' trackInsert='lyricsLines" +
      i +
      "' artistId='" +
      data.artistUri +
      "' class='country-btn ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>" +
      "Followers" +
      "</button>"
  );
};
// var albumImageEl = $("<img>")
//   .attr("src", data.albumCover)
//   .attr("alt", data.artistName + "'s album " + data.albumName);
// var songTitleEl = $("<h3>").addClass("song-title").html(data.trackName);
// var otherInfoEl = $("<p>")
//   .addClass("song-info")
//   .html(data.artistName + " - " + data.albumName);
// var lyricsBtnEl = $("<button>")
//   .attr("type", "button")
//   .attr("trackId", data.trackUri)
//   .addClass("lyrics-btn");
// var lyricsLinkEl = $("<a>")
//   .attr("href", "./display-lyrics.html?track=" + data.trackName)
//   .attr("target", "_blank")
//   .attr("rel", "noopener noreferrer")
//   .html("Lyrics");
// lyricsBtnEl.append(lyricsLinkEl);
// var playBtnEl = $("<button>")
//   .attr("type", "button")
//   .attr("playability", data.playability)
//   .attr("trackId", data.trackUri)
//   .addClass("play-btn")
//   .html("Play");
// listeners by country data showed on page.

// Later//////////////////////////////////////////////////////////////
// var listenersByCity = $("<button>")
//   .attr("type", "button")
//   .attr("artistId", data.artistUri)
//   .addClass("country-btn");
// var graphLinkEl = $("<a>")
//   .attr("href", "./listeners-graph.html?artist=" + data.artistName)
//   .attr("target", "_blank")
//   .attr("rel", "noopener noreferrer")
//   .html("Cities by Listeners");
// listenersByCity.append(graphLinkEl);

//   listItemEl.append(
//     albumImageEl,
//     songTitleEl,
//     otherInfoEl,
//     lyricsBtnEl,
//     playBtnEl,
//     listenersByCity
//   );
//   listEl.append(listItemEl);
// };
///////////////////////////////////////////////////////////////////////////
//Add event listener button
buttonEl.addEventListener("click", function (event) {
  event.preventDefault();
  $(".remove").remove();
  // $(".main").append("<div class='remove'></div>")
  //   // get user's search criteria
  searchCriteria = searchEl.value;
  searchCriteria =
    searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1);
  console.log(searchCriteria);
  // searchCriteria = "hello";

  getSearch(searchCriteria);
});
/////////////////////////////////////////////////////////////////////////////////
$("#display-container").on("click", ".play-btn", function () {
  var playability = $(this).attr("playability");
  var trackId = $(this).attr("trackId").substr(14);
  var trackUri = $(this).attr("trackId");
  var trackIndex = $(this).attr("trackIndex");
  if (playability) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        "X-RapidAPI-Key": spotifyKey,
      },
    };

    fetch("https://spotify23.p.rapidapi.com/tracks/?ids=" + trackId, options)
      .then((response) => response.json())
      .then(function (response) {
        var playBtn = $(".play" + trackIndex);
        var audioSrc = response.tracks[0].preview_url;
        var audio = new Audio(audioSrc);

        console.log(audioSrc);
        audio.play();

        playBtn.text("Pause");
        playBtn.addClass("pause-btn");
        playBtn.removeClass("play-btn");

        $("#display-container").on("click", ".pause-btn", function () {
          audio.pause();
          console.log(audioSrc);

          playBtn.text("Play");
          playBtn.addClass("play-btn");
          playBtn.removeClass("pause-btn");
        });
      })
      .catch((err) => console.error(err));
  } else {
    console.log("No preview available.");
  }
});

//fetch lyrics
$("#display-container").on("click", ".lyrics-btn", function () {
  // var showLyrics = $(this).attr.text(displayLyrics);
  var trackId = $(this).attr("trackId").substr(14);
  var trackApend = $(this).attr("trackInsert");
  var trackIndex = $(this).attr("trackIndex");
  console.log("Append data is " + trackApend);
  console.log(trackId);
  // getLyrics(trackId);
  $(".songContain" + trackIndex).append(
    "<p class='" + trackApend + " h-64 overflow-auto'></p>"
  );
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": "1580afc537msh1a6caff87fc91b8p17ece1jsn2c0754e91a4b",
    },
  };

  fetch("https://spotify23.p.rapidapi.com/track_lyrics/?id=" + trackId, options)
    .then((response) => response.json())
    .then(function (data) {
      var lyricsData = [];

      for (var i = 0; i < data.lyrics.lines.length; i++) {
        var lyricsLine = data.lyrics.lines[i].words;
        var line = JSON.stringify(lyricsLine);
        var tempArr = {
          line: lyricsLine,
        };

        $("." + trackApend).append("<strong>" + line + "</strong>");
        lyricsData.push(tempArr);
      }
      console.log(lyricsData);

      //store the lyrics data into local storage
      localStorage.setItem("Lyrics", JSON.stringify(lyricsData));
    })
    // if error show the error
    .catch((err) => console.error(err));
});

// displaying cities by users
$("#display-container").on("click", ".country-btn", function (event) {
  // event.preventDefault();

  var artistId = $(this).attr("artistId").substr(15);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": spotifyKey,
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
      console.log(citiesUsers);

      for (var i = 0; i < 3; i++) {
        var numberOfListeners = topCities.items[i].numberOfListeners;
        var listenersByCity = topCities.items[i].city;
        var artistName = data.data.artist.profile.name;
        console.log(artistName);
        var tempArr = {
          numbers: numberOfListeners,
          city: listenersByCity,
          artist: artistName,
        };
        console.log(tempArr);
        citiesUsers.push(tempArr);
      }

      localStorage.setItem("graph-data", JSON.stringify(citiesUsers));
      graphBar();
      console.log(JSON.parse(localStorage.getItem("graph-data")));
      console.log(citiesUsers);
    })
    .catch((err) => console.error(err));
});
////////////////////////////////////////////////////////////////////////////Graphs//////////////////
// var graphBar = function () {
//   var trackApend = $(this).attr("trackInsert");
//   var trackIndex = $(this).attr("trackIndex");
//   $(".songContain"+trackIndex).append("<p class='"+trackApend+" h-64 overflow-auto'></p>")
//   var graphData = JSON.parse(localStorage.getItem("graph-data"));

// var city1 = graphData[0].city;
// var listenersByCity1 = graphData[0].numbers;

// var city2 = graphData[1].city;
// var listenersByCity2 = graphData[1].numbers;

// var city3 = graphData[2].city;
// var listenersByCity3 = graphData[2].numbers;

// var artistName = graphData[1].artist;
// console.log(graphData);
// console.log(artistName);

// // localStorage.removeItem("graph-data");

// // graph logic to show monthly listeners

// google.charts.load("current", {
//   packages: ["bar"],
// });
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//   //   for (var i = 0; i < graph.length; i++) {}
//   var data = google.visualization.arrayToDataTable([
//     ["Cities", city1, city2, city3],
//     [artistName, listenersByCity1, listenersByCity2, listenersByCity3],
//   ]);

//   var options = {
//     chart: {
//       title: "Users by Cities",
//       subtitle: "Monthly Listeners Per Month",
//     },
//     bars: "horizontal", // Required for Material Bar Charts.
//     hAxis: {
//       format: "decimal",
//     },
//     height: 200,
//     colors: ["#1b9e77", "#d95f02", "#7570b3"],
//   };

//   var chart = new google.charts.Bar(  $("."+trackApend));

//   chart.draw(data, google.charts.Bar.convertOptions(options));

//   var btns = document.getElementById("btn-group");

//   btns.onclick = function (e) {
//     if (e.target.tagName === "BUTTON") {
//       options.hAxis.format = e.target.id === "none" ? "" : e.target.id;
//       chart.draw(data, google.charts.Bar.convertOptions(options));
//       localStorage.removeItem("graph-data");
//     }
//   };
// }

// }

// creating a top 10 global playlist

var globalTop10 = function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": spotifyKey,
    },
  };

  fetch(
    "https://spotify23.p.rapidapi.com/charts/?type=viral&country=global&recurrence=daily&date=latest",
    options
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);

      // var listTop10El = $("<ol>").addClass("top10");

      for (var i = 0; i < 10; i++) {
        var top10 = {
          trackName: data.content[i].track_title,
          trackUri: data.content[i].track_url,
          albumCover: data.content[i].thumbnail,
          artistName: data.content[i].artists[0],
        };
        $(".topArtists").append("<div class='top" + i + "'><div>");
        $(".top" + i).append(
          "<img src='" +
            top10.albumCover +
            "' alt ='" +
            top10.artistName +
            "'></img>"
        );
        $(".top" + i).append(
          "<h3 class='song-titile text-lg font-medium'>" +
            top10.trackName +
            "</h3>"
        );
        $(".top" + i).append(
          "<p class='song-info mb-3'>" + top10.artistName + "</p>"
        );
        // var listItemEl = $("<li>").addClass("song-item");

        // var albumImageEl = $("<img>")
        //   .attr("src", top10.albumCover)
        //   .attr("alt", top10.artistName);
        // var songTitleEl = $("<h3>")
        //   .addClass("song-title")
        //   .html(top10.trackName);
        // var otherInfoEl = $("<p>").addClass("song-info").html(top10.artistName);

        // listItemEl.append(albumImageEl, songTitleEl, otherInfoEl);
        // listTop10El.append(listItemEl);
      }

      // $("#top10-container").append(listTop10El);
    })
    .catch((err) => console.error(err));
};

// globalTop10();

// local storage
var saveRecentSearches = function (data) {
  var searches = searchEl.value;
  localStorage.setItem("mostRecentSearch", searches);
};