declare const d3:any;

interface SimulationContainer {
    svg?: any
    width?:number,
    height?: number,
    simulation?: any,
    nodes?: VisualNode[],
    links?: any[]
}

let simOptions:SimulationContainer = {};
let link, node;

interface VisualNode {
    type: "entity" | "property",
    id: string,
    label: string
}

function isUser(data) {
    return data["@odata.type"] == "#microsoft.graph.user" || data['@odata.context'] == 'https://graph.microsoft.com/v1.0/$metadata#users/$entity'
}

function startSimFromGraphResponse(data:any) {
    let nodes:VisualNode[] = [];
    let links = [];
    if (isUser(data)) {
        const userId = "user-" + data['id'];
        nodes.push({
            id: userId,
            type: "entity",
            label: "User"
        });

        delete data['@odata.context'];
        delete data["@odata.type"];

        for (let key in data) {
            if (data[key] === null) continue;
            nodes.push({
                id: userId+key,
                type: "property",
                label: JSON.stringify(data[key])
            });
            links.push({
                source: userId,
                target: userId+key
            })
        }

    } else {

    }
    startSim(nodes, links);
}

function startSim(nodes:VisualNode[], links) {
    simOptions.svg = d3.select("#visual-explorer");
    simOptions.width = simOptions.svg.attr("width");
    simOptions.height = simOptions.svg.attr("height");

    simOptions.nodes = nodes;
    simOptions.links = links;

    
    simOptions.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id((d) => d.id).distance((d) => 125))
        .force("charge", manyBodyForce)
        .force("center", d3.forceCenter(simOptions.width / 2, simOptions.height / 2));


    initLinks();
    initNodes();
    resetSimulation();
}

let color = d3.scaleOrdinal(d3.schemeCategory20);

let manyBodyForce = d3.forceManyBody();
manyBodyForce.strength([-500])

function initLinks() {
    link = commonLinkSetup(simOptions.svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .enter().append("line"));
}

function initNodes() {
    node = simOptions.svg.selectAll(".node")
        .enter().append("g")
        .attr("class", "node");
   return node;
}

function commonLinkSetup(l) {
    return l
        .attr("stroke-width", (d) => { return 5; });
}

function resetLinks() {
    link = link.data(simOptions.links);//, function(d) { return d.id;});
    link.exit().remove();    
    link = commonLinkSetup(link.enter().append("line")).merge(link);

    return link;
}

function commonNodeSetup(n) {
    return n.attr("r", 30)
        .attr("fill", (d) => color(d.id))
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
}

    
function resetSvgNodes() {    
    node = node.data(simOptions.nodes, (d) => d.id);
    node.exit().remove();
    
    let baseEl = node
        .enter().append("g");

    commonNodeSetup(
        baseEl
            .append("circle")
            .attr("class", "node"));

    

    baseEl.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text((d) => d.label);
    return baseEl;
}

function addNode() {
    simOptions.links.push({source:"a", target: "Napoleon"})
    resetSimulation();
}

function resetSimulation() {
    let nodeBaseElements = resetSvgNodes();
    let links = resetLinks();

    simOptions.simulation
        .nodes(simOptions.nodes)
        .on("tick", function() {
            ticked(nodeBaseElements, links)
        });

    simOptions.simulation
        .force("link")
        .links(simOptions.links);

    simOptions.simulation.alphaTarget(0.3).restart();
}



function ticked(nodes, links) {
    links
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

    nodes.selectAll("circle").attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
    
    nodes.selectAll("text").attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

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