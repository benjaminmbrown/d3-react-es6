var url = 'https://api.myjson.com/bins/23422';

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function(d) {
    return d.id;
  }))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2));

//make call to url where json is stored, then run animation
d3.json(url, function(error, graph) {
  if (error) throw error;
  var edges = [];

  // d3 force graph defaults to mapping source/targets to indices in the node array.
  // instead, we want to map to the device_id's instead of the node index here
  graph.TopologyEdges.forEach(function(e) {
    var sourceNode = graph.TopologyNodes.filter(function(n) {
        return n.device_id === e.source;
      })[0],
      targetNode = graph.TopologyNodes.filter(function(n) {
        return n.device_id === e.target;
      })[0];

    edges.push({
        id: e.id,
      flag: e.flag,
      info: e.info,
      source: sourceNode,
      target: targetNode,
    });
  });

    console.log("edges", edges)
  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(edges)
    .enter().append("line")
    .attr("stroke-width", function(d) {
      return 1;
    });

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.TopologyNodes)
    .enter().append("circle")
    .attr("r", 3)
    .attr("fill", function(d) {
      return color(d.type);
    })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  node.append("title")
    .text(function(d) {return d.node_name;});

  simulation
    .nodes(graph.TopologyNodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(edges);

  function ticked() {
    link
      .attr("x1", function(d) {return d.source.x;})
      .attr("y1", function(d) {return d.source.y;})
      .attr("x2", function(d) {return d.target.x;})
      .attr("y2", function(d) {return d.target.y;});

    node
      .attr("cx", function(d) {return d.x;})
      .attr("cy", function(d) {return d.y;});
  }
});

//TOOLTIPS
/*
var tooltip = svg
        .append("div")
        .attr("class", "my-tooltip")//add the tooltip class
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");
    tooltip.append("div")
        .attr("id", "tt-name")
        .text("simple");
    tooltip.append("div")
        .attr("id", "tt-size")
        .text("simple");
 
tooltip.select("#tt-name").text(d.node_name);
tooltip.select("#tt-size").text(d.type);
*/
function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
