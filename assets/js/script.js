var searchEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn");
var songsEl = document.querySelector(".songs");
var artistEl = document.querySelector(".artists");
var albumEl = document.querySelector(".album");

var searchCriteria = "";
var selectedBtn = "";
var data = "";
var songPreview = "";
var listEl = "";
var resultData = "";

var recent5Searches = [];
var searchesArr = {};

// fetch data from spotify
var getSearch = function (searchCriteria) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": "1580afc537msh1a6caff87fc91b8p17ece1jsn2c0754e91a4b",
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
  if ($(".song-list") !== null) {
    $(".song-list").detach();
  }

  var listEl = $("<ul>").addClass("song-list");
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
      searchCriteria: searchCriteria,
    };
    recent5Searches.push(resultData);
    console.log(resultData);

    createSongListElements(resultData, listEl);
  }

  $("#display-container").append(listEl);
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
  }
};

var createSongListElements = function (data, listEl) {
  var listItemEl = $("<li>").addClass("song-item");

  var albumImageEl = $("<img>")
    .attr("src", data.albumCover)
    .attr("alt", data.artistName + "'s album " + data.albumName);
  var songTitleEl = $("<h3>").addClass("song-title").html(data.trackName);
  var otherInfoEl = $("<p>")
    .addClass("song-info")
    .html(data.artistName + " - " + data.albumName);
  var lyricsBtnEl = $("<button>")
    .attr("type", "button")
    .attr("trackId", data.trackUri)
    .addClass("lyrics-btn");
  var lyricsLinkEl = $("<a>")
    .attr("href", "./display-lyrics.html?track=" + data.trackName)
    .attr("target", "_blank")
    .attr("rel", "noopener noreferrer")
    .html("Lyrics");
  lyricsBtnEl.append(lyricsLinkEl);
  var playBtnEl = $("<button>")
    .attr("type", "button")
    .attr("playability", data.playability)
    .attr("trackId", data.trackUri)
    .addClass("play-btn")
    .html("Play");
  // listeners by country data showed on page.
  var listenersByCity = $("<button>")
    .attr("type", "button")
    .attr("artistId", data.artistUri)
    .addClass("country-btn");
  var graphLinkEl = $("<a>")
    .attr("href", "./listeners-graph.html?artist=" + data.artistName)
    .attr("target", "_blank")
    .attr("rel", "noopener noreferrer")
    .html("Cities by Listeners");
  listenersByCity.append(graphLinkEl);

  listItemEl.append(
    albumImageEl,
    songTitleEl,
    otherInfoEl,
    lyricsBtnEl,
    playBtnEl,
    listenersByCity
  );
  listEl.append(listItemEl);
};

//Add event listener button
buttonEl.addEventListener("click", function (event) {
  event.preventDefault();
  // get user's search criteria
  searchCriteria = searchEl.value;
  searchCriteria =
    searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1);
  console.log(searchCriteria);

  getSearch(searchCriteria);
});

$("#display-container").on("click", ".play-btn", function () {
  var playability = $(this).attr("playability");
  var trackId = $(this).attr("trackId").substr(14);
  var trackUri = $(this).attr("trackId");

  if (playability) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        "X-RapidAPI-Key": "1580afc537msh1a6caff87fc91b8p17ece1jsn2c0754e91a4b",
      },
    };

    fetch("https://spotify23.p.rapidapi.com/tracks/?ids=" + trackId, options)
      .then((response) => response.json())
      .then(function (response) {
        var playBtn = $("button[trackId='" + trackUri + "']");
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
  console.log(trackId);
  // getLyrics(trackId);

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
        var tempArr = {
          line: lyricsLine,
        };
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
      "X-RapidAPI-Key": "1580afc537msh1a6caff87fc91b8p17ece1jsn2c0754e91a4b",
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

      console.log(JSON.parse(localStorage.getItem("graph-data")));
      console.log(citiesUsers);
    })
    .catch((err) => console.error(err));
});

// creating a top 10 global playlist

var globalTop10 = function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": "1580afc537msh1a6caff87fc91b8p17ece1jsn2c0754e91a4b",
    },
  };

  fetch(
    "https://spotify23.p.rapidapi.com/charts/?type=viral&country=global&recurrence=daily&date=latest",
    options
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);

      var listTop10El = $("<ol>").addClass("top10");

      for (var i = 0; i < 10; i++) {
        var top10 = {
          trackName: data.content[i].track_title.substr(30),
          trackUri: data.content[i].track_url,
          albumCover: data.content[i].thumbnail,
          artistName: data.content[i].artists[0],
        };
        var listItemEl = $("<li>").addClass("song-item");

        var albumImageEl = $("<img>")
          .attr("src", top10.albumCover)
          .attr("alt", top10.artistName);
        var songTitleEl = $("<h3>")
          .addClass("song-title")
          .html(top10.trackName);
        var otherInfoEl = $("<p>").addClass("song-info").html(top10.artistName);

        listItemEl.append(albumImageEl, songTitleEl, otherInfoEl);
        listTop10El.append(listItemEl);
      }

      $("#top10-container").append(listTop10El);
    })
    .catch((err) => console.error(err));
};

// globalTop10();

// local storage
var saveRecentSearches = function (data) {
  var searches = searchEl.value;
  localStorage.setItem("mostRecentSearch", searches);
};
