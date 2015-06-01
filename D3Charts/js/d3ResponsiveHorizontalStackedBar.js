 var dataset = [{"key":"Completion","values":[{"name":"Module 1","value":30},{"name":"Module 2","value":60},{"name":"Module 3","value":20},{"name":"Module 4","value":80},{"name":"Module 5","value":90},{"name":"Module 6","value":58},{"name":"Module 7","value":84},{"name":"Module 8","value":0.56},{"name":"Module 9","value":13.24},{"name":"Module 10","value":12.66}]},{"key":"NonCompletion","values":[{"name":"Module 1","value":70},{"name":"Module 2","value":40},{"name":"Module 3","value":80},{"name":"Module 4","value":20},{"name":"Module 5","value":10},{"name":"Module 6","value":42},{"name":"Module 7","value":16},{"name":"Module 8","value":99.44},{"name":"Module 9","value":86.76},{"name":"Module 10","value":87.34}]}];

         var margin = { top: 12, left: 75, right: 24, bottom: 24 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal().rangeRoundBands([0, width], .1,.1)

        var y = d3.scale.linear().rangeRound([height, 0], .1);

        var series = dataset.map(function(d) {
            return d.key;
        });
                
            dataset = dataset.map(function(d) {
                return d.values.map(function(o, i) {
                    // Structure it so that your numeric
                    // axis (the stacked amount) is y
                    return {
                        y: o.value,
                        x: o.name
                    };
                });
            });

        var stack = d3.layout.stack();
            stack(dataset);

        var dataset = dataset.map(function(
            group) {
            return group.map(function(d) {
                // Invert the x and y values, and y0 becomes x0
                return {
                    x: d.y,
                    y: d.x,
                    x0: d.y0
                };
            });
        });
                //console.log("------"+JSON.stringify(dataset));
                var xMax = d3.max(dataset, function(
                    group) {
                    return d3.max(group, function(d) {
                        return d.x + d.x0;
                    });
                });

                var xScale = d3.scale.linear()
                    .domain([0, xMax])
                    .range([0, width]);

                var moduleName = dataset[0]
                    .map(function(d) {
                        return d.y;
                    });

                var yScale = d3.scale.ordinal()
                    .domain(moduleName)
                    .rangeRoundBands([height,0],.1); 
				
        svgContainer = d3.select('#chartID')
                .append('svg')
                .attr('width', width + margin.left + margin.right )
                .attr('height', height + margin.top + margin.bottom+100)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'),
		
        xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .tickSize(1)
                .tickPadding(20)
    			.tickFormat(function(d) { return d + "%"; }),

        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickSize(1);

        var colours =d3.scale.ordinal().range(['#1F77B4','#FF7F0E']);
		
        var groups = svgContainer.selectAll('g')
            .data(dataset)
            .enter()
            .append('g').attr('class','stacked')
                .style('fill', function(d, i) {
                    return colours(i);
                });

        var rects = groups.selectAll('stackedBar')
            .data(function(d,i) { return d; })
            .enter()
            .append('rect').attr('class','stackedBar')
            .attr('x', function(d) { return xScale(d.x0); })
            .attr('y', function(d, i) {return yScale(d.y); })
            .attr('height', function(d) { return yScale.rangeBand(); })
            .attr('width', 0)
		
		 rects
			.transition()
			.delay(function(d,i){ return i*500; })
			.attr("x", function(d) { return xScale(d.x0); })
			.attr("width", function(d) {return xScale(d.x); })
			.duration(1000);
			
		//Added
		x.domain(dataset.map(function(d) { return d.value; }));	
		y.domain([0, d3.max(dataset, function(d) { return d.name; })]);		
			
        svgContainer.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svgContainer.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.5em")
            .attr("dy", ".15em")
            .attr("opacity", 1)
            .attr("transform", function(d) {
            return "rotate(-40)"
            })
    
          
          d3.select(window).on('resize', resize); 

 function resize() {
  // update width
   width = parseInt(d3.select('#chartID').style('width'), 10);
   width = width - margin.left - margin.right;

  height = parseInt(d3.select("#chartID").style("height"));
  height = height - margin.top - margin.bottom;
     // resize the chart
   if(width<1000){
    
     xScale.range([0, width]);
     yScale.rangeRoundBands([ height,0], .1);

     d3.select(svgContainer.node().parentNode)
         .style('width', (width + margin.left + margin.right) + 'px');

     svgContainer.selectAll("rect")
                 .attr("x", function(d) { return xScale(d.x0); })
                 .attr("width", function(d) {return xScale(d.x); })

     svgContainer.select('.x.axis').call(xAxis.orient('bottom')); 
   }  
 }