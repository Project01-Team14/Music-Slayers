var displayLyrics = JSON.parse(localStorage.getItem("Lyrics"));
var pEl= $("<p>")
.attr("id", "paragraph")
var divEl = $("<div>")
.attr("id", "show")

  $("#display-container").append(pEl, divEl);

  console.log(displayLyrics);

  localStorage.removeItem("Lyrics");