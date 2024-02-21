url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


  
function init() {
    d3.json(url).then(function(data) {
    let dropdownMenu = d3.select("#selDataset");
    
    data.names.forEach((id) => {
        dropdownMenu.append("option").text(id).property("value", id);
    });

        hbar(data.samples[0])
        bublechart(data.samples[0])
        Demographic(data.metadata[0])
        console.log(data);
      });
    
}

function optionChanged(new_data) {
  d3.json(url).then(function(data) {
  plot_data = data.samples.find((id) => id.id == new_data);
  demo_data = data.metadata.find((id) => id.id == new_data);
  hbar(plot_data)
  bublechart(plot_data)
  Demographic(demo_data)
  })
 
}
  
function hbar(plot_data){
    let trace1 = {
        x: plot_data.sample_values.slice(0, 10).reverse(),
        y: plot_data.otu_ids.slice(0, 10).reverse().map((id) => `OTU ${id}`),
        text: plot_data.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      };
      
      let data = [trace1];
      
      let layout = {
        title: "Greek gods search results",
      };
      
      Plotly.newPlot("bar", data, layout);
}


function bublechart(plot_data){
    var trace1 = {
        x: plot_data.otu_ids,
        y: plot_data.sample_values,
        text : plot_data.otu_labels,
        mode: 'markers',
        marker: {
          size: plot_data.sample_values,
          color : plot_data.otu_ids,
          colorscale: 'YlGnBu',
        }
      };
      
      var data = [trace1];
      
      var layout = {
        xaxis: {title: "OTU ID"}
      };
      
      Plotly.newPlot('bubble', data, layout);
}

function Demographic(demo_data){
    d3.select("#sample-metadata").html("");
    let labels = Object.entries(demo_data);
    labels.forEach(([key,value]) => {
        d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`)
    })
}
init();