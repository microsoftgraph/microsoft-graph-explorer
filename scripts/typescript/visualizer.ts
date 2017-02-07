declare const d3:any;

let rawData = {
  "nodes": [
    {"id": "Myriel"},
    {"id": "Napoleon"},
    {"id": "Mlle.Baptistine"},
    {"id": "Mme.Magloire"},
    {"id": "CountessdeLo"},
    {"id": "Geborand"},
    {"id": "Champtercier"},
    {"id": "Cravatte"},
  ],
  "links": [
    {"source": "Napoleon", "target": "Myriel"},
    {"source": "Mlle.Baptistine", "target": "Myriel"},
    {"source": "Mme.Magloire", "target": "Myriel"},
    {"source": "Mme.Magloire", "target": "Mlle.Baptistine"},
    {"source": "CountessdeLo", "target": "Myriel"},
    {"source": "Geborand", "target": "Myriel"},
    {"source": "Champtercier", "target": "Myriel"},
    {"source": "Cravatte", "target": "Myriel"}
  ]
}

interface SimulationContainer {
    svg?: any
    width?:number,
    height?: number,
    simulation?: any
}

let simOptions:SimulationContainer = {};
let link, node;

function startSim() {
    simOptions.svg = d3.select("#visual-explorer");
    simOptions.width = simOptions.svg.attr("width");
    simOptions.height = simOptions.svg.attr("height");

    
    simOptions.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", manyBodyForce)
        .force("center", d3.forceCenter(simOptions.width / 2, simOptions.height / 2));

    initLinks();
    initNodes();
    resetSimulation();
}

let color = d3.scaleOrdinal(d3.schemeCategory20);

let manyBodyForce = d3.forceManyBody();
manyBodyForce.strength([-100])

function initLinks() {
    link = commonLinkSetup(simOptions.svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .enter().append("line"));
}

function initNodes() {
    node = commonNodeSetup(simOptions.svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .enter().append("circle"))
}

function commonLinkSetup(l) {
    return l
        .attr("stroke-width", function(d) { return 5; });
}

function resetLinks() {
    link = link.data(rawData.links);//, function(d) { return d.id;});
    link.exit().remove();    
    link = commonLinkSetup(link.enter().append("line")).merge(link);

    return link;
}

function commonNodeSetup(n) {
    return n.attr("r", 15)
        .attr("fill", function(d) { return color(d.id); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
}

    
function resetSvgNodes() {    
    node = node.data(rawData.nodes, function(d) { return d.id;});
    node.exit().remove();    
    node = commonNodeSetup(node.enter().append("circle")).merge(node);
    return node;
}

function addNode() {
    rawData.nodes.push({
        id: "a"
    })

    rawData.links.push({source:"a", target: "Napoleon"})
    resetSimulation();
}

function resetSimulation() {
    let nodes = resetSvgNodes();
    let links = resetLinks();

    simOptions.simulation
    .nodes(rawData.nodes)
    .on("tick", function() {
        ticked(nodes, links)
    });

    simOptions.simulation.force("link")
        .links(rawData.links);

    simOptions.simulation.alphaTarget(0.3).restart();
}




function ticked(nodes, links) {
    links
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodes
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

function dragstarted(d) {
    if (!d3.event.active) simOptions.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simOptions.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}