
var searchEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn");
var songsEl = document.querySelector(".songs");
var artistEl = document.querySelector(".artists");
var albumEl = document.querySelector(".album");

var getMusicData = function(searchCriteria, selectedBtn) {
    // set options to fetch url
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
            'X-RapidAPI-Key': '6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d'
        }
    };

    // get data by fetching deezer url using user's criteria
    fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=' + searchCriteria, options)
        .then(response => response.json())
        // get data
        .then(function(response) {
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
        .catch(err => console.error(err));    
}
// search by "Songs"
var searchBySong = function(response) {
    for (var i=0; i<10; i++) {
        console.log(response.data[i].title);
    }
}
// search by "Artists"
var searchByArtists = function(response) {
    for (var i=0; i<10; i++) {
        console.log(response.data[i].artist);
    }
}
// search by "Albums"
var searchByAlbums = function(response) {
    for (var i=0; i<10; i++) {
        console.log(response.data[i].album);
    }
}
//Add event listener button
buttonEl.addEventListener("click", function(event) {
    event.preventDefault();
    // get user's search criteria
    var searchCriteria = searchEl.value;
      console.log(searchCriteria);
    
    // select all radio buttons
    var radioButtons = document.querySelectorAll("input[name='lyrics']");
    var selectedBtn = "";

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




// genius song lyrics glavier ("https://rapidapi.com/Glavier/api/genius-song-lyrics1/")

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
//         'X-RapidAPI-Key': '6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d'
//     }
// };

// fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=Alan%20Walker&per_page=10&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// // need song id for below function ("https://rapidapi.com/Glavier/api/genius-song-lyrics1/")
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
//         'X-RapidAPI-Key': '6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d'
//     }
// };

// fetch('https://genius-song-lyrics1.p.rapidapi.com/songs/2396871/lyrics', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
