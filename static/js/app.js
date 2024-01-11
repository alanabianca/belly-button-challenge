const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
const url2 = "https://api.spacexdata.com/v4/launchpads"

//Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

//Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);

    //Populate the dropdowm menu using  the names array
    var dropdown = d3.select("#dropdown");
    
    data.names.forEach((name) => {
        dropdown.append("option").text(name).attr("value", name);
    });
});
