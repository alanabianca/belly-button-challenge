const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise Pending
const dataPromise = d3.json(url);

//First data promise:
dataPromise.then(function(data){
    console.log("Data Promise: Resolved: ", data);

    // Populate the dropdown menu using the names array
    var dropdown = d3.select("#dropdown");
    
    data.names.forEach((name) => {
        dropdown.append("option").text(name).attr("value", name);
    });

    //Initialize the graphs for the first sample
    var nameSelect = "940";
    updateCharts(data, nameSelect)
});

//Make the bar graph
function barGraph(xvalues, yvalues, SlicedNames){
    var nameyvalues = yvalues.map(function(number){
        return "OTU " + number.toString();
    });
    
    let trace1 = {
        x: xvalues,
        y: nameyvalues,
        type: 'bar',
        orientation: 'h',
        text: SlicedNames
    };
    let data = [trace1];
    let layout = {
        title: "Top 10 Sample Values"
    };
    Plotly.newPlot("barplot", data, layout);
}
//Make the bubble Chart
function bubbleChart(otuIds, sampleValues, otuLabels){
    var trace1 = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            color: otuIds,
            size: sampleValues
        }
    };
    
    var data = [trace1];
    
    var layout = {
        title: "Sample Readings",
        showlegend: false,
        height: 600,
        width: 1000,
        xaxis: {
            title: "OTU ID"
        }
    };
        Plotly.newPlot('bubble', data, layout);
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#dropdown").on("change", function() {
    // Use dataPromise when the dropdown changes
    dataPromise.then(function(data) {
        updatePlotly(data);
    });
});

//Here's the function that the change calls:
function updatePlotly(data) {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#dropdown");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
    updateCharts(data, dataset);
}

//Here's the function that updates all charts:
function updateCharts(data, dataset){
    var nameSelect = dataset;
    var currentSample = data.samples.find(sample => sample.id === nameSelect);
    var demoSample = data.metadata.find(item => item.id === parseInt(nameSelect));

    //This will select the largest 10 numbers for the otuIds
    var otuIds = currentSample.otu_ids;
    var yvalues = otuIds.slice(0,10);

    //This will select the largest 10 numbers for the sampleValues
    var sampleValues = currentSample.sample_values;
    var xvalues = sampleValues.slice(0,10);

    var otuLabels = currentSample.otu_labels;
    var SlicedNames = otuLabels.slice(0, 10);

    barGraph(xvalues, yvalues, SlicedNames)
    bubbleChart(otuIds, sampleValues, otuLabels);
    demoPanel(demoSample);
}

// Function to populate the panel with demographic information
function demoPanel(data) {
    // Select the panel-body
    const panelBody = d3.select('#sample-metadata');
    
    // Clear existing content
    panelBody.selectAll('p').remove();  
    
    // Bind data to panel content
    const info = panelBody.selectAll('p').data(Object.entries(data));
  
    // Enter new content
    const newInfo = info.enter().append('p');
  
    // Add content with data
    newInfo
      .html(d => `<strong>${d[0]}:</strong> ${d[1]}`);
  
    // Remove extra content if data is reduced
    info.exit().remove();
  }
