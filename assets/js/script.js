var searchEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn");
var songsEl = document.querySelector(".songs");
var artistEl = document.querySelector(".artists");
var albumEl = document.querySelector(".album");
var searchCriteria = "";
var selectedBtn = "";
var data = "";
var resultsEl = "";

// monthly users per artist function

var getSearch = function (searchCriteria) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      "X-RapidAPI-Key": "6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d",
    },
  };

  fetch(
    "https://spotify23.p.rapidapi.com/search/?q=" +
      searchCriteria +
      "&type=multi&offset=0&limit=10&numberOfTopResults=10",
    options
  )
    .then((response) => response.json())
    .then(function (response) {
      // if "Songs" radio button is selected, get tracks data
      if (selectedBtn === "Songs") {
        searchBySong(response);
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
    })
    // if error show the error
    .catch((err) => console.error(err));
};

getSearch("Beyonce");

var getMusicData = function (searchCriteria, selectedBtn) {
  // set options to fetch url
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      "X-RapidAPI-Key": "6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d",
    },
  };

  // get data by fetching deezer url using user's criteria
  fetch(
    "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchCriteria,
    options
  )
    .then((response) => response.json())
    // get data
    .then(function (response) {
      // if "Songs" radio button is selected, get tracks data
      if (selectedBtn === "Songs") {
        searchBySong(response);
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
    })
    // if error show the error
    .catch((err) => console.error(err));
};

// search by "Songs"
var searchBySong = function (response) {
  if ($(".results-container") !== null) {
    $(".results-container").detach();
  }

  resultsEl = $("<div>").addClass("results-container");

  for (var i = 0; i < 10; i++) {
    data = response.data[i];

    if (data.title.match(searchCriteria)) {
      createSongList(data, resultsEl);
    } else {
      console.log("not the one");
    }
  }

  $("#display-container").append(resultsEl);

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

var createSongList = function (data, resultsEl) {
  var listEl = $("<ul>").addClass("song-list");
  var listItemEl = $("<li>").addClass("song-item");

  var albumImageEl = $("<img>")
    .attr("src", data.album.cover_small)
    .attr("alt", data.artist.name + "'s album " + data.album.title);
  var songTitleEl = $("<h3>").addClass("song-title").html(data.title);
  var otherInfoEl = $("<p>")
    .addClass("song-info")
    .html(data.artist.name + " - " + data.album.title);
  var lyricsBtnEl = $("<button>")
    .attr("type", "button")
    .addClass("lyrics-btn")
    .html("Lyrics");
  var playBtnEl = $("<button>")
    .attr("type", "button")
    .attr("data-play", data.preview)
    .addClass("play-btn")
    .html("Play");

  listItemEl.append(
    albumImageEl,
    songTitleEl,
    otherInfoEl,
    lyricsBtnEl,
    playBtnEl
  );
  listEl.append(listItemEl);
  resultsEl.append(listEl);

  console.log(data);
  console.log(data.artist.picture_small);
};

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
      getMusicData(searchCriteria, selectedBtn);
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
const lyricsApi = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    "X-RapidAPI-Key": "8953cc16a8msh362e3da83f41059p119f26jsn264a41186942",
  },
};

fetch(
  "https://genius-song-lyrics1.p.rapidapi.com/songs/2396871/lyrics",
  lyricsApi
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
