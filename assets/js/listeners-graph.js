var graphData = JSON.parse(localStorage.getItem("graph-data"));

var chartEl = $("<div>")
    .attr("id", "chart-div")
var spaceEl = $("<br/>")
    .attr("id", "space")  
var btnEl = $("<div>")
    .attr("id", "btn-group")
$("#graph-container").append(chartEl, spaceEl, btnEl);

console.log(graphData);

localStorage.removeItem("graph-data");