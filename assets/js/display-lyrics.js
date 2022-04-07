$("#display-container")
.append(showLyricsEl);

var lyricsLinkEl = $("<a>")
  .attr("href", "./display-lyrics.html?track=" + data.trackName)
  .attr("target", "_blank")
  .attr("rel", "noopener noreferrer")
  .html("Display Lyrics");
  