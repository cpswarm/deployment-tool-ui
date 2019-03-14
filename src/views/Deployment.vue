<template>
  <div class="mappanelContainer">
    <div ref="panel" class="panel" style="width:400px;overflow: scroll;">
        <div id="title">
            <h5 draggable="true" style="display: inline-block; margin:5px">Deployment Management</h5>
        </div>
        <div class="accordion" id="accordionExample" style="width:100%;padding:2.5px">
            <div class="card">
                <div class="card-header" id="headingOne" style="text-align:left;width:100%">
                    <form class="form-inline">
                        <div id="searchOrder" class="input-group" style="width:100%">
                            <input class="dropdown-toggle form-control form-control-sm" v-model="orderSearchT" type="text"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterDevice"
                                style="font-size: 14px;height: 26px;padding: 5px;">
                            <div class="input-group-append">
                                <a class="btn btn-outline-secondary" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="true" style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;">
                                    <img src="../assets/search.png" style="height:20px">
                                </a>
                            </div>

                            <div class="dropdown-menu" style="padding:2.5px">
                                <!-- how to search -->
                                <!--  <a
                    v-for="order in orders"
                    class="dropdown-item"
                    v-show="order.isActive"
                    @click="selectItem(order.order)"
                    style="font-size:14px;padding:0px 15px"
                  >{{order.order}}</a>-->
                            </div>
                        </div>
                    </form>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice" data-parent="#accordionExample">
                    <div style="padding:5px">
                        <div id="deviceList">
                            <div v-for="order in orders" class="mycard card-body" style="padding:5px;margin-bottom:5px">
                                <div class="mycard-title">Name:</div>
                                <div class="mycard-content">{{order.id}}</div>
                                <div class="mycard-title">Devices:</div>
                                <div class="mycard-content">
                                    <img src="../assets/done.png" style="width:16px">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="listen(order.id,false,order.deploy.match.list,order.build.host)">
                                        <p style="color:#00AE31;display:inline-block;padding:2.5px;margin:0">{{order.status[0]}}</p>
                                    </button>
                                    <img src="../assets/error.png" style="width:16px">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="listen(order.id,false,order.deploy.match.list,order.build.host)">
                                        <p style="color:#D80027;display:inline-block;padding:2.5px;margin:0">{{order.status[1]}}</p>
                                    </button>
                                </div>
                                <div class="mycard-title">Created Time:</div>
                                <div class="mycard-content">{{new Date(order.createdAt).toLocaleString()}}</div>
                                <div class="mycard-title">Finished Time:</div>
                                <div class="mycard-content">{{order.finishedAt}}</div>
                                <div class="mycard-title">Commands:</div>
                                <div class="mycard-content">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px;" @click="order.isActive? order.isActive= false: order.isActive=true">
                                        <img src="../assets/search.png" style="width:16px">
                                    </button>
                                </div>
                                <div class="myCommand" v-show="order.isActive">
                                    <div class="mycom-title">Build:</div>
                                    <div class="mycom-content" style="color:#00AE31">commands:</div>
                                    <div></div>
                                    <div>
                                        <div v-if="order.build">
                                            <div v-for="c in order.build.commands" class="mycom-content" style="color:#2E51AB">-{{c}}</div>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div class="mycom-content" style="color:#00AE31">artifacts:</div>
                                    <div></div>
                                    <div>
                                        <div v-if="order.build">
                                            <div v-for="a in order.build.artifacts" class="mycom-content" style="color:#2E51AB">-{{a}}</div>
                                        </div>
                                    </div>
                                    <div></div>
                                    <div class="mycom-content" style="color:#00AE31">hosts:</div>
                                    <div></div>
                                    <div>
                                        <div v-if="order.build">
                                            <div class="mycom-content" style="color:#2E51AB">-{{order.build.host}}</div>
                                        </div>
                                    </div>
                                    <div class="mycom-title">Install:</div>
                                    <div class="mycom-content" style="color:#00AE31">commands:</div>
                                    <div></div>
                                    <div><div v-if="order.deploy">
                                        <div v-for="c in order.deploy.install.commands" class="mycom-content" style="color:#2E51AB">-{{c}}</div>
                                    </div>
                                    </div>
                                    

                                    <div class="mycom-title">Run:</div>
                                    <div class="mycom-content" style="color:#00AE31">commands:</div>
                                    <div></div>
                                    <div>
                                        <div v-if="order.deploy">
                                        <div v-for="c in order.deploy.run.commands" class="mycom-content" style="color:#2E51AB">-{{c}}</div>
                                    </div>
                                    </div>
                                    
                                    <div class="mycom-title">Target:</div>
                                    <div class="mycom-content" style="color:#00AE31">ids:</div>
                                    <div></div>
                                    <div>
                                         <div v-if="order.deploy">
                                        <div v-for="t in order.deploy.target.ids" class="mycom-content" style="color:#2E51AB">-{{t}}</div>
                                    </div>

                                    </div>
                                   
                                    <div></div>
                                    <div class="mycom-content" style="color:#00AE31">tags:</div>
                                    <div></div>
                                    <div>
                                        <div v-if="order.deploy">
                                        <div v-for="t in order.deploy.target.tags" class="mycom-content" style="color:#2E51AB">-{{t}}</div>
                                    </div>
                                    </div>
                                </div>
                                <div></div>
                                <div style="text-align: right">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="duplicateOrder(order)">
                                        <img src="../assets/duplicate.png" style="width:20px">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree" style="text-align:left">
                    <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseThree"
                        aria-expanded="false" aria-controls="collapseThree" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                        <img src="../assets/add.png" style="height:20px">
                        Add New Deployment
                    </button>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                    <div class="card-body" style="padding:7.5px">
                        <h6 style="text-align:left">
                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" data-toggle="collapse"
                                data-target="#collapseOne">
                                <img src="../assets/duplicate.png" style="width:20px">
                            </button>
                            <a style="font-size:15px">Duplicate one exsiting deployment</a>
                        </h6>
                        <form id="newDeployment">
                            <div class="mycard-title" style="text-align:right">Name:</div>
                            <div class="mycard-content">
                                <input v-model="deployName" type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;">
                            </div>
                            <div class="mycard-title" style="text-align:right">Source:</div>
                            <div>
                                <div class="custom-file" style="height:22px">
                                    <input type="file" class="custom-file-input" id="customFile" multiple
                                        webkitdirectory @change="handleFileSelect">
                                    <label id="mySourcelabel" class="custom-file-label" for="customFile" style="text-align: left;height: 22px;padding: 0px; font-size: 14px;">Choose
                                        file</label>
                                    <div id="uploadFiles"></div>
                                </div>
                            </div>
                            <div class="mycard-title" style="text-align:right">Debug:</div>
                            <div class="mycard-content">
                                <div class="form-check input-group">
                                    <input v-model="deployDebug" type="checkbox" class="form-check-input">
                                </div>
                            </div>
                            <div class="mycard-title" style="text-align:right">Build:(optional)</div>
                            <div class="mycard-content" style="text-align:left">
                                <div>
                                    <div>
                                        <div class="myfont_t">commands:</div>
                                        <editor ref="editor_build_c" v-model="build_c" @init="editorInit" lang="golang"
                                            theme="github" width="100%" height="70"></editor>
                                    </div>
                                    <div>
                                        <div class="myfont_t">artifacts:</div>
                                        <editor ref="editor_build_a" v-model="build_a" @init="editorInit" lang="golang"
                                            theme="github" width="100%" height="70"></editor>
                                    </div>
                                </div>
                                <div class="input-group">
                                    <label class="myfont_t" style="padding: 7.5px 0;margin-bottom: 0px;">host:</label>
                                    <input type="text" v-model="host" class="dropdown-toggle form-control form-control-sm"
                                        style="border-radius: .2rem; height:22px;margin: 5px 0" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false" @keyup="filterHost">
                                    <div class="dropdown-menu" style="padding:2.5px">
                                        <a v-for="device in devices" class="dropdown-item" v-show="device.hostActive"
                                            @click=" host = device.name " style="font-size:14px;padding:0px 15px">{{device.name}}</a>
                                    </div>
                                </div>
                            </div>
                            <div class="mycard-title" style="text-align:right">Install:(optional)</div>
                            <div class="mycard-content" style="text-align:left">
                                <div>
                                    <div class="myfont_t">commands:</div>
                                    <editor ref="editor_install_c" v-model="install_c" @init="editorInit" lang="golang"
                                        theme="github" width="100%" height="70"></editor>
                                </div>
                            </div>
                            <div class="mycard-title" style="text-align:right">Run:(optional)</div>
                            <div class="mycard-content" style="text-align:left">
                                <div>
                                    <div class="myfont_t">commands:</div>
                                    <editor ref="editor_run_c" v-model="run_c" @init="editorInit" lang="golang" theme="github"
                                        width="100%" height="70"></editor>
                                </div>
                            </div>
                            <div class="mycard-title" style="text-align:right">Target:</div>
                            <div class="mycard-content" style="grid-column: 1/3; border: 1px solid grey;border-style:dashed">
                                <form class="form-inline">
                                    <div class="input-group" style="width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                        <div id="searchTarget"></div>
                                        <input class="dropdown-toggle form-control form-control-sm" type="text" v-model="targetText"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterDevice"
                                            style="font-size: 14px;height: 26px;padding: 5px; border:none">
                                        <div class="input-group-append">
                                            <a class="btn btn-outline-secondary" aria-expanded="true" style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
                                                @click="searchTarget">
                                                <img src="../assets/search.png" style="height:20px">
                                            </a>
                                        </div>
                                        <div class="dropdown-menu" style="padding:2.5px">
                                            <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive" @click="selectItem(tag.tag)"
                                                style="font-size:14px;padding:0px 15px">{{tag.tag}}</a>
                                        </div>
                                    </div>
                                </form>
                                <div style="height:350px;overflow: scroll">
                                    <div v-for="device in targetDevices" class="simpleDeviceCard">
                                        <div class="input-group" style="padding:2.5px;">Name:
                                            <div style="padding:0 2.5px;display:inline-block;width:80%">{{device.name}}</div>
                                            <button type="button" class="close" aria-label="Close" @click="removeDevice(device.name)"
                                                style="height:20px">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="input-group" style="padding:2.5px">Tags:
                                            <div v-for="tag in device.tags" style="padding: 2.5px; margin: 0 2.5px;line-height: 1.5;"
                                                class="badge badge-secondary">{{tag}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div style="text-align:right">
                                <button class="btn btn-primary" @click="submitDeploy" type="button" style="font-size:14px;padding: 2.5px 5px;">Deploy</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="map" style="width:800px" ref="map"></div>
    <div id="myAlert" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog alert alert-danger" role="document" style="width:150%">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Error Message</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="mymodal-body" class="modal-body" style="text-align:left"></div>
            </div>
        </div>
    </div>
    <div id="myTree" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document" style="margin: 50px 100px;">
            <div class="modal-content" style="width:170%">
                <div class="modal-header">
                    <h5 class="modal-title">Process Tree</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="listen(1, true)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="mytree-body" class="modal-body">
                    <div id="stage" style="height:220px">
                        <div>Build</div>
                        <div>Install</div>
                        <div>Run</div>
                    </div>
                    <div id="mytree">
                        <svg width="200" height="220">
                            <g transform="translate(5, 5)">
                                <g class="links"></g>
                                <g class="nodes"></g>
                            </g>
                        </svg>
                    </div>
                    <div style="text-align:left">
                        Logs: <div id="mylog" style="text-align:left" class="myfont_c"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import jsZip from "jszip";
import axios from "axios";
import yaml from "js-yaml";
import editor from "vue2-ace-editor";
import $ from "jquery";
import * as d3 from "d3";

var ws;
// Generate fake latitude and logitude
function rand(n) {
    let max = n + 0.001;
    let min = n - 0.001;
    return Math.random() * (max - min) + min;
}
// Split user input commands line by line
function setCommands(arr) {
    var newarr = arr.split("\n");
    return newarr;
}
// Check device status
function checkStatus(id, total) {
    //fake status count
    //return [Math.floor(Math.random() * 31), Math.floor(Math.random() * 11)];
    var des = "task=" + id + "&error=true&output=STAGE-END";
    return axios.get("http://reely.fit.fraunhofer.de:8080/logs?" + des).then(response =>{

            if (!response.data.items) {
                //console.log(0)
                return [total, 0];
            } else {
                return [total - response.data.items.length, response.data.items.length];
            }

    }).catch (error => {
        console.log(error);
    });
   
}
// Get one order finish time
function getFinishTime(id) {
    // fake finish time
    //return new Date(1551800395755).toLocaleString();
    var des = "task=" + id;
    return axios.get("http://reely.fit.fraunhofer.de:8080/logs?" + des).then(response =>{
                return new Date(response.data.items[response.data.total - 1].time).toLocaleString();
        }).catch(error=> {
        console.log(error);
        })
    //return new Date(1551800395755).toLocaleString();
}
// Websocket
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
                                   //Remove the node from previous status
                                myTree.children[0].devices.splice(myTree.children[0].devices.indexOf(el), 1);
                                myTree.children[0].value = myTree.children[0].devices.length;
                                   // Add the node to new status
                                myTree.children[1].devices.push(el);
                                myTree.children[1].value = myTree.children[1].devices.length;
                                myTree.children[1].commands = oneTargetlog;
                            }
                            break;
                        case "run":
                            if (!myTree.children[0].children[1].devices.includes(el)) {
                                 //Remove the node from previous status
                                 if(myTree.children[0].devices.indexOf(el) != -1){
                                        myTree.children[0].devices.splice(myTree.children[0].devices.indexOf(el), 1);
                                        myTree.children[0].value = myTree.children[0].devices.length;
                                 }else if(myTree.children[0].children[0].devices.indexOf(el) !=-1){
                                        myTree.children[0].children[0].devices.splice(myTree.children[0].children[0].devices.indexOf(el), 1);
                                        myTree.children[0].children[0].value = myTree.children[0].children[0].devices.length;
                                 }
                                 // Add the node to new status
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
                                myTree.children[0].devices.splice(myTree.children[0].devices.indexOf(el), 1);
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
        .attr("y2", function (d) { return d.target.y; })
        .style("stroke-width", function (d) {
            if (d.target.data.value == 0 && d.source.data.value == 0) {
                return 0;
            } else if (d.target.data.value == 0 && d.source.data.value != 0 && d.source.children && !d.target.children) {
                return 0;
            } else if (d.target.data.value == 0 && d.source.data.value != 0 && d.source.children && d.target.children) {
                if (d.source.children[0].value == 0 && d.source.children.length > 1 && d.target.children[0].value == 0) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                return 1;
            }
        })
    $('#mylog').append('<div class="myCommandCard">' + code + '</div>');
    $("#myTree").modal();
}
export default {
    data() {
        return {
            orderSearchT: "",
            deployName: "",
            deployDebug: "",
            source: "",
            build_c: "",
            build_a: "",
            install_c: "",
            run_c: "",
            targetText: "",
            host: "",
            devices: [],
            targetDevices: [],
            tags: [],
            orders: [],
            tree: []
        };
    },
    components: {
        editor: require("vue2-ace-editor")
    },
    methods: {
        editorInit: function () {
            require("brace/ext/language_tools"); //language extension prerequsite...
            require("brace/mode/golang");
            require("brace/mode/javascript");
            require("brace/mode/less");
            require("brace/theme/github");
            require("brace/snippets/javascript");
        },
        listen: function (id, close, targets, host) {
            //console.log(targets, host)
            if (!close) {
                axios.get("http://reely.fit.fraunhofer.de:8080/logs?task=" + id + "&sortOrder=desc")
                    .then(function (response) {
                        //console.log(response.data)
                        var myTree = {
                            value:0
                        };
                        // Tree for Build process
                        if (host) {
                            var hostLog = response.data.items.filter(log => log.stage == "build");
                            //console.log("host log", hostLog);
                            if (hostLog.find(el => el.error == true)) {
                                myTree.name = "Build";
                                myTree.value = 1;
                                myTree.class = "node-f";
                                myTree.commands = hostLog.filter(log => log.error == true);
                            } else {
                                myTree.name = "Build";
                                myTree.value = 1;
                                myTree.class = "node-s";
                                myTree.commands = hostLog;
                                //myTree.children = [];
                            }
                        }
                        // Tree for Deploy process
                        if (targets) {
                            myTree.children = [
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
                            ];
                            targets.forEach(function (el) {    
                                var oneTargetlog = response.data.items.filter(log => log.target == el && log.stage !='build' );
                                //console.log("Target log", oneTargetlog);
                                if (oneTargetlog.some( log => log.error === true)) {
                                    switch (oneTargetlog[0].stage) {
                                        case "install":
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
                                } else {
                                    switch (oneTargetlog[0].stage) {
                                        case "transfer" && "install":
                                            myTree.children[0].value++;
                                            myTree.children[0].name = "Install";
                                            myTree.children[0].class = "node-s";
                                            myTree.children[0].commands = oneTargetlog;
                                            break;
                                        case "run":
                                            myTree.children[0].children[0].name = "Run";
                                            myTree.children[0].children[0].value++;
                                            myTree.children[0].children[0].class = "node-s";
                                            myTree.children[0].children[0].commands = oneTargetlog;
                                            break;
                                    }
                                }
                            });
                            //console.log(myTree)
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
                            .attr("r", function (d) { return d.data.value * 3; })
                            .on('click', function (d) {
                                if (d.data.commands.length > 1) {
                                    //console.log(d.data.class[5])
                                    var code = "";
                                    d.data.commands.forEach(function (el) {
                                        code += new Date(el.time).toLocaleString() + "  " + el.stage +"  "+ el.output + "<br>"
                                    }),
                                        $('#mylog').prepend('<div class="myfont_' + d.data.class[5] + ' myCommandCard">' + code + '</div>');
                                } else {
                                    $('#mylog').prepend('<div class="myfont_' + d.data.class[5] + new Date(d.data.commands.time).toLocaleString() + "  " + d.data.commands.output + '</div>');
                                }
                            })

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
                            .attr("y2", function (d) { return d.target.y; })
                            .style("stroke-width", function (d){
                                
                              if(d.target.data.value==0 && d.source.data.value==0)
                              {
                                  return 0;
                              }else if(d.target.data.value==0 && d.source.data.value !=0 && d.source.children && !d.target.children){
                                  
                                  return 0;
                             
                            }else if(d.target.data.value==0 && d.source.data.value !=0 && d.source.children && d.target.children){
                                  if(d.source.children[0].value==0 && d.source.children.length >1 &&d.target.children[0].value==0){
                                      return 0;
                                  }else{return 1}
                            }else{
                                    //console.log(d);
                                    return 1;
                                    }
                            })

                        $("#myTree").modal();
                    });
            } else {
                d3.selectAll("circle").remove();
                d3.selectAll("line").remove();
                $("#mylog").empty();
            }
        },
        duplicateOrder: function (order) {
            $("#collapseThree").collapse("show");
            this.deployName = order.id;
            this.deployDebug = order.debug;
            this.build_c = order.build ? order.build.commands.join("\n") : "";
            this.build_a = order.build ? order.build.artifacts.join("\n") : "";
            this.host = order.build ? order.build.host : "";
            this.install_c = order.deploy.install.commands ? order.deploy.install.commands.join("\n") : "";
            this.run_c = order.deploy.run.commands ? order.deploy.run.commands.join("\n") : "";
            for (var i = 0; i < order.deploy.match.list.length; i++) {
                this.targetDevices.push({
                    name: order.deploy.match.list[i],
                    tags: "" //check how can get a devices tag
                });
            }
        },
        handleFileSelect: function (event) {
            var files = event.target.files;
            // FileList object
            var archive = new jsZip().folder("archive");
            for (var i = 0, f; (f = files[i]); i++) {
                //console.log(f)
                // if set webkitdirectory
                archive.file(f.webkitRelativePath, f);
                // if only set multiple
                //archive.file(f.name, f);
            }
            //console.log(archive);
            this.source = archive.generateAsync({ type: "base64" });
            document.getElementById("mySourcelabel").innerHTML = files[0].name + "...";
            //console.log(this.source)
        },
        submitDeploy: function () {
            let ids = [];
            let tags = [];
            for (let i = 0; i < this.targetDevices.length; i++) {
                ids.push(this.targetDevices[i].name);
                /*    this.targetDevices[i].tags.forEach(function (el) {
                                    if (!tags.some(e => e == el)) {
                                        tags.push(el);
                                    }
                                }); */
            }
            var myYaml;
            var taskDer = {
                source: {
                    zip:
                        "UEsDBAoAAAAAAOp8WU4AAAAAAAAAAAAAAAAIAAAAcGFja2FnZS9QSwMECgAAAAAA6nxZTsMMtIOLAAAAiwAAABkAAABwYWNrYWdlL2NvdW50X3RvX3RocmVlLmdvcGFja2FnZSBtYWluCgppbXBvcnQgKAoJImZtdCIKCSJ0aW1lIgopCgpmdW5jIG1haW4oKSB7Cglmb3IgaSA6PSAxOyBpIDw9IDM7IGkrKyB7CgkJZm10LlByaW50bG4oImhlbGxvIiwgaSkKCQl0aW1lLlNsZWVwKHRpbWUuU2Vjb25kKQoJfQp9ClBLAQIUAAoAAAAAAOp8WU4AAAAAAAAAAAAAAAAIAAAAAAAAAAAAEAAAAAAAAABwYWNrYWdlL1BLAQIUAAoAAAAAAOp8WU7DDLSDiwAAAIsAAAAZAAAAAAAAAAAAAAAAACYAAABwYWNrYWdlL2NvdW50X3RvX3RocmVlLmdvUEsFBgAAAAACAAIAfQAAAOgAAAAAAA=="
                },
                build: {
                    commands: this.build_c ? this.build_c.split("\n") : null,
                    artifacts: this.build_a ? this.build_a.split("\n") : null,
                    host: this.host ? this.host : null
                },
                deploy: {
                    install: {
                        commands: this.install_c ? this.install_c.split("\n") : null
                    },
                    run: {
                        commands: this.run_c ? this.run_c.split("\n") : null
                    },
                    target: {
                        ids: ids
                    }
                },
                debug: this.deployDebug ? this.deployDebug : false
            };

            // console.log(typeof this.install_c)
            /*  if (this.source) {
                          this.source.then(function(data) {
                            taskDer.source.zip = data;
                            myYaml = yaml.safeDump(taskDer);
                            //console.log(myYaml);
                            //http://reely.fit.fraunhofer.de:8080/orders
                            //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                            axios.post("/deployment.json", myYaml)
                              .then(function(response) {
                                console.log(response);
                              })
                              .catch(function(error) {
                                console.log(error);
                              });
                          });
                        } */

            myYaml = yaml.safeDump(taskDer);
            //console.log(myYaml);
            //Hard coded source deployment
            axios.post("http://reely.fit.fraunhofer.de:8080/orders", myYaml).then(function (response) {
                //console.log(response);
                response.data.deploy ? response.data.deploy : (response.data.deploy = "");
                response.data.build ? response.data.deploy : (response.data.build = "");
                listen(
                    response.data.id,
                    true,
                    response.data.deploy.match.list,
                    response.data.build.host
                );
            })
                .catch(function (error) {
                    console.log(error.response);
                    //alert(error.response);
                    $("#mymodal-body").append(error.response.data.error);
                    $("#myAlert").modal();
                });
        },
        removeDevice: function (name) {
            for (var i = 0; i < this.targetDevices.length; i++) {
                if (this.targetDevices[i].name == name) {
                    // Array.splice() remove/replace the element at index i
                    this.targetDevices.splice(i, 1);
                }
            }
            //console.log(this.targetDevices);
        },
        filterHost: function () {
            var value = this.host.toLowerCase();
            this.devices.forEach(function (device) {
                if (!(device.name.toLowerCase().indexOf(value) > -1)) {
                    device.hostActive = false;
                } else {
                    device.hostActive = true;
                }
            });
        },
        filterDevice: function () {
            var value = this.targetText.toLowerCase();
            this.tags.forEach(function (tag) {
                if (!(tag.tag.toLowerCase().indexOf(value) > -1)) {
                    tag.isActive = false;
                } else {
                    tag.isActive = true;
                }
            });
        },
        searchTarget: function () {
            var tagsNodes = document.getElementById("searchTarget").childNodes;
            for (var i = 0; i < tagsNodes.length; i++) {
                if (tagsNodes[i].style.display != "none") {
                    for (var j = 0; j < this.devices.length; j++) {
                        //console.log(this.devices)
                        if (this.devices[j].tags.some(e => e == tagsNodes[i].innerHTML)) {
                            if (!this.targetDevices.some(e => e.name === this.devices[j].name)) {
                                this.targetDevices.push({
                                    name: this.devices[j].name,
                                    tags: this.devices[j].tags
                                });
                                //console.log(i, j, m);
                            }
                        }
                    }
                }
            }
        },
        selectItem: function (tag) {
            var badge = document.createElement("span");
            badge.innerHTML = tag;
            badge.setAttribute("class", "btn btn-primary btn-sm");
            badge.onclick = function () { this.style.display = "none"; };
            document.getElementById("searchTarget").appendChild(badge);
        }
    },
    mounted() {
        this.$refs.map.style.height = window.innerHeight + "px";
        this.$refs.panel.style.height = window.innerHeight + "px";

        const map = L.map("map").setView([50.749523, 7.20343], 17);
        L.tileLayer(
            "https://api.mapbox.com/styles/v1/jingyan/cj51kol9z1fnm2rmy82k24hqm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamluZ3lhbiIsImEiOiJjajN5dDU5bXUwMDhwMzNwanBxeGZoZDZrIn0.-5_CMLp6GDZYhe-7Ra_w_g",
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(map);

        /* this.$refs.editor_build_t.editor.setValue("commands:", 1);
                this.$refs.editor_build_t.editor.setOption("highlightActiveLine", false);
                */

        var markers = L.markerClusterGroup({
            // Change the spiderLeg style
            spiderLegPolylineOptions: {
                weight: 1,
                color: "#222",
                opacity: 0.1
            },
            // Customize marker cluster style
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();
                return L.divIcon({
                    html: "<div><span>" + childCount + "</span></div>",
                    className: "myCluster",
                    iconSize: new L.Point(40, 40)
                });
            }
        });
        //axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
        //http://reely.fit.fraunhofer.de:8080/orders
        // /deployment.json
        axios.get("http://reely.fit.fraunhofer.de:8080/orders").then(response => {
            for (let i = 0; i < response.data.total; i++) {
                let a = response.data.items[i];

                a.build ? a.build : (a.build = "");
                a.deploy ? a.deploy : (a.deploy = "");
                a.isActive = false;
                getFinishTime(a.id).then(data =>{
                    a.finishedAt = data;
                });   
                if(a.deploy){
                    checkStatus(a.id, a.deploy.match.list.length).then(data=>{
                        a.status = data;
                        this.orders.push(a);
                        //console.log(data)
                    });
                }else{
                     a.status =  [0,0]
                     a.deploy =""; 
                     this.orders.push(a);
                }

                 
               

                //this.orders is the list of all deployment saved on the server
               
                //console.log(this.orders)
                /* this.orders.push({
                            name: a.id,
                            targets: a.deploy.match.list,                //the targets
                            status: [0,0],                               //TODO: conut how many devices success and how many failed
                            createdAt: a.createdAt,
                            finishedAt: getFinishTime(a.id),             //TODO: get the latest update time 
                            debug: a.debug,
                            commands: {
                                b_a: a.build ? a.build.commands : "",
                                b_c: a.build ? a.build.artifacts : "",
                                h: a.build ? a.build.host : "",
                                c: a.deploy ? a.deploy : "",
                                isAcitve: false //
                            }
                        }); */
            }
            //console.log(this.orders)
        });
        //http://reely.fit.fraunhofer.de:8080/targets
        // /device.json
        axios.get("http://reely.fit.fraunhofer.de:8080/targets").then(response => {
            //console.log(response.data);
            for (let i = 0; i < response.data.total; i++) {
                let a = response.data.items[i];
                // let marker = L.marker(L.latLng(a.location[0], a.location[1]), {
                // Generate a (lat, lng) randomly for each device
                let marker = L.marker(L.latLng(rand(50.749523), rand(7.20343)), {
                    icon: L.icon({
                        iconUrl: "/done.png",
                        iconSize: [20, 20]
                    }),
                    title: a.id,
                    alt: a.tags
                });
                // this.devices is the list of all devices registered on the server
                this.devices.push({
                    name: a.id,
                    tags: a.tags,
                    targetActive: true,
                    hostActive: true
                });
                //console.log(this.devices)
                //this.tags is the list of all tags of the devices, no duplicated
                if(a.tags){
                     for (let j = 0; j < a.tags.length; j++) {
                    if (!this.tags.some(e => e.tag === a.tags[j])) {
                        this.tags.push({
                            isActive: true,
                            tag: a.tags[j]
                        });
                    }
                }
                }
               
                //console.log(this.tags);
                //this.targetDevices is the list of devices selected in 'deployment target'
                marker.on("click", event => {
                    if (!this.targetDevices.some(e => e.name === event.target.options.title)) {
                        this.targetDevices.push({
                            name: event.target.options.title,
                            tags: event.target.options.alt
                        });
                    }
                });
                markers.addLayer(marker);
            }
        })
            .catch(error => {
                console.log(error);
            });
        // console.log(markers);
        map.addLayer(markers);
    }
};
</script>

<style>
.myCluster {
  background-color: rgba(181, 226, 140, 0.6);
  background-clip: padding-box;
  border-radius: 20px;
}
.myCluster div {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-top: 5px;
  background-color: rgba(110, 204, 57, 0.6);
  text-align: center;
  border-radius: 15px;
  font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.myCluster span {
  line-height: 30px;
}
.myCommandCard{
  border: 1px solid #cccccc;
  border-radius: 2.5px;
  background: #fcfcfc;
  margin-bottom: 5px;
  padding: 5px
}
.simpleDeviceCard {
  border: 1px solid #cccccc;
  border-radius: 2.5px;
  padding: 2.5px;
  margin: 2.5px;
  font-size: 14px;
}

#mySourcelabel::after {
  height: 20px;
  padding: 0;
}
#mytree-body {
  display: grid;
  grid-template-columns: 0.5fr 2.6fr 6fr;
  grid-gap: 5px;
}
#stage {
  display: grid;
  grid-template-rows: 1.3fr 1.3fr 0.5fr;
}
.myCommand {
  grid-column: 1/3;
  background-color: #e9e9e9;
  display: grid;
  grid-template-columns: 1fr 4.5fr;
  font: 12px / normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
    "source-code-pro", monospace;
}
.mycom-title {
  text-align: right;
  font-size: 11px;
}
.mycom-content {
  text-align: left;
  font-size: 11px;
}
.myfont_t {
  font: 12px / normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
    "source-code-pro", monospace;
  color: rgb(0, 174, 49);
}
.myfont_s {
  font: 12px / normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
    "source-code-pro", monospace;
  color: rgb(46, 81, 171);
}
.myfont_f {
  font: 12px / normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
    "source-code-pro", monospace;
  color: #d80027;
}
.node-s {
  fill: rgb(0, 174, 49);
  stroke: none;
}
.node-f, .node-s:hover{
    cursor: pointer;
}
.node-f {
  fill: #d80027;
  stroke: none;
}
.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1px;
}
</style>


