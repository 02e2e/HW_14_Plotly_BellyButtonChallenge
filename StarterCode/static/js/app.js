

// 1. Use the D3 library to read in `samples.json`
// samples.json is in the same directory 
// if you console.log the data as we do before you will see that there are three keys of data : metadata, names, samples 

function BuildCharts(selected) {
    
    console.log(selected)
    
    d3.json("samples.json").then((data) => {
    
    // console.log(data)
    
    // filter on object id key, 
    
    let results = data.samples.filter(obj => obj.id == selected)
    
    // console.log(results);
  
    console.log(results[0].otu_ids);
    console.log(results[0].otu_labels);
    console.log(results[0].sample_values);

    let ids = results[0].otu_ids;
    let labels = results[0].otu_labels;
    let sampleValues = results[0].sample_values;

    // trace 
    // slice to just show the top 10 with x being the sample value and y being the otuids

    let trace1 = {
        x: sampleValues.slice(0,10).reverse(),
        y: ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
      };

    
     let traceData = [trace1];

    // layout 
    let layout = {
        title: "The Top 10 OTUs Found In Each Individual",
        margin: { 
            l: 100, 
            r: 100,
            t: 100, 
            b: 100
        }
      };
     
    // trace2
    // bubble chart instead of layout, use title, hovermode, title the xaxis 
  
    let bubbleChart = {
        title: "--", 
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
    }
    // choose your color scale at plotly javascript many to choose, not sure which one is being used in the images provided
    let trace2 = {
        x: ids,
        y: sampleValues,
        text: labels, 
        mode: "markers",
        marker: { 
            size: sampleValues,
            color: ids,
            colorscale:"Electric"
        }
   
      };

    
    let traceData2 = [trace2];
    
    let resultsG = results[0];
    
   Plotly.newPlot("plot", traceData, layout);
   Plotly.newPlot("bubble", traceData2, bubbleChart);


    });
 

}


function BuildMetaData(selected) {
    
    d3.json("samples.json").then((data) => {
    
    let results_array = data.metadata.filter(participant => participant.id == selected);
    let results = results_array[0];

    let panel = d3.select("#sample-metadata");
    panel.html('');
    
    Object.entries(results).forEach(([key, value]) => {
        
        //next <h5 was the last in the html, so the next should be h6 
        panel.append('h6').text(`${key}: ${value}`);
      

     });
     

    });

};



function BuildGaugeChart(selected) {
    
    d3.json("samples.json").then((data) => {
       
    // let results_array = data.metadata.filter(participant => participant.id == parseInt(selected));
           
    let results_arrayG = data.metadata.filter(participant => participant.id == selected);

    let resultsG = results_arrayG[0];
   
    let wfreq = resultsG.wfreq;


     

    let gaugeCharttrace= [
        { 
          value: wfreq, 
          type: "indicator",
          mode: "gauge+number",
          domain: {x: [0,1], y: [0,1]},

          title: { text: "Scrubs Per Week", font: { size: 18 } },
          delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
            
              {range: [0, 2], color: "beige" },
              { range: [1, 2], color: "lightseagreen" },
              { range: [2, 3], color: "lightpink" },
              { range: [3, 4], color: "lightblue" },
              { range: [4, 5], color: "plum" },
              { range: [5, 6], color: "cornsilk" },
              { range: [6, 7], color: "lightsalmon" },
              { range: [7, 8], color: "lawngreen" },
              { range: [8, 9], color: "bisque" }
            ],
          
          }
        }
      ];
      
      var layout = {
        title: {text:"Belly Button Washing Frequency",  font: {size:20}},
        margin: { t: 50, r: 25, l: 25, b: 25 },
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }
      };
      //div id in html is gauge 
      Plotly.newPlot('gauge', gaugeCharttrace, layout);
      
    });

};





// outside the function we build the chart of that id when the page loads 

d3.json("samples.json").then((data) => {

    // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    // console.log(data.names);

    let dropdown = d3.select("#selDataset")
   
    // as it loops through data.names and we will call each one id 
    data.names.forEach((id) => {
        
      // we add a property value to know what they selected
        dropdown.append('option').text(id).property('value', id); 

    })
    // this is the first item in the array so there is a chart when the page first opens and before a function is even run 
    // effectively 940 

    BuildCharts(data.names[0]);
    BuildMetaData(data.names[0]);
    BuildGaugeChart(data.names[0])

});
    
//everytime we get a change we get a console.log and seeing what the person selected from the drop down menu 

function optionChanged(selected){
       
        BuildCharts(selected);
        BuildMetaData(selected);
        BuildGaugeChart(selected);
}