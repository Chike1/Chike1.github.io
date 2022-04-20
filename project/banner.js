//var url = "https://api.thecatapi.com/v1/images/search";


var image = 1;
var maxImage = 12;
      var imageFrequency = 1 * 1000; // two seconds

      setTimeout(function() {

        d3.select("#banner")
          .style("background-image", "url('./photos/" + image + ".jpeg')");

        image++;
        if (image > maxImage) image = 1;

      }, imageFrequency);


d3.json(url)
  .then(function(data) {

    d3.select("#banner")
      .style("background-image", "url('" + data[0].url+ "')");

  });

  var bannerPosition = d3.scaleLinear()
  .domain([0, window.innerHeight])
  .range([100, 0]);


  d3.select(window)
  .on("scroll", function() {

    var y = bannerPosition(window.scrollY);
    d3.select("#banner")
      .style("background-position", "50% " + y + "%");



     
  });

