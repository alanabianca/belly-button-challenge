const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise Pending
const dataPromise = d3.json(url);
dataPromise.then(function(data){
    console.log("Data Promise: Resolved: ", data);

// Populate the dropdown menu using the names array
    var dropdown = d3.select("#dropdown");
    
    data.names.forEach((name) => {
        dropdown.append("option").text(name).attr("value", name);
    });

//Grab the correct data to send to the bar graph
    var nameSelect = "940";
    var currentSample = data.samples.find(sample => sample.id === nameSelect);

    //This will select the largest 10 numbers for the values
    var otuIds = currentSample.otu_ids;
    var SlicedValues = otuIds.slice(0,10);
    var yvalues = SlicedValues.map(function(number){
        return "OTU " + number.toString();
    });

    var Samples = currentSample.sample_values;
    var xvalues = Samples.slice(0,10);
    init(xvalues, yvalues);
});


// *Make the bar chart*
function init(xvalues, yvalues){

let books = ["One", "Two", "Three"]
let timesRead = [100, 50, 25]

let trace1 = {
  x: xvalues,
  y: yvalues,
  type: 'bar',
  orientation: 'h'
};

let data = [trace1];

let layout = {
  title: "Alana's Bar Chart"
};

Plotly.newPlot("barplot", data, layout);
}

//This all happens when you click something:

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#dropdown").on("change", updatePlotly);

function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#dropdown");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
    console.log(dataset);
}