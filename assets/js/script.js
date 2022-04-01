
var searchEl = document.querySelector(".form-control");
var buttonEl = document.querySelector(".btn");
var songsEl = document.querySelector(".songs");
var artistEl = document.querySelector(".artists");
var albumEl = document.querySelector(".album");





var getMusicData = function() {
  

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
            'X-RapidAPI-Key': '6c661726cemsh8e0e6330646001dp18ca72jsndcad811f5f1d'
        }
    };
    
    fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=one%20more%20time', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));   
}


buttonEl.addEventListener("click", function() {
    var searchCriteria = searchEl.value;
      console.log(searchCriteria);

      
});