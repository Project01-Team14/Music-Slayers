var graphData = JSON.parse(localStorage.getItem("graph-data"));

var city1 = graphData[0].city;
var listenersByCity1 = graphData[0].numbers;

var city2 = graphData[1].city;
var listenersByCity2 = graphData[1].numbers;

var city3 = graphData[2].city;
var listenersByCity3 = graphData[2].numbers;

var artistName = graphData[1].artist;
console.log(graphData);
console.log(artistName);

// localStorage.removeItem("graph-data");

// graph logic to show monthly listeners

google.charts.load("current", {
  packages: ["bar"],
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  //   for (var i = 0; i < graph.length; i++) {}
  var data = google.visualization.arrayToDataTable([
    ["Cities", city1, city2, city3],
    [artistName, listenersByCity1, listenersByCity2, listenersByCity3],
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
