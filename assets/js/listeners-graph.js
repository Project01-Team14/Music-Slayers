var graphData = JSON.parse(localStorage.getItem("graph-data"));

var chartEl = $("<div>").attr("id", "chart-div");
var spaceEl = $("<br/>").attr("id", "space");
var btnEl = $("<div>").attr("id", "btn-group");
$("#graph-container").append(chartEl, spaceEl, btnEl);

console.log(graphData);
console.log(graphData[0].numbers);
console.log(graphData[0].city);

localStorage.removeItem("graph-data");

// graph logic to show monthly listeners

google.charts.load("current", {
  packages: ["bar"],
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  //   for (var i = 0; i < graph.length; i++) {}
  var data = google.visualization.arrayToDataTable([
    ["Cities", "Toronto", "Toyoko", "New York"],
    ["Beyonce", 109000, 40000, 20000],
  ]);

  var options = {
    chart: {
      title: "Users by Cities",
      subtitle: "Monthly Listeners Per Month",
    },
    bars: "horizontal", // Required for Material Bar Charts.
    hAxis: {
      format: "decimal",
    },
    height: 200,
    colors: ["#1b9e77", "#d95f02", "#7570b3"],
  };

  var chart = new google.charts.Bar(document.getElementById("chart_div"));

  chart.draw(data, google.charts.Bar.convertOptions(options));

  var btns = document.getElementById("btn-group");

  btns.onclick = function (e) {
    if (e.target.tagName === "BUTTON") {
      options.hAxis.format = e.target.id === "none" ? "" : e.target.id;
      chart.draw(data, google.charts.Bar.convertOptions(options));
      localStorage.removeItem("graph-data");
    }
  };
}
