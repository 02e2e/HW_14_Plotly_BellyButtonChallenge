


// 1. Use the D3 library to read in `samples.json`
// samples.json is in the same directory 
// we are going to call the it data 
// arrow function used 
// within this read - in of the json file we can create what we want the website to do upon the first time its loaded
// in this case the drop down menu and the bar chart need to be showing, this is before a function can be called 


// the idea here is to build a chart called buildcharts, when a person makes a change the chart will chang 
// we have to reread the data in this function 

// if you console.log the data as we do before you will see that there are three keys of data : metadata, names, samples 

function BuildCharts(selected) {
    
    console.log(selected)
    
    d3.json("samples.json").then((data) => {
    
    console.log(data)
    
    // all the plotly stuff goes inside here
    // you will need to filter this 

    //we want to filer samples 
    // array stored in samples(per console)
    // filter on object id key, 
    
    let results = data.samples.filter(obj => obj.id == selected)
    console.log(results);
   
    // a filters an array and  will return an array 
    // looking at console log of our data we can select the data we want to look at ... in this case otu_ids, otu_labels, sample_values 
    // we had to some real detective work by loading the json here would have been hard for you to figure out on your own

    console.log(results[0].otu_ids);
    console.log(results[0].otu_labels);
    console.log(results[0].sample_values);

    let ids = results[0].otu_ids;
    let labels = results[0].otu_labels;
    let sampleValues = results[0].sample_values;

    // trace 
    // need backtick otuID to get it work 
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
    //not sure what freq is here need to undersand it more on what the gauge is even telling me, look at instructions?

    // let washing_freq = resultsG.washing_freq;


     

    // let gaugeCharttrace= [
    //     { 
    //         type: "pie",
    //         showlegend: false,
    //         hole: 0.4,
    //         rotation: 90,
    //         text: washing_freq,
    //         values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //         text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6","6-7","7-8","8-9"],
    //         direction: "clockwise",
    //         textinfo: "text",
    //         textposition: "inside",
    //         marker: {
    //           colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "white"]
    //         },
    //         labels: ["0-1", "1-2", "2-3", "3-4", "4-5","5-6","6-7","7-8","8-9"],
    //         hoverinfo: "label"
    //       }];
          
    // // let degrees = 115, radius = .6;
    // // let radians = degrees * Math.PI / 180;
    // // let x = -1 * radius * Math.cos(radians);
    // // let y = radius * Math.sin(radians)/2;
          
    // let gaugeChart = {
    //     title: "Belly Button Washing Frequency",
    //     width: 500,
    //     height: 400,
    //     margin: { t: 25, r: 25, l: 25, b: 25 },
    //   };
    //div key plot
    //div key bubble 
   // plotly.newPlot 
   Plotly.newPlot("plot", traceData, layout);
   Plotly.newPlot("bubble", traceData2, bubbleChart);
//    Plotly.newPlot("gauge", gaugeCharttrace, gaugeChart);

    });
 

}


function BuildMetaData(selected) {
    
    d3.json("samples.json").then((data) => {
    
    // data.meta_data filter -- just repeat what you did above then console log to make sure you are getting the data you think you are getting 
        //id ethnictiy gender age location 
       
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



// function BuildGaugeChart(selected) {
    
//     d3.json("samples.json").then((data) => {
    
//     // data.meta_data filter -- just repeat what you did above then console log to make sure you are getting the data you think you are getting 
//         //id ethnictiy gender age location 
       
//     // let results_array = data.metadata.filter(participant => participant.id == parseInt(selected));
           
//     let results_arrayG = data.metadata.filter(participant => participant.id == selected);

//     let resultsG = results_arrayG[0];
//     //not sure what wfreq is? 
//     let wfreq = resultsG.wfreq;


     

//     let gaugeCharttrace= [
//         { 
//           value: wfreq, 
//           type: "indicator",
//           mode: "gauge",
//           value: 420,
//           title: { text: "Test", font: { size: 24 } },
//           delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//           gauge: {
//             axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
//             bar: { color: "darkblue" },
//             bgcolor: "white",
//             borderwidth: 2,
//             bordercolor: "gray",
//             steps: [
//               { range: [0, 250], color: "cyan" },
//               { range: [250, 400], color: "royalblue" }
//             ],
//             threshold: {
//               line: { color: "red", width: 4 },
//               thickness: 0.75,
//               value: 490
//             }
//           }
//         }
//       ];
      
//       var layout = {
//         title: "test again for title",
//         width: 500,
//         height: 400,
//         margin: { t: 25, r: 25, l: 25, b: 25 },
//         paper_bgcolor: "lavender",
//         font: { color: "darkblue", family: "Arial" }
//       };
//       //div id in html is gauge 
//       Plotly.newPlot('gauge', gaugeCharttrace, layout);
      
//     });

// };


// function BuildPieChart(selected) { 
//     d3.json("samples.json").then((data) => {
    
//         // data.meta_data filter -- just repeat what you did above then console log to make sure you are getting the data you think you are getting 
//             //id ethnictiy gender age location 
           
//         let results_array = data.metadata.filter(participant => participant.id == parseInt(selected));
    
//         PieChart(results_array[0]); 

// }






// function BuildBubbleChart(data) {

    
//     d3.json("samples.json").then((data) => {
    
//     console.log(data)
    
//     let results = data.samples.filter(obj => obj.id == selected)
//     console.log(results);

//     let ids = results[0].otu_ids;
//     let labels = results[0].otu_labels;
//     let sampleValues = results[0].sample_values;

//     // trace2
  
//     let bubbleChart = {
//         title: "--", 
//         hovermode: "closest",
//         xaxis: {title: "OTU ID"},
//     }
    
//     let trace2 = {
//         x: ids,
//         y: sampleValues,
//         text: labels, 
//         mode: "markers",
//         marker: { 
//             size: sampleValues,
//             color: ids,
//             colorscale:"Earth"
//         }
   
//       };

    
//     let traceData2 = [trace2];
    
//     // div id "bubble"
//     // plotly.newPlot 
//     Plotly.newPlot("bubble", traceData2);

//     })

// }






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
    // BuildGaugeChart(data.names[0])
    // BuildBubbleChart(data.names[0]);

});
    
//everytime we get a change we get a console.log and seeing what the person selected from the drop down menu 

function optionChanged(selected){
       
        BuildCharts(selected);
        BuildMetaData(selected);
}