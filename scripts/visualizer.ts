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

interface VisualNode {
    type: "entity" | "PROPERTY_VALUE" | "NavigationProperty" | "PROPERTY_KEY",
    id: string,
    label: string
}

interface VisualLinks {
    source: string,
    target: string
}

function startSimFromGraphResponse(data:any) {
    if ($("#visual-explorer").length != 1) {
        return;
    }
    let nodes:VisualNode[] = [];
    let links:VisualLinks[] = [];
    
    // from the autocomplete
    let lastGraphNode = constructGraphLinksFromFullPath(apiService.text).pop()
    

    const entityId = data['id'];
    nodes.push({
        id: entityId,
        type: "entity",
        label: data['displayName']
    });

    for (let key in data) {
        if (key.indexOf("odata") != -1)
            continue;
        if (data[key] === null)
            continue;
        
        // property label node
        nodes.push({
            id: entityId+key,
            type: "PROPERTY_KEY",
            label: key
        });
        links.push({
            source: entityId,
            target: entityId+key
        })

        // property value node
        const propertyValueNodeId = "value-"+entityId+key;
        nodes.push({
            id: propertyValueNodeId,
            type: "PROPERTY_VALUE",
            label: JSON.stringify(data[key])
        });
        links.push({
            source: propertyValueNodeId,
            target: entityId+key
        })
    }

    // get navigation properties
    debugger;
    let entityLinks = getEntityFromTypeName(lastGraphNode.type).links;
    for (let entityLink in entityLinks) {
        let link = entityLinks[entityLink];
        if (link.tagName == "NavigationProperty") {
            let nodeId = `$nav_property_${entityId}_${link.name}`
            nodes.push({
                id: nodeId,
                label: link.name,
                type: "NavigationProperty"
            });

            links.push({
                source: entityId,
                target: nodeId
            })
        }
    }


    startSim(nodes, links);
}

function startSim(nodes:VisualNode[], links) {
    simOptions.svg = d3.select("#visual-explorer");
    simOptions.svg.selectAll("*").remove();

    simOptions.width = simOptions.svg.attr("width");
    simOptions.height = simOptions.svg.attr("height");

    simOptions.nodes = nodes;
    simOptions.links = links;

    const manyBodyForce = d3.forceManyBody().strength([-500]);
    
    simOptions.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id((d) => d.id).distance((link) => link.target.type == "NavigationProperty" ? 400 : 100))
        .force("charge", manyBodyForce)
        .force("center", d3.forceCenter(simOptions.width / 2, simOptions.height / 2));


    let link = initLinks();
    let node = initNodes();
    resetSimulation(node, link);
}



function initLinks() {
    return simOptions.svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .enter().append("line");
}

function initNodes() {
    return simOptions.svg.selectAll(".node")
        .enter().append("g")
        .attr("class", "node");
}

function commonLinkSetup(l) {
    return l
        .attr("stroke-width", (d) => { return 5; });
}

function resetLinks(link) {
    link = link.data(simOptions.links);
    link.exit().remove();    
    link = commonLinkSetup(link.enter().append("line")).merge(link);

    return link;
}

function commonNodeSetup(n) {
    let color = d3.scaleOrdinal(d3.schemeCategory20);
    return n.attr("r", 50)
        .attr("fill", (d) => color(d.type))
        .attr("stroke", "#757575")
        .attr("stroke-width", 0)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
}

    
function resetSvgNodes(node) {    
    node = node.data(simOptions.nodes, (d) => d.id);
    node.exit().remove();
    
    let baseEl = node
        .enter().append("g");

    commonNodeSetup(
        baseEl
            .append("circle")
            .attr("class", "node"));

    let circles = baseEl.selectAll("circle");

    circles.on("mouseover",function(){ d3.select(this).transition().attr("stroke-width","3").style("cursor", "pointer") });
    circles.on("mouseout",function(){ d3.select(this).transition().attr("stroke-width","0").style("cursor", "default") });

    baseEl.append("text")
        // .attr("dx", 12)
        // .attr("dy", ".35em")
        .text((d) => d.label);
    return baseEl;
}

function resetSimulation(node, link) {
    let nodeBaseElements = resetSvgNodes(node);
    let links = resetLinks(link);

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