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

// fetch data from spotify
var getSearch = function (searchCriteria) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
            'X-RapidAPI-Key': 'e9e794b108mshaae6cf85014f437p165fa3jsn8f4bc7c5e72e'
        }
    };

  fetch(
    "https://spotify23.p.rapidapi.com/search/?q=" +
      searchCriteria +
      "&type=multi&offset=0&limit=10&numberOfTopResults=5",
    options
  )
    .then((response) => response.json())
    .then(function (response) {
        console.log(response);
        if (selectedBtn === "Songs") {
            searchBySong(response);
        }
    })
    // if error show the error
    .catch((err) => console.error(err));
};

// fetch data from deezer
var getMusicData = function (search, artist) {
  // set options to fetch url
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      // YURI'S API KEY
      "X-RapidAPI-Key": "6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d",
    },
  };

  // get data by fetching deezer url using user's criteria
  fetch(
    "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search,
    options
  )
    .then((response) => response.json())
    // get data
    .then(function (response) {
        // GET PREVIEW DATA (NOT COMPLETED)
        for (var i = 0; i < response.data.length; i++) {
            var deezerData = response.data[i]
            if (deezerData.title === search) {
                if (deezerData.artist.name === artist) {
                    songPreview = deezerData.preview
                    break;
                }
            }
        }
    })
    // if error show the error
    .catch((err) => console.error(err));
};

var searchEventHandler = function(searchCriteria) {
    // if "Songs" radio button is selected, get tracks data
    if (selectedBtn === "Songs") {
        getSearch(searchCriteria);
    // if "Artists" selected, get artists data
    } else if (selectedBtn === "Artists") {
        searchByArtists(response);
    // if "Albums" selected, get artists data
    } else if (selectedBtn === "Albums") {
        searchByAlbums(response);
    // if nothing selected, show error
    } else {
        console.log("error");
    }
}

// search by "Songs"
var searchBySong = function (response) {
  if ($(".results-container") !== null) {
    $(".results-container").detach();
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
        // preview: songPreview
    };
    console.log(resultData);

    createSpotSongList(resultData,listEl);
  }

  $("#display-container").append(listEl);

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

// search by "Artists"
var searchByArtists = function (response) {
  if ($(".results-container") !== null) {
    $(".results-container").detach();
  }

  resultsEl = $("<div>").addClass("results-container");

  for (var i = 0; i < 10; i++) {
    data = response.data[i];

    if (data.artist.name.match(searchCriteria)) {
      createSongList(data, resultsEl);
    } else {
      console.log("not the one");
    }
  }

  $("#display-container").append(resultsEl);

  var checkElement = document.querySelector(".song-list");

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

// search by "Albums"
var searchByAlbums = function (response) {
  if ($(".results-container") !== null) {
    $(".results-container").detach();
  }

  resultsEl = $("<div>").addClass("results-container");

  for (var i = 0; i < 10; i++) {
    data = response.data[i];

    if (data.album.title.match(searchCriteria)) {
      createSongList(data, resultsEl);
    } else {
      console.log("not the one");
    }
  }

  $("#display-container").append(resultsEl);

  var checkElement = document.querySelector(".song-list");

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

var createSpotSongList = function (data, listEl) {
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
      .addClass("lyrics-btn")
      .html("Lyrics");
    var playBtnEl = $("<button>")
      .attr("type", "button")
      .attr("data-play", data.preview)
      .addClass("play-btn")
      .html("Play");
        // listeners by country data showed on page.
  var listenersByCountry = $("<button>")
  .attr("type", "button")
  .addClass("country-btn")
  .html("Countries By Listeners");

  listItemEl.append(
      albumImageEl,
      songTitleEl,
      otherInfoEl,
      lyricsBtnEl,
      playBtnEl,
      listenersByCountry
    );
    listEl.append(listItemEl);
  
    // console.log(data);
};  

// var createSongList = function (data, resultsEl) {
//   var listEl = $("<ul>").addClass("song-list");
//   var listItemEl = $("<li>").addClass("song-item");

//   var albumImageEl = $("<img>")
//     .attr("src", data.album.cover_small)
//     .attr("alt", data.artist.name + "'s album " + data.album.title);
//   var songTitleEl = $("<h3>").addClass("song-title").html(data.title);
//   var otherInfoEl = $("<p>")
//     .addClass("song-info")
//     .html(data.artist.name + " - " + data.album.title);
//   var lyricsBtnEl = $("<button>")
//     .attr("type", "button")
//     .addClass("lyrics-btn")
//     .html("Lyrics");
//   var playBtnEl = $("<button>")
//     .attr("type", "button")
//     .attr("data-play", data.preview)
//     .addClass("play-btn")
//     .html("Play");

//   listItemEl.append(
//     albumImageEl,
//     songTitleEl,
//     otherInfoEl,
//     lyricsBtnEl,
//     playBtnEl
//   );
//   listEl.append(listItemEl);
//   resultsEl.append(listEl);

//   console.log(data);
//   console.log(data.artist.picture_small);
// };

//Add event listener button
buttonEl.addEventListener("click", function (event) {
  event.preventDefault();
  // get user's search criteria
  searchCriteria = searchEl.value;
  searchCriteria =
    searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1);
  console.log(searchCriteria);

  // select all radio buttons
  var radioButtons = document.querySelectorAll("input[name='lyrics']");

  // search for radio button user selected
  for (var i of radioButtons) {
    // if button is checked, get its value
    if (i.checked) {
      selectedBtn = i.value;
    //   getMusicData(searchCriteria, selectedBtn);
      searchEventHandler(searchCriteria);
      break;
    }
  }
  console.log(selectedBtn);
});

// Genius song lyrics Glavier ("https://rapidapi.com/Glavier/api/genius-song-lyrics1/")

$("#display-container").on("click", ".play-btn", function () {
  var audioSrc = $(this).attr("data-play");
  var audio = new Audio(audioSrc);

  console.log(audioSrc);
  audio.play();

  $(this).text("Pause");
  $(this).addClass("pause-btn");
  $(this).removeClass("play-btn");

  $("#display-container").on("click", ".pause-btn", function () {
    audio.pause();
    console.log(audioSrc);

    $(this).text("Play");
    $(this).addClass("play-btn");
    $(this).removeClass("pause-btn");
  });
});

// set options to fetch url
// const lyricsApi = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
//     "X-RapidAPI-Key": "8953cc16a8msh362e3da83f41059p119f26jsn264a41186942",
//   },
// };

// fetch(
//   "https://genius-song-lyrics1.p.rapidapi.com/songs/2396871/lyrics",
//   lyricsApi
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
