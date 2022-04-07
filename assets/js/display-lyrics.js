var displayLyrics = JSON.parse(localStorage.getItem("Lyrics"));

var divEl = $("<div>").attr("id", "show");
console.log(displayLyrics)
for (var i = 0; i < displayLyrics.length; i++) {
  var pEl= $("<p>")
    .attr("id", "paragraph")  
    .html(displayLyrics[i].line);
  divEl.append(pEl);
}

console.log(divEl);

$("#display-container").append(divEl);

console.log(displayLyrics);

localStorage.removeItem("Lyrics");