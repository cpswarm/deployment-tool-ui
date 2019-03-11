function listen(id, close, target, host) {
    if (!("WebSocket" in window)) {
        alert("WebSocket is not supported by your Browser!");
        return;
    }
    if (close && ws) {
        console.log(ws);
        ws.close();
    } else {
        ws = new WebSocket("ws://reely.fit.fraunhofer.de:8080/events?order=" + id + "&topics=logs");
        var myTree = {
            children: [
                {
                    name: "",
                    value: 0,
                    class: "",
                    commands: "",
                    children: [
                        {
                            name: "",
                            value: 0,
                            class: "",
                            commands: ""
                        }
                    ]
                }
            ]
        };
        ws.onopen = function () {
            console.log("Socket connected.");
            $("#mylog").prepend("<p>Connected!</p>");
        };
        ws.onmessage = function (event) {
            //console.log(event.data);
            var obj = JSON.parse(event.data);

            //var json = JSON.stringify(obj, null, 2);
            //console.log(obj);
            generateTree(obj.payload, target, host, myTree);
            // $("#mylog").prepend("<pre>" + json + "</pre>");
        };
        ws.onclose = function () {
            console.log("Socket disconnected.");
            $("#mylog").prepend("<p>Disconnected!</p>");
            // If socket disconnected, try to connect again after 5s.
            /* setTimeout(function () { listen(1, true);}, 5000); */
        };
    }
}
// Generate tree
function generateTree(logs, targets, host, myTree) {

    $("#mylog").empty();
    d3.selectAll("circle").remove();
    d3.selectAll("line").remove();

    //console.log('targets', targets, 'host', host);
    //console.log('all logs', logs)
    var code = "";
    // Tree for Build process
    if (host) {
        var hostLog = logs.filter(log => log.target == host);
        console.log("host log", hostLog)
        //If there is logs for host
        if (hostLog.length > 0) {
            if (hostLog.find(el => el.error == true)) {
                myTree.name = "Build";
                myTree.value = 1;
                myTree.class = "node-f";
                myTree.commands = hostLog;
            } else {
                myTree.name = "Build";
                myTree.value = 1;
                myTree.class = "node-s";
                myTree.commands = hostLog;
                //myTree.children = [];
            }
            if (myTree.commands.length > 1) {
                myTree.commands.forEach(function (el) {
                    code += '<div class="myfont_' + myTree.class[5] + '">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                });
            } else {
                console.log(myTree.commands)
                code += '<div class="myfont_' + myTree.class[5] + '">' + new Date(myTree.commands.time).toLocaleString() + "  " + myTree.commands.stage + "  " + myTree.commands.output + "</div>";
            }
        }
    }
    // Tree for Deploy process
    if (targets) {
        targets.forEach(function (el) {
            var oneTargetlog = logs.filter(log => log.target == el);
            console.log("Target log", oneTargetlog);
            if (oneTargetlog.length > 0) {
                if (oneTargetlog[0].error) {
                    switch (oneTargetlog[0].stage) {
                        case "transfer" && "install":
                            myTree.children.push({
                                name: "Install",
                                class: "node-f",
                                value: 1,
                                commands: oneTargetlog
                            });
                            break;
                        case "run":
                            myTree.children[0].children.push({
                                name: "Run",
                                class: "node-f",
                                value: 1,
                                commands: oneTargetlog
                            });
                            break;
                    }
                    if (oneTargetlog.length > 1) {
                        oneTargetlog.forEach(function (el) {
                            code += '<div class="myfont_f">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                        });
                    } else {
                        code += '<div class="myfont_f">' + new Date(oneTargetlog.time).toLocaleString() + "  " + oneTargetlog.stage + "  " + oneTargetlog.output + "</div>";
                    }
                } else {
                    switch (oneTargetlog[0].stage) {
                        case "transfer" && "install":
                            myTree.children[0].value++;
                            myTree.children[0].name = "Install";
                            myTree.children[0].class = "node-s";
                            myTree.children[0].commands = oneTargetlog[0];
                            break;
                        case "run":
                            myTree.children[0].children[0].name = "Run";
                            myTree.children[0].children[0].value++;
                            myTree.children[0].children[0].class = "node-s";
                            myTree.children[0].children[0].commands = oneTargetlog[0];
                            break;
                    }
                    if (oneTargetlog.length > 1) {
                        oneTargetlog.forEach(function (el) {
                            code += '<div class="myfont_s">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                        });
                    } else {
                        code += '<div class="myfont_s">' + new Date(oneTargetlog.time).toLocaleString() + "  " + oneTargetlog.stage + "  " + oneTargetlog.output + "</div>";
                    }
                }
            }

        });
        console.log(myTree)
    }

    var treeLayout = d3.tree().size([200, 200]);
    var root = d3.hierarchy(myTree);
    treeLayout(root);

    // Nodes
    d3.select("svg g.nodes")
        .selectAll("circle.node")
        .data(root.descendants())
        .enter()
        .append("circle")
        .attr("class", function (d) { return d.data.class; })
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .attr("r", function (d) { return d.data.value * 3; });
    // Links
    d3.select("svg g.links")
        .selectAll("line.link")
        .data(root.links())
        .enter()
        .append("line")
        .classed("link", true)
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    $('#mylog').append('<div class="myCommandCard">' + code + '</div>');
    $("#myTree").modal();
}