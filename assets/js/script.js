
var searchEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn");
var songsEl = document.querySelector(".songs");
var artistEl = document.querySelector(".artists");
var albumEl = document.querySelector(".album");
var searchCriteria = "";
var data = "";

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
    for (var i = 0; i < 10; i++) {
        data = response.data[i];
        var title = data.title.normalize;

        if (title.match(searchCriteria)) {
            // $("#display-container")
            console.log(data);
            console.log(data.album.cover_small);
            console.log(data.album.title);
            console.log(data.title);
            console.log(data.artist.name);
            console.log(data.artist.picture_small);
            console.log(data.preview);
        } else {
            console.log("not the one");
        }
    }
}

// search by "Artists"
var searchByArtists = function(response) {
    for (var i = 0; i < 10; i++) {
        data = response.data[i];
        var artist = data.artist.name;
        console.log(artist);
        
        if (artist.match(searchCriteria)) {
            console.log(data);
            console.log(data.album.cover_small);
            console.log(data.album.title);
            console.log(data.title);
            console.log(data.artist.name);
            console.log(data.artist.picture_small);
            console.log(data.preview);
        } else {
            console.log("not the one");
        }
    }
}

// search by "Albums"
var searchByAlbums = function(response) {
    for (var i = 0; i < 10; i++) {
        data = response.data[i];
        var album = data.album.title;

        if (album.match(searchCriteria)) {
            console.log(data);
            console.log(data.album.cover_small);
            console.log(data.album.title);
            console.log(data.title);
            console.log(data.artist.name);
            console.log(data.artist.picture_small);
            console.log(data.preview);
        } else {
            console.log("not the one");
        }

    }
}

//Add event listener button
buttonEl.addEventListener("click", function(event) {
    event.preventDefault();
    // get user's search criteria
    searchCriteria = searchEl.value;
    searchCriteria = searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1);
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
