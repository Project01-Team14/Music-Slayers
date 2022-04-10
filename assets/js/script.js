var searchEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn");

var searchCriteria = "";
var data = "";
var resultData = "";
var recent5Searches = [];
var spotifyKey = "e1574ce24bmshb618600d41a7010p1ec78ejsn0dc9ca4741c2";

///////////////////////////////////////////////////////front page//////////////////////////////////////////////
$(".main").append("<div class='remove'></div>");

var genreList = function (title,data,id) {
  $(".remove").append("<h2 class='p-4' id='result-subtitle'>" + title + "</h2>");
  $(".remove").append("<div class='list" + id + " flex space-x-5 p-3 overflow-scroll'></div>");

  for (var i = 0; i < 7; i++) {
    $(".list" + id).append("<img class ='h-32 w-32 'src='https://e-cdns-images.dzcdn.net/images/cover/" + data.tracks.data[i].album.md5_image + "/250x250-000000-80-0-0.jpg' alt='' data-track-name='" + data.tracks.data[i].title + "'></img>");
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

  fetch(
    "https://deezerdevs-deezer.p.rapidapi.com/playlist/8053794282", {
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
    "https://spotify23.p.rapidapi.com/search/?q=" + searchCriteria + "&type=multi&offset=0&limit=10&numberOfTopResults=5",
    options
  )
    .then((response) => response.json())
    .then(function (response) {
      createSongList(response);
    })
    // if error show the error
    .catch((err) => console.error(err));
};

// create song list and show it on result area
var createSongList = function (response) {
  $(".main").append("<div class='remove'></div>")

  var tempArr = {
    search: searchCriteria,
    result: [],
  };

  for (var i = 0; i < 10; i++) {
    data = response.tracks.items[i].data;

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
    console.log(resultData);
    tempArr.result.push(resultData);

    createSongListElements(resultData, i);
  }

  recent5Searches.push(tempArr);
  saveRecentSearches(recent5Searches);
};

var createSongListElements = function (data,i) {
  $(".remove").append("<div class='songContain" + i + " p-3 '></div>")

  $(".songContain" + i).append(
    "<div class='songMain" + i + " flex p-3'></div>"
  );

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

//Add event listener button
buttonEl.addEventListener("click", function (event) {
  event.preventDefault();

  $(".remove").remove();

  // get user's search criteria
  searchCriteria = searchEl.value;
  searchCriteria =
    searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1);
  console.log(searchCriteria);

  getSearch(searchCriteria);
});

/////////////////////////////////////////////////////////////////////////////////
$("#display-container").on("click", ".play-btn", function () {
  var playability = $(this).attr("playability");
  var trackId = $(this).attr("trackId").substr(14);
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
  var trackId = $(this).attr("trackId").substr(14);
  var trackApend = $(this).attr("trackInsert");
  var trackIndex = $(this).attr("trackIndex");
  console.log("Append data is " + trackApend);
  console.log(trackId);

  $(".lyricsRemove").remove();

  $(".songContain" + trackIndex).append(
    "<p class='" + trackApend + " h-64 overflow-auto lyricsRemove'></p>"
  );
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": "1580afc537msh1a6caff87fc91b8p17ece1jsn2c0754e91a4b",
    },
  }

  fetch("https://spotify23.p.rapidapi.com/track_lyrics/?id=" + trackId, options)
    .then((response) => response.json())
    .then(function (data) {       
      for (var i = 0; i < data.lyrics.lines.length; i++) {
        var lyricsLine = data.lyrics.lines[i].words;
        var line = JSON.stringify(lyricsLine);
        
        $("." + trackApend).append("<strong>" + line + "</strong>");
        lyricsData.push(tempArr);
      }
    })
    // if error show the error
    .catch((err) => console.error(err));
});

// displaying cities by users
$("#display-container").on("click", ".country-btn", function (event) {
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

        $(".topArtists").append("<div class='top" + i + "'><div>");
        
        $(".top" + i).append("<img src='" + top10.albumCover + "' alt ='" + top10.artistName + "'></img>");
        $(".top" + i).append("<h3 class='song-titile text-lg font-medium'>" + top10.trackName + "</h3>");
        $(".top" + i).append("<p class='song-info mb-3'>" + top10.artistName + "</p>");
      }
    })
    .catch((err) => console.error(err));
};

// globalTop10();

// save recent searches to local storage and show as buttons in history search area
var saveRecentSearches = function (data) {
  // remove the history button container, if it's there
  $(".history-btn-container").remove();

  // if the searches are done more than 6 times, create a new array with the latest 5 searches
  if (data.length >= 6) {
    recent5Searches = [];

    for (var i = 1; i < 6; i++) {
      console.log(recent5Searches);
      recent5Searches.push(data[i]);
    }
    console.log(recent5Searches);
  }

  // save search items to localStorage
  localStorage.setItem("mostRecentSearch", JSON.stringify(recent5Searches));
  loadSearches();
};

// create button elements of recent searches
var loadSearches = function() {
  recent5Searches = JSON.parse(localStorage.getItem("mostRecentSearch"));
  
  // if there is data in localStorage, create search history button
  if (recent5Searches) {
    var historyContainerEl = $("<div>").addClass("history-btn-container");

    for (var i = 0; i < recent5Searches.length; i++) {
      historyContainerEl.prepend(
        "<button type='button' class='history-btn'>" +
          recent5Searches[i].search +
          "</button>"
      );
    }

    $(".search-history").append(historyContainerEl);
  // if not, set an empty array
  } else {
    recent5Searches = [];
  }
};

loadSearches();

// when clicked history search button, show its song list result
$(".search-history").on("click", ".history-btn", function() {
  // get search criteria from the button's text
  var searchCriteria = $(this).text().trim();
  // get search result from local storage
  recent5Searches = JSON.parse(localStorage.getItem("mostRecentSearch"));

  // look for the search criteria in the local storage and show list of the matched one
  for (var i = 0; i < recent5Searches.length; i++) {
    if (recent5Searches[i].search === searchCriteria) {
      $(".remove").remove();
      $(".main").append("<div class='remove'></div>");

      for (var item = 0; item < recent5Searches[i].result.length; item++) {
        resultData = recent5Searches[i].result[item];
        createSongListElements(resultData, item);
      }
    }
  }
});

// if clicked on the image of the first loaded screen, shows song list of its track name
$("#display-container").on("click", "img", function () {
  // get search criteria from image's attribute
  searchCriteria = $(this).attr("data-track-name");
  
  // fetch song data and show its list
  $(".remove").remove();
  getSearch(searchCriteria);
});
