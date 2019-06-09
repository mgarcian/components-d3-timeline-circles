/*modified from Mike Bostock at http://bl.ocks.org/3943967 */

let laneLength = 1,
items = [{"start": 0, "end": 205, "color":"red", "asumido":true,"internos":[]},
    { "start": 205, "end": 220, "color":"yellow","asumido":false,"internos":[
        { "start": 0, "end": 7, "color":"green","asumido":false},
          { "start": 7, "end": 15, "color":"red","asumido":false}
         ],'dateStart':'1/10/2018:12:20:0','dateEnd':'1/10/2018 13:00:00'},
         {"start": 220, "end": 420,"color":"green","asumido":false,"internos":[]},
         { "start": 420, "end": 615,"color":"yellow","asumido":false,"internos":[
         { "start": 0, "end": 7, "color":"rgb(46, 204, 64)","asumido":false},
          { "start": 7, "end": 15, "color":"red","asumido":false},
          { "start": 15, "end": 25, "color":"green","asumido":false}],
             'dateStart':'1/10/2018 17:20:00','dateEnd':'1/10/2018 19:00:00'},
         { "start": 615, "end": 900,"color":"red","asumido":false,"internos":[]},
         {"start": 900, "end": 1265,"color":"yellow","asumido":false,"internos":[
             { "start": 0, "end": 125, "color":"green","asumido":false},
             { "start": 125, "end": 200, "color":"red","asumido":false},
          { "start": 200, "end": 365, "color":"green","asumido":false}
             ],'dateStart':'1/10/2018 20:20:00','dateEnd':'1/10/2018 23:00:00'},
         { "start": 1265, "end": 1365,"color":"green","asumido":false,"internos":[]},
         { "start": 1365, "end": 1640,"color":"red","asumido":false,"internos":[]},
         {"start": 1640, "end": 2000,"color":"red","asumido":false,"internos":[]}],
initDate = "1/10/2018 10:10:00",
endDate = "2/10/2018 10:10:00", timeBegin = 0, height = 40, timeEnd = 2000;
    let m = [20, 15, 15, 25], //top right bottom left
        w = 800 - m[1] - m[3],
        h = 200 - m[0] - m[2],
        miniHeight = h ;

timeline('time-line',laneLength, items, initDate, endDate, w,  miniHeight,m,height);
function timeline(id, laneLength, items, initDate, endDate, w,miniHeight,m,height) {
    //scales
    let x = d3.scale.linear()
            .domain([timeBegin, timeEnd])
            .range([0, w]);

    let chartTimeline = d3.select("#"+id)
                .append("svg")
                .attr("width", '100%')
                .attr("height",'98%')
      .attr('viewBox','0 0 '+ (w + m[1] + m[3]) +' '+ (miniHeight + m[0] + m[2]))
                .attr("class", "chart");

    let stripedColor = function (chartTimeline, colour,id){
        let svgDefs = chartTimeline.append('defs');
        let mainGradient = svgDefs.append('linearGradient')
                                  .attr('id', id)
                                  .attr('x1',"18%")
                                  .attr('y1',"4%")
                                  .attr('x2',"10%")
                                  .attr('y2',"10%")
                                  .attr('spreadMethod',"reflect");
        mainGradient.append('stop')
                    .attr('stop-color', colour)
                    .attr('offset', '40%');
        mainGradient.append('stop')
                    .attr('stop-color', 'white')
                    .attr('offset', '50%');
    };
    stripedColor(chartTimeline,'rgb(255, 115, 115)','Gradient');
    stripedColor(chartTimeline,'rgb(46, 204, 64)','GradientG');
    function chartGeneral(chartTimeline,m,w,miniHeight, height, className){
       let mini = chartTimeline.append("g")
           .attr("transform", "translate(" + m[3] + "," + (m[0] + 2*height) + ")")
           .attr("width", w)
           .attr("height", miniHeight)
           .attr("class", className);
       return mini;
    }
    let mini = chartGeneral(chartTimeline,m,w,miniHeight, 0, 'mini');

    //mini lanes and texts
    mini.append("g").selectAll(".laneLines")
        .data([1])
        .enter().append("line")
        .attr("x1", 0)
        .attr("y1", height)
        .attr("x2", w)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width",3);

    mini.append("g").selectAll(".laneText")
        .data([initDate])
        .enter().append("text")
        .text(function(d) {return d;})
        .attr("x", 0)
        .attr("y", height + 12)
        .attr("dy", ".5ex")
        .attr("class", "label-text");

    mini.append("g").selectAll(".laneText")
            .data([endDate])
            .enter().append("text")
            .text(function(d) {return d;})
            .attr("x", w)
            .attr("y", height + 12)
            .attr("dy", ".5ex")
      .attr("text-anchor", "end")
            .attr("class", "label-text");

        //mini item rects

    mini.append("g").selectAll("miniItems")
        .data(items)
        .enter().append("rect")
        .attr("x", function(d) {return x(d.start);})
        .attr("y", 0)
        .attr("width", function(d) {return x(d.end - d.start);})
        //.attr("stroke", function(d) {return d.color})
        .attr("class",function(d){
        if(d.asumido){
          return d.color + "_decision";
        }else{
          return d.color
        }})
        .attr("height", height);
    mini.selectAll('rect').on('click', function(d){
        $('.expand').remove();
        this.parentNode.parentNode.classList.remove("chart-expand");
        if(this.classList.contains("expands")){
            this.classList.remove("expands");

        }else{
        mini.selectAll(".expands").classed("expands",false);
            if(d.internos.length>0){
                var valor_max = 0;
                for (var i=0;i<d.internos.length; i++){
                    valor_max = valor_max < d.internos[i].end ? d.internos[i].end: valor_max;
                }
            this.classList.add("expands");
            this.parentNode.parentNode.classList.add("chart-expand");
            var auxx = d3.scale.linear()
                      .domain([0, valor_max])
                      .range([0, w]);
            var expand = chartGeneral(chartTimeline,m,w,miniHeight,height,"expands")
            expand.append("g").selectAll(".laneLines")
                .data(items)
                .enter().append("line")
                .attr("x1", 0)
                .attr("y1", height/2)
                .attr("x2", w)
                .attr("y2", height/2)
                .attr("stroke", "black")
                .attr("stroke-width",3);

            expand.append("g").selectAll(".laneText")
                .data([d.dateStart])
                .enter().append("text")
                .text(function(d) {return d;})
                .attr("x", 0)
                .attr("y", height/2 + 12)
                .attr("dy", ".5ex")
                .attr("class", "label-text");

            expand.append("g").selectAll(".laneText")
                .data([d.dateEnd])
                .enter().append("text")
                .text(function(d) {return d;})
                .attr("x", w)
                .attr("y", height/2 + 12)
                .attr("dy", ".5ex")
                .attr("text-anchor", "end")
                .attr("class", "label-text");

            expand.append("g").selectAll("miniItems")
                .data(d.internos)
                .enter().append("rect")
                .attr("x", function(d) {return auxx(d.start);})
                .attr("y", 0)
                .attr("width", function(d) {return auxx(d.end - d.start);})
                .attr("fill",function(d){
                    if(d.asumido){
                        return "url(#Gradient)"
                    }else{
                        return d.color
                    }
                })
               .attr("height", height/2)
               .attr("stroke",function(d){return d.color})
               .attr("stroke-width","2px");
            }
        }

    });
}





