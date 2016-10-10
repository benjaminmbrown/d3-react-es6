var url = 'https://api.myjson.com/bins/23422';

var svg = d3.select('svg');

d3.json(url, function(error, json) {
  if (error) return console.warn(error);
  data = json;
  _.each(data.TopologyNodes, function(singleNode){
  	console.log(singleNode);
  });
  
  //get range of location_x
  
  //get range of location_y

  var width = 640,
    height = 480;
    
  var nodes = data.TopologyNodes;
  var links = data.TopologyEdges;	

  var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

  var force = d3.layout.force()
    .size([width, height])
    .nodes(nodes)
    .links(links);

  force.linkDistance(width / 2);

  var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');

  var node = svg.selectAll('.node')
    .data(nodes)
    .enter().append('circle')
    .attr('class', 'node');


  force.on('end', function() {
  
    node.attr('r', width / 25)
      .attr('cx', function(d) {
        return d.location_x;
      })
      .attr('cy', function(d) {
      	console.log(d);
        return d.location_y;
      });

    link.attr('x1', function(d) {
        return d.source.x;
      })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      });

  });


  force.start();



});
