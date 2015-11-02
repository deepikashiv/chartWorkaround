var data1 = [{"moduleName":"Module1","moduleId":"1","maximum_engagement":"100","minimum_engagement":"0"},{"moduleName":"Module2","moduleId":"2","maximum_engagement":"80","minimum_engagement":"20"},{"moduleName":"Module3","moduleId":"3","maximum_engagement":"70","minimum_engagement":"30"},{"moduleName":"Module4","moduleId":"4","maximum_engagement":"60","minimum_engagement":"40"},{"moduleName":"Module5","moduleId":"5","maximum_engagement":"50","minimum_engagement":"50"},{"moduleName":"Module6","moduleId":"6","maximum_engagement":"40","minimum_engagement":"60"},{"moduleName":"Module7","moduleId":"7","maximum_engagement":"30","minimum_engagement":"70"},{"moduleName":"Module8","moduleId":"8","maximum_engagement":"20","minimum_engagement":"80"},{"moduleName":"Module9","moduleId":"9","maximum_engagement":"10","minimum_engagement":"90"},{"moduleName":"Module10","moduleId":"10","maximum_engagement":"0","minimum_engagement":"100"}
        ,{"moduleName":"Module11","moduleId":"11","maximum_engagement":"100","minimum_engagement":"0"},{"moduleName":"Module12","moduleId":"12","maximum_engagement":"80","minimum_engagement":"20"}
        ,{"moduleName":"Module13","moduleId":"13","maximum_engagement":"70","minimum_engagement":"30"},{"moduleName":"Module14","moduleId":"14","maximum_engagement":"60","minimum_engagement":"40"},{"moduleName":"Module15","moduleId":"15","maximum_engagement":"50","minimum_engagement":"50"},{"moduleName":"Module16","moduleId":"16","maximum_engagement":"40","minimum_engagement":"60"},{"moduleName":"Module17","moduleId":"17","maximum_engagement":"30","minimum_engagement":"70"},{"moduleName":"Module18","moduleId":"18","maximum_engagement":"20","minimum_engagement":"80"},{"moduleName":"Module19","moduleId":"19","maximum_engagement":"10","minimum_engagement":"90"},{"moduleName":"Module20","moduleId":"20","maximum_engagement":"0","minimum_engagement":"100"},{"moduleName":"Module21","moduleId":"21","maximum_engagement":"100","minimum_engagement":"0"},{"moduleName":"Module22","moduleId":"22","maximum_engagement":"80","minimum_engagement":"20"},{"moduleName":"Module23","moduleId":"23","maximum_engagement":"70","minimum_engagement":"30"},{"moduleName":"Module24","moduleId":"24","maximum_engagement":"60","minimum_engagement":"40"},{"moduleName":"Module25","moduleId":"25","maximum_engagement":"50","minimum_engagement":"50"},{"moduleName":"Module26","moduleId":"26","maximum_engagement":"40","minimum_engagement":"60"},{"moduleName":"Module27","moduleId":"27","maximum_engagement":"30","minimum_engagement":"70"},{"moduleName":"Module28","moduleId":"28","maximum_engagement":"20","minimum_engagement":"80"},{"moduleName":"Module29","moduleId":"29","maximum_engagement":"10","minimum_engagement":"90"},{"moduleName":"Module30","moduleId":"30","maximum_engagement":"0","minimum_engagement":"100"},{"moduleName":"Module31","moduleId":"31","maximum_engagement":"100","minimum_engagement":"0"},{"moduleName":"Module32","moduleId":"32","maximum_engagement":"80","minimum_engagement":"20"},{"moduleName":"Module33","moduleId":"33","maximum_engagement":"70","minimum_engagement":"30"},{"moduleName":"Module34","moduleId":"34","maximum_engagement":"60","minimum_engagement":"40"},{"moduleName":"Module35","moduleId":"35","maximum_engagement":"50","minimum_engagement":"50"},{"moduleName":"Module36","moduleId":"36","maximum_engagement":"40","minimum_engagement":"60"},{"moduleName":"Module37","moduleId":"37","maximum_engagement":"30","minimum_engagement":"70"},{"moduleName":"Module38","moduleId":"38","maximum_engagement":"20","minimum_engagement":"80"},{"moduleName":"Module39","moduleId":"39","maximum_engagement":"10","minimum_engagement":"90"},{"moduleName":"Module40","moduleId":"40","maximum_engagement":"0","minimum_engagement":"100"},{"moduleName":"Module41","moduleId":"41","maximum_engagement":"100","minimum_engagement":"0"},{"moduleName":"Module42","moduleId":"42","maximum_engagement":"80","minimum_engagement":"20"},{"moduleName":"Module43","moduleId":"43","maximum_engagement":"70","minimum_engagement":"30"},{"moduleName":"Module44","moduleId":"44","maximum_engagement":"60","minimum_engagement":"40"},{"moduleName":"Module45","moduleId":"45","maximum_engagement":"50","minimum_engagement":"50"},{"moduleName":"Module46","moduleId":"46","maximum_engagement":"40","minimum_engagement":"60"},{"moduleName":"Module47","moduleId":"47","maximum_engagement":"30","minimum_engagement":"70"},{"moduleName":"Module48","moduleId":"48","maximum_engagement":"20","minimum_engagement":"80"},{"moduleName":"Module49","moduleId":"49","maximum_engagement":"10","minimum_engagement":"90"},{"moduleName":"Module50","moduleId":"50","maximum_engagement":"0","minimum_engagement":"100"},{"moduleName":"Module51","moduleId":"51","maximum_engagement":"100","minimum_engagement":"0"},{"moduleName":"Module52","moduleId":"52","maximum_engagement":"80","minimum_engagement":"20"},{"moduleName":"Module53","moduleId":"53","maximum_engagement":"70","minimum_engagement":"30"},{"moduleName":"Module54","moduleId":"54","maximum_engagement":"60","minimum_engagement":"40"},{"moduleName":"Module55","moduleId":"55","maximum_engagement":"50","minimum_engagement":"50"},{"moduleName":"Module56","moduleId":"56","maximum_engagement":"40","minimum_engagement":"60"},{"moduleName":"Module57","moduleId":"57","maximum_engagement":"30","minimum_engagement":"70"},{"moduleName":"Module58","moduleId":"58","maximum_engagement":"20","minimum_engagement":"80"},{"moduleName":"Module59","moduleId":"59","maximum_engagement":"10","minimum_engagement":"90"},{"moduleName":"Module60","moduleId":"60","maximum_engagement":"0","minimum_engagement":"100"}];

var data2 = [{"moduleName":"Module","moduleId":"500","maximum_engagement":"50","minimum_engagement":"50"}];

change_data= data1.slice(0,12);

var margin = {top: 30, right: 10, bottom: 20, left: 80},
    width = 960 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom;

  var xScale = d3.scale.ordinal()
    .rangeRoundBands([80, width],.1); 

  var yScale = d3.scale.linear()
    .rangeRound([height, 0]);

  var color = d3.scale.ordinal()
    .range(["#607a8b","#fdd009"]); //blue, orange, red

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(0)
    .tickSize(0);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(0)
    .tickSize(0);

  var svgContainer = d3.select("#chartID").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+100)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  dataset1(change_data);
  dataset2(data2);

function dataset1(change_data){
    /*Filter moduleName & mmoduleId keys*/
    color.domain(d3.keys(change_data[0]).filter(function(key) { return (key !== "moduleName"&& key !== "moduleId"); }));   

    change_data.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.ages[d.ages.length - 1].y1;
    });

    xScale.domain(change_data.map(function(d) { return d.moduleName; }));
    yScale.domain([0, d3.max(change_data, function(d) { return d.total; })]);


    var xAxis_g = svgContainer.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(-17," + (height+50) + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("transform","rotate(45)")
      .attr("x",25)
      .attr("y",25);

    var yAxis_g = svgContainer.append("g")
          .attr("class", "y axis")
          .call(yAxis)

  var state = svgContainer.selectAll(".state")
      .data(change_data)
      .enter().append("g")
      //.attr("class", "g")
      .attr("class",function(d){
        return 'g '+d.moduleName;
      })
      .attr("transform", function(d) { return "translate(" + xScale(d.moduleName) + ",0)"; });

    state.selectAll("rect")
          .data(function(d) { return d.ages; })
          .enter().append("rect")
          //.attr("width", xScale.rangeBand())
          .transition()
          .duration(500)  // <-- Now this is new!
          .ease("linear")
          .attr("width", 15)
          .attr("y", function(d) { return yScale(d.y1); })
          .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1); })
          .style("fill", function(d) { return color(d.name); });

var axes = svgContainer.selectAll(".x axis")
      .data(change_data)
      .enter().append("g")
      //.attr("class", "g")
      .attr("class",function(d){
        return 'axes '+d.moduleName;
      })
      .attr("transform", "translate(0," + (height+50) + ")");

    axes.selectAll('circle')
      .data(change_data)
      .enter().append('circle')
      .attr("class","click points")
      .transition()
      .duration(800)  // <-- Now this is new!
      .ease("linear")
      .attr('cy', 0)
      .attr('cx', function(d,i){return xScale(d.moduleName)})           
      .style({
        "fill":"#2abcaf",
        "stroke":"#EFEFEF",
        "stroke-width":"4px"
      })          
      .attr('r',7);
}

function dataset2(data2){
  /*Filter moduleName & mmoduleId keys*/
    color.domain(d3.keys(data2[0]).filter(function(key) { return (key !== "moduleName"&& key !== "moduleId"); }));   

    data2.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.ages[d.ages.length - 1].y1;
    });

    xScale.domain(data2.map(function(d) { return d.moduleName; }));
    yScale.domain([0, d3.max(data2, function(d) { return d.total; })]);

  var state = svgContainer.selectAll(".state")
      .data(data2)
      .enter().append("g")
      //.attr("class", "g")
      .attr("class",function(d){
        return 'g '+d.moduleName;
      })
      .attr("transform", function(d) { return "translate(0,0)"; });

    state.selectAll("rect")
      .data(function(d) { return d.ages; })
      .enter().append("rect")
      .transition()
      .duration(1000)  // <-- Now this is new!
      .ease("linear")
      //.attr("width", xScale.rangeBand())
      .attr("width", 50)
      .attr("y", function(d) { return yScale(d.y1); })
      .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1); })
      .style("fill", function(d) { return color(d.name); });
}


navigateBars();

function updateBarChart(change_data){

//  console.log('inside updateChart',JSON.stringify(change_data));
  $('#chartID').empty();

    var svgContainer = d3.select("#chartID").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+100)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

       /*Filter moduleName & mmoduleId keys*/
    color.domain(d3.keys(change_data[0]).filter(function(key) { return (key !== "moduleName"&& key !== "moduleId"); }));   

    change_data.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.ages[d.ages.length - 1].y1;
    });

    xScale.domain(change_data.map(function(d) { return d.moduleName; }));
    yScale.domain([0, d3.max(change_data, function(d) { return d.total; })]);


    var xAxis_g = svgContainer.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(-17," + (height+50) + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("transform","rotate(45)")
      .attr("x",25)
      .attr("y",25);

    var yAxis_g = svgContainer.append("g")
          .attr("class", "y axis")
          .call(yAxis)

  var state = svgContainer.selectAll(".state")
      .data(change_data)
      .enter().append("g")
      //.attr("class", "g")
      .attr("class",function(d){
        return 'g '+d.moduleName;
      })
      .attr("transform", function(d) { return "translate(" + xScale(d.moduleName) + ",0)"; });

    state.selectAll("rect")
          .data(function(d) { return d.ages; })
          .enter().append("rect")
          .transition()
          .duration(500)  // <-- Now this is new!
          .ease("linear")
          //.attr("width", xScale.rangeBand())
          .attr("width", 15)
          .attr("y", function(d) { return yScale(d.y1); })
          .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1); })
          .style("fill", function(d) { return color(d.name); });

var axes = svgContainer.selectAll(".x axis")
      .data(change_data)
      .enter().append("g")
      //.attr("class", "g")
      .attr("class",function(d){
        return 'axes '+d.moduleName;
      })
      .attr("transform", "translate(0," + (height+50) + ")");

    axes.selectAll('circle')
      .data(change_data)
      .enter().append('circle')
      .attr("class","click points")
      .transition()
      .duration(800)  // <-- Now this is new!
      .ease("linear")
      .attr('cy', 0)
      .attr('cx', function(d,i){return xScale(d.moduleName)})           
      .style({
        "fill":"#2abcaf",
        "stroke":"#EFEFEF",
        "stroke-width":"4px"
      })          
      .attr('r',7);


      /*Chart Summary -start*/

/*Filter moduleName & mmoduleId keys*/
    color.domain(d3.keys(data2[0]).filter(function(key) { return (key !== "moduleName"&& key !== "moduleId"); }));   

    data2.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.ages[d.ages.length - 1].y1;
    });

    xScale.domain(data2.map(function(d) { return d.moduleName; }));
    yScale.domain([0, d3.max(data2, function(d) { return d.total; })]);

  var state = svgContainer.selectAll(".state")
      .data(data2)
      .enter().append("g")
      //.attr("class", "g")
      .attr("class",function(d){
        return 'g '+d.moduleName;
      })
      .attr("transform", function(d) { return "translate(0,0)"; });

    state.selectAll("rect")
      .data(function(d) { return d.ages; })
      .enter().append("rect")
      .transition()
      .duration(1000)  // <-- Now this is new!
      .ease("linear")
      //.attr("width", xScale.rangeBand())
      .attr("width", 50)
      .attr("y", function(d) { return yScale(d.y1); })
      .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1); })
      .style("fill", function(d) { return color(d.name); });

      /*Chart Summary -end*/

}

var count = 12;
function navigateBars(){
  $('#next').on("click",function(){
    if(count !== data1.length){
      $.each( data1, function( i, l ){
        delete data1[i].ages;
        delete data1[i].total;
      });
      $.each( data2, function( i, l ){
        delete data2[i].ages;
        delete data2[i].total;
      });
     // console.log("re-form",JSON.stringify(data1,"**1**",data2,"**2**"));
      temparray = data1.slice(count,count+12);
      count=count+12;
      updateBarChart(temparray);
    }
  });
 
    $('#prev').on("click",function(){
    if(count !== 12){
      $.each( data1, function( i, l ){
        delete data1[i].ages;
        delete data1[i].total;
      });
      $.each( data2, function( i, l ){
        delete data2[i].ages;
        delete data2[i].total;
      });
      //console.log("re-form",JSON.stringify(data1));
      temparray = data1.slice(count-24,count-12);
      count=count-12;
      updateBarChart(temparray);
    }
  });
}