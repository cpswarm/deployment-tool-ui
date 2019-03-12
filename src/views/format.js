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

        ws.onopen = function () {
            console.log("Socket connected.");
            $("#mylog").prepend("<p>Connected!</p>");
        };
        ws.onmessage = function (event) {
            //console.log(event.data);
            var obj = JSON.parse(event.data);
            var myTree = {
                value: 0,
                children: [{
                    name: "Install-s",
                    value: 0,
                    class: "node-s",
                    commands: "",
                    devices: target,
                    children: [
                        {
                            name: "Run-s",
                            value: 0,
                            class: "node-s",
                            commands: "",
                            devices: []
                        },
                        {
                            name: "Run-f",
                            value: 0,
                            class: "node-f",
                            commands: "",
                            devices: []
                        }
                    ]
                },
                {
                    name: "Install-f",
                    value: 0,
                    class: "node-f",
                    commands: "",
                    devices: [],
                }]
            };
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

function generateTree(logs, targets, host, myTree) {

    $("#mylog").empty();
    // Consider whether all nodes need be removed
    d3.selectAll("circle").remove();
    d3.selectAll("line").remove();

    //console.log('targets', targets, 'host', host);
    //console.log('all logs', logs)
    var code = "";

    // Tree for Build process
    // Meaning there is build process.
    if (host) {
        var hostLog = logs.filter(log => log.stage == "build");
        //console.log("host log", hostLog)
        //If there are logs for build
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
            if (hostLog.length > 1) {
                hostLog.forEach(function (el) {
                    //console.log(el)
                    code += '<div class="myfont_' + myTree.class[5] + '">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                });
            } else {
                //console.log(hostLog)
                code += '<div class="myfont_' + myTree.class[5] + '">' + new Date(hostLog[0].time).toLocaleString() + "  " + hostLog[0].stage + "  " + hostLog[0].output + "</div>";
            }
            // When build finish
        } else {
            myTree.children[0].value = targets.length;
        }
    }

    // Tree for Deploy process
    // Meaning there is deploy process.
    if (targets) {
        targets.forEach(function (el) {
            var oneTargetlog = logs.filter(log => log.target == el && log.stage != 'build');
            console.log("Target log", oneTargetlog);

            //Meaning the deploy starts
            if (oneTargetlog.length > 0) {
                if (oneTargetlog.some(log => log.error === true)) {

                    switch (oneTargetlog[0].stage) {
                        case "install":
                            if (!myTree.children[1].devices.includes(el)) {
                                myTree.children[1].devices.push(el);
                                myTree.children[1].value = myTree.children[1].devices.length;
                                myTree.children[1].commands = oneTargetlog;
                            }
                            break;
                        case "run":
                            if (!myTree.children[0].children[1].devices.includes(el)) {
                                myTree.children[0].children[1].devices.push(el);
                                myTree.children[0].children[1].value = myTree.children[0].children[1].devices.length;
                                myTree.children[0].children[1].commands = oneTargetlog;
                            }
                            break;
                    }
                    if (oneTargetlog.length > 1) {
                        oneTargetlog.forEach(function (el) {
                            code += '<div class="myfont_f">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                        });
                    } else {
                            code += '<div class="myfont_f">' + new Date(oneTargetlog[0].time).toLocaleString() + "  " + oneTargetlog[0].stage + "  " + oneTargetlog[0].output + "</div>";
                    }
                } else {
                    switch (oneTargetlog[0].stage) {
                        case "install":
                        if (!myTree.children[0].devices.includes(el)) {
                            myTree.children[0].devices.push(el);
                            myTree.children[0].value = myTree.children[0].devices.length;
                            myTree.children[0].commands = oneTargetlog;
                        }
                            break;
                        case "run":
                        if (!myTree.children[0].devices.includes(el)) {
                            myTree.children[0].devices.push(el);
                            myTree.children[0].children[0].value = myTree.children[0].devices.length;
                            myTree.children[0].children[0].commands = oneTargetlog;
                        }
                            break;
                    }
                    if (oneTargetlog.length > 1) {
                        oneTargetlog.forEach(function (el) {
                            code += '<div class="myfont_s">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                        });
                    } else {
                        code += '<div class="myfont_s">' + new Date(oneTargetlog[0].time).toLocaleString() + "  " + oneTargetlog[0].stage + "  " + oneTargetlog[0].output + "</div>";
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