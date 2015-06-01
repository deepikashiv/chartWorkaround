 var data = [{"moduleName":"Module1","moduleId":"1","notStarted":"10","skipped":"10","passed":"10","failed":"10"},
             {"moduleName":"Module2","moduleId":"2","notStarted":"28","skipped":"28","passed":"28","failed":"28"},
             {"moduleName":"Module3","moduleId":"3","notStarted":"13","skipped":"13","passed":"13","failed":"13"},
             {"moduleName":"Module4","moduleId":"4","notStarted":"40","skipped":"40","passed":"40","failed":"40"},
             {"moduleName":"Module5","moduleId":"5","notStarted":"35","skipped":"35","passed":"35","failed":"35"},
             {"moduleName":"Module6","moduleId":"6","notStarted":"20","skipped":"20","passed":"20","failed":"40"},
             {"moduleName":"Module7","moduleId":"7","notStarted":"30","skipped":"28","passed":"30","failed":"12"},
             {"moduleName":"Module8","moduleId":"8","notStarted":"25","skipped":"25","passed":"25","failed":"25"},
             {"moduleName":"Module9","moduleId":"9","notStarted":"40","skipped":"10","passed":"40","failed":"10"},
             {"moduleName":"Module10","moduleId":"10","notStarted":"45","skipped":"0","passed":"45","failed":"10"}];

var margin = {top: 30, right: 10, bottom: 20, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width],.1); //width-100 to make room for the legend.

  var yScale = d3.scale.linear()
    .rangeRound([height, 0]);

  var color = d3.scale.ordinal()
    .range(["#18aadb","#18d676","#fe5a59","#fec418"]); //blue, orange, red

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

  var svgContainer = d3.select("#chartID").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /*Filter moduleName & mmoduleId keys*/
    color.domain(d3.keys(data[0]).filter(function(key) { return (key !== "moduleName"&& key !== "moduleId"); }));   

    data.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.ages[d.ages.length - 1].y1;
    });

    xScale.domain(data.map(function(d) { return d.moduleName; }));
    yScale.domain([0, d3.max(data, function(d) { return d.total; })]);


    var xAxis_g = svgContainer.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height) + ")")
      .call(xAxis);

    var yAxis_g = svgContainer.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6).attr("dy", ".71em")
          .style("text-anchor", "end").text("Percentage");

  var state = svgContainer.selectAll(".state")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) { return "translate(" + xScale(d.moduleName) + ",0)"; });

    state.selectAll("rect")
      .data(function(d) { return d.ages; })
      .enter().append("rect")
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.y1); })
      .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1); })
      .style("fill", function(d) { return color(d.name); });

       d3.select(window).on('resize', resize); 

 function resize() {
 console.log('----resize function----');
  // update width
   width = parseInt(d3.select('#chartID').style('width'), 10);
   width = width - margin.left - margin.right;

  height = parseInt(d3.select("#chartID").style("height"));
   height = height - margin.top - margin.bottom;
  console.log('----resiz width----'+width);
  console.log('----resiz height----'+height);
     // resize the chart
   if(width<870){
     //xScale.range([0, width]);
     xScale.rangeRoundBands([0, width], .1);
     yScale.range([height, 0]);

     yAxis.ticks(Math.max(height/50, 2));
     xAxis.ticks(Math.max(width/50, 2));

     d3.select(svgContainer.node().parentNode)
         .style('width', (width + margin.left + margin.right) + 'px');

     /*svgContainer.selectAll('.bar')
      .attr("x", function(d) { return xScale(d.moduleName); })
       .attr("width", xScale.rangeBand());*/


     svgContainer.selectAll("rect")
                 .attr("x",function(d) { return d.moduleName; })
                 .attr("width", xScale.rangeBand())

     svgContainer.select('.x.axis').call(xAxis.orient('bottom')); 
   }  
 }