// set up SVG for D3
// Store our chart dimensions

function PieChart(data, dimensions,id, duration, is_show_circle_min){
	let svg = d3.select('#'+id)
            .append('svg')
            .attr({height: '98%',width: '100%'})
    	    	.attr('viewBox','0 0 '+ dimensions.width +' '+ dimensions.height)
    	    	.attr('preserveAspectRatio','xMinYMax meet');
	let canvas = svg.append('g').attr('id', 'canvas');
	let art = d3.select('#'+id)
		.select("#canvas")
		.append('g')
		.attr('id','art');


	let jhw_pie = d3.layout.pie();
	jhw_pie.value(function (d, i) {
		// Tells the layout function what
		// property of our data object to
		// use as the value.
		  return d.value;

	});

	canvas.attr("transform", "translate(" + (dimensions.width / 2) + "," + (dimensions.height / 2) + ")");

	let pie_data = jhw_pie(data);
	let pied_arc = d3.svg.arc()
		.innerRadius(dimensions.innerRadius)
		.outerRadius(dimensions.outerRadius);

	d3.select('#'+id).append("div").attr("class", "pie-chart-toolTip");

	// Let's start drawing the arcs.
	let enteringArcs = art.selectAll(".arc")
		.data(pie_data)
		.enter()
		.append("g")
		.attr("class","pie-chart-arc");

	if (is_show_circle_min) {
        enteringArcs.append("circle")
            .attr('cx', dimensions.outerRadius)
            .attr('cy', -dimensions.outerRadius / 2)
            .attr('r', '40')
            .attr('stroke', 'rgba(255,0,0,0.6)')
            .attr('stroke-width', '6')
            .attr('fill', 'white');

        enteringArcs.append("circle")
            .attr("cx", dimensions.outerRadius)
            .attr("cy", dimensions.outerRadius / 2)
            .attr("r", 40)
            .attr('fill', 'white')
            .attr('stroke', "rgb(251,151,0)")
            .attr('stroke-width', '6');
    }

	enteringArcs.append("path")
		.style("fill", function (d, i) {
			if(d.data.value > 0)
				return d.data.color;
			})
		.attr('d', pied_arc);

	enteringArcs.append("text")
		.attr("text-anchor", "middle")
		.attr('y', 0)
		.html(function(d){
			return '<tspan x=0 font-size=45px fill='+d.data.color+'>'+d.data.label+'</tspan > <tspan x=0 y=40 font-size=30px>' + duration +'</tspan> '
		});
	if (is_show_circle_min){

		enteringArcs.append("text")
			.attr("text-anchor", "middle")
			.attr("x", dimensions.outerRadius)
			.attr("y", -dimensions.outerRadius/2)
			.attr("fill",'rgba(255,0,0,0.6)')
			.text('NO');

		enteringArcs.append("image")
			.attr("xlink:href", "http://greatforestparkballoonrace.com/wp-content/uploads/2014/06/arrow-animate6.gif")
			.attr("x", dimensions.outerRadius-20)
			.attr("y", dimensions.outerRadius/2-5)
			.attr("width", 40)
			.attr("height", 40);
	}

}



