
  // Create a Tooltip
  var Tooltip = d3.select("#tooltip")

  .style("border-radius", "5px")
  .style("padding", "5px")


    d3.csv("houses_to_rent.csv")
    .then(function(csvData){
        console.log(csvData);

        function updateBarChart(city) {

            var cityData = csvData
                .filter(function(d) {
                    return d.city === city;
                });
            
            console.log(city, cityData);

                    var roomData = Array.from(d3.group(cityData, 
                        function(d) {
                            return d.rooms;
                }), 
                    function(arr) {

                    const rooms = arr[0];
                    const data = arr[1];

                    return {
                        rooms: +rooms,
                        count: data.length
                    };

                })
                .filter(function(d){
                    return d.count > 1
                })
                .sort(function(a, b) {
                    return a.rooms - b.rooms;
                });

            console.log(roomData);


           
            // DO YOUR BAR CHART HERE

            var frequency = 2 * 1000; // three seconds
            var Maxrooms = d3.max(roomData, function(d) {
                return d.rooms;
            });
            var Maxcount = d3.max(roomData, function(d) {
                return d.count;
            });
        
            var width = window.innerWidth - 150 ;
            var height = window.innerHeight;
            var margin = {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50
            };
            var chartWidth = width - margin.left - margin.right;
            var chartHeight = height - margin.top - margin.bottom;
      


           
  
            
            var svg = d3.select("#chart1")
        
    
             .attr("width", width)
             .attr("height", height);

            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function() {
                Tooltip
                  .style("display", "block")
                d3.select(this)
                  .style("stroke", "black")
                  .style("opacity", 1)
                   
   
              }
          
              var mousemove = function(event,d) {
                Tooltip
                  
                  .style("left", event.pageX + "px")
                  .style("top", event.pageY + "px")

                  Tooltip.select(".count").html(d.count)
                  Tooltip.select(".rooms").html(d.rooms)
                  
                  
                  

              }

              var mouseleave = function() {
                Tooltip
                  .style("display", "none")
                d3.select(this)
                  .style("stroke", "none")
                 .style("opacity", 0.5)
              }
            
            var domainValues = d3.range(1, Maxrooms + 1);
      
            var x = d3.scaleBand()
              .domain(domainValues)
              .range([margin.left, margin.left + chartWidth])
              .paddingInner(0.1)
              .paddingOuter(0.2);
      
            var barWidth = x.bandwidth();
        
            var barHeight = d3.scaleLinear()
            .domain([0, Maxcount])
            .range([0, chartHeight]);

            var y = d3.scaleLinear()
            .domain([0, Maxcount] )
            //.range([margin.top + chartHeight, margin.top]);
            .range([chartHeight + margin.top, margin.top]);

            
            
            var yAxis = d3.axisLeft(y);
            svg.select("#y")
            .attr("transform", "translate(" + margin.left + ", 0)")
            .call(yAxis)
            .append("text")
            
             
    
            
            
            var xAxis = d3.axisBottom(x);
            svg.select("#x")
            
            .attr("transform", "translate(0," + (chartHeight + margin.top) + ")")
            .call(xAxis) 
            .append("text")
    



            function zeroState(selection) {
            selection
                .attr("height", 0)
                .attr("y", y(0));
            }

            function barPosition(selection) {
            selection
                .attr("height", function(d) {
                return barHeight(d.count);
                })
                .attr("y", function(d) {
                return y(d.count);
                });
            }



                
           



            // Data Binding
            var bars = svg.select("#shapes").selectAll(".bar")
            .data(roomData, function(d) {
                return d.rooms;
            });

            // Entering Bars
            bars.enter().append("rect")
            .attr("class", "bar")
            .attr("width", barWidth)
            .attr("x", function(d, i) {
                return x(i + 1);
            })
            .style("stroke", "none")
            .style ("opacity", "0.5")
            
           
            
            .attr("fill", function(d) {
               if (d.count === Maxcount) {
                   return "green";
                } else if (d.count > 200) {
                return "orange";
                }
                return "yellow";
                
                })
           
           
                .call(zeroState)
                .call(barPosition)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)

            // Updating Bars
            bars
            .transition().duration(frequency / 2)
            .attr("x", function(d, i) {
                return x(i + 1);
            })
            .call(barPosition);

            // Exiting Bars
            bars.exit()
            .transition().duration(frequency / 2)
            .call(zeroState)
            .remove();
      
      
        }
       

        updateBarChart("Porto Alegre");



    d3.selectAll(".city-button")
    .on("click", function() {
      updateBarChart(this.id);
    });
        
    
    });
    


  