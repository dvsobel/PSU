var data = {
  labels: [
    'KENT vs. PSU', 'PITT vs. PSU', 'TEMPLE vs. PSU',
    'MICHIGAN vs. PSU', 'MINNESOTA vs. PSU', 'MARYLAND vs. PSU', 'OSU vs. PSU', 'PURDUE vs. PSU', 'IOWA vs. PSU',
    'INDIANA vs. PSU', 'RUTGERS vs. PSU', 'MICHIGAN STATE vs. PSU', 'WISCONSIN vs. PSU', 'USC vs. PSU'
  ],
  series: [
  {
        label: 'Penn State',
      values: [17, 25, 13, 10, 26, 14, 17, 45, 17, 17, 30, 35, 24, 28]
    },
    {
      label: 'Kent State',
      values: [0,null , null,null ,null ,null ,null , null, null,null ,null ,null ,null ,null ]
    },
 

     {
      label: 'Pittsburgh',
      values: [null,14, null, null, null, null,null ,null , null, null, null,null , null, null]
    },

    {
      label: 'Temple',
      values: [null,null ,17 ,null ,null ,null ,null , null,null , null,null , null,null , null]
    },

    {
      label: 'Michigan',
      values: [null, null, null,21 ,null , null,null , null,null , null, null, null,null , null]
    },

    {
      label: 'Minnesota',
      values: [null, null, null, null, 13, null,null , null,null , null, null, null,null , null]
    },

    {
      label: 'Maryland',
      values: [null, null, null,null  ,null , 0,null , null,null , null, null, null,null , null]
    },

    {
      label: 'Ohio State',
      values: [null, null, null,null  ,null , null,9, null,null , null, null, null,null , null]
    },

    {
      label: 'Purdue',
      values: [null, null, null,null  ,null , null,null , 7,null , null, null, null,null , null]
    },

  {
      label: 'Iowa',
      values: [null, null, null,null  ,null , null,null , null,7 , null, null, null,null , null]
    },

      {
      label: 'Indiana',
      values: [null, null, null,null  ,null , null,null , null,null , 17, null, null,null , null]
    },

      {
      label: 'Rutgers',
      values: [null, null, null,null  ,null , null,null , null,null , null, 0, null,null , null]
    },

       {
      label: 'Michigan State',
      values: [null, null, null,null  ,null , null,null , null,null , null, null, 0,null , null]
    },

        {
      label: 'Wisconsin',
      values: [null, null, null,null  ,null , null,null , null,null , null, null, null,3, null]
    },

        {
      label: 'University of Southern California',
      values: [null, null, null,null  ,null , null,null , null,null , null, null, null,null , 35]
    },
]
    
};




   





var chartWidth       = 300,
    barHeight        = 10,
    groupHeight      = barHeight 
    gapBetweenGroups = 0,
    spaceForLabels   = 200,
    spaceForLegend   = 150;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}





// Color scale
var color = d3.scale.category20();
var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);

var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)

    .enter().append("g")

    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });
    d3.select('data.series.values').selectAll(null).remove(null);

// d3.select('data.series.values').selectAll(null).remove();

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % data.series.length); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight);

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return ""});

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);

// Draw legend
var legendRectSize = 18,
    legendSpacing  = 4;

var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return color(i); })
    .style('stroke', function (d, i) { return color(i); });

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });



