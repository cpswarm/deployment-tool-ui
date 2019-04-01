<template>
  <div class="mappanelContainer">
    <div class="panel" style="width:400px">
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
                <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice" data-parent="#accordionExample" style="overflow:scroll">
                    <div style="padding:5px" ref="list">
                        <div id="deploymentList">
                            <div v-for="order in orderOrders"   v-show="order" :key="order.id" @click="clickCard(order)">
                                <div class="mycard card-body" style="padding:5px;margin-bottom:5px">
                                    <div class="mycard-title">Name:</div>
                                    <div class="mycard-content">{{order.id}}</div>
                                    <div class="mycard-title">Devices:</div>
                                    <div class="mycard-content">
                                    <img src="../assets/done.png" style="width:16px">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="listen(order.id,false, order.deploy.match.list,order.build.host)">
                                        <p style="color:#00AE31;display:inline-block;padding:2.5px;margin:0">{{order.status[0]}}</p>
                                    </button>
                                    <img src="../assets/error.png" style="width:16px">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="listen(order.id,false, order.deploy.match.list,order.build.host)">
                                        <p style="color:#D80027;display:inline-block;padding:2.5px;margin:0">{{order.status[1]}}</p>
                                    </button>
                                </div>
                                <div class="mycard-title">Created Time:</div>
                                <div class="mycard-content">{{new Date(order.createdAt).toLocaleString()}}</div>
                                <div class="mycard-title">Finished Time:</div>
                                <div class="mycard-content">{{new Date(order.finishedAt).toLocaleString()}}</div>
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
                                     <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="stopOrder(order)">
                                        <img src="../assets/stop.png" style="width:16px">
                                    </button>
                                      <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="deleteOrder(order)">
                                        <img src="../assets/delete.png" style="height:16px">
                                    </button>
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="duplicateOrder(order)">
                                        <img src="../assets/duplicate.png" style="width:18px">
                                    </button>
                                </div>
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
                <div id="collapseThree"  class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample" style="overflow:scroll">
                    <div class="card-body" style="padding:7.5px" ref="collapseThree">
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
                                            @click=" host = device.id " style="font-size:14px;padding:0px 15px">{{device.id}}</a>
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
                                            <div style="padding:0 2.5px;display:inline-block;width:80%">{{device.id}}</div>
                                            <button type="button" class="close" aria-label="Close" @click="removeDevice(device.id)"
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
                                 <button class="btn btn-primary" @click="clearForm" type="button" style="font-size:14px;padding: 2.5px 5px;margin-right:5px">Clear</button>
                                <button class="btn btn-primary" @click="submitDeploy" type="button" style="font-size:14px;padding: 2.5px 5px;">Deploy</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="map" style="width:900px" ref="map"></div>
    <div id="myAlert" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog alert alert-danger" role="document" style="width:150%">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 id="" class="modal-title">Message</h5>
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
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
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
        <div id="notification" class="notification"> 
            <div class="mycard-title" style="color:#ffda44; display: none" >New Discovered:
                <img src="../assets/star.png" style="width:15px"></div>
            <div class="mycard-content" style="display: none;">
                 <button type="button" class="btn btn-light btn-sm" style="color:#ffda44; padding: 0 2px" @click="showNewDevices">
                        {{this.newDiscover.length}} 
                </button>
                </div> 
            <div class="mycard-title" style="color:#d80027">Failed:
                <img src="../assets/error.png" style="width:15px">
            </div>
            <div class="mycard-content">
                 <button type="button" class="btn btn-light btn-sm" style="color:#d80027;padding: 0 2px" @click="filterDevices('failed')">
                {{this.failed.length}}
                  </button>
                </div>
            <div class="mycard-title" style="color:#00ae31">Success:
                 <img src="../assets/done.png" style="width:15px">
            </div>
            <div class="mycard-content" >
                  <button type="button" class="btn btn-light btn-sm" style="color:#00ae31;padding: 0 2px" @click="filterDevices('success')">
                        {{this.success.length}} </button>
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


// Generate fake latitude and logitude
function rand(n) {
    let max = n + 0.001;
    let min = n - 0.001;
    return Math.random() * (max - min) + min;
}

export default {
    data() {
        return {
            map:"",
            ws: "",
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
            fullDevices:[],
            tags: [],
            orders: [],
            tree: [],
            markers: [],
            failed:[],
            success:[],
            newDiscover:[],
        };
    },
    components: {
        editor: require("vue2-ace-editor")
    },
    computed: {
        orderOrders: function () {
            return this.orders.sort(function (a, b) {
                return b.finishedAt - a.finishedAt
            })
        }
    },
    methods: {
        clickCard: function (order) {

            if(event.target.tagName == "DIV"){
                 let cards = document.getElementById('deploymentList').getElementsByClassName('mycard my-card-body');
                 Array.from(cards).map(item=>{
                  item.setAttribute('class','mycard my-card-body');
                })
            event.path[1].setAttribute('class','mycard my-card-body active');
           }
           
            this.markers.clearLayers();
            if(order.deploy){
                    order.deploy.match.list.forEach(el=>{
                          let d = this.devices.find(function (de) {
                            return de.id === el      
                          })
                    //console.log(d)
                    if (!d.location) {
                        d.location = {
                            lon: rand(50.749523),
                            lat: rand(7.203923),
                        }
                    }
                    let marker = L.marker(L.latLng(d.location.lon, d.location.lat), {
                        icon: L.icon({
                            iconUrl: "/done.png",
                            iconSize: [20, 20]
                        }),
                        title: el,
                        alt: d.tags ? d.tags : []
                    });
                   this.markers.addLayer(marker);
                    })
                }
                this.map.addLayer(this.markers)
                this.map.fitBounds(this.markers.getBounds());
            //this.map.fitbounds(this.markers.layer.getBounds());
            //L.Marker.stopAllBouncingMarkers();
            //console.log("card");
            //L.Marker.getBouncingMarkers().forEach(el => el.toggleBouncing()); 
        },
        filterDevices: function (para) {
            switch(para){
                case 'failed': 
                    this.devices = this.failed;
                    break;
                case 'success': 
                    this.devices = this.success;
                    break;
            }
            this.$router.push({ path: "/home", props:{
                devices: this.devices,
            } 
            });
            
        },
        showNewDevices: function () {
            this.devices = this.newDiscover.concat(this.devices);
            this.markers.clearLayers();
            this.devices.map(item=>{
                this.markers.addLayer(item.marker)
            })
            //console.log(this.devices);
        },
        getFinishnStatus: function (id, total) {

            return axios.get("http://reely.fit.fraunhofer.de:8080/logs?task=" + id + "&perPage=1000&sortOrder=desc").then(response => {

                let finishAt = response.data.items[0].time;
                let logs = response.data.items.filter(el => el.error && el.output == "STAGE-END")
                if (logs.length == 0) {
                    return [finishAt, [total, 0]];
                } else {
                    if (logs[0].stage == "build") {
                        return [finishAt, [0, 0]]
                    } else {
                        return [finishAt, [total - logs.length, logs.length]];
                    }
                }
            }).catch(error => {
                console.log(error);
            });

        },
        getFinishTime: function (id) {
            //Request the latest logs time
            return axios.get("http://reely.fit.fraunhofer.de:8080/logs?task=" + id + "&perPage=1&sortOrder=desc").then(response => {
                //console.log(response.data)
                return response.data.items[0].time;
            }).catch(error => {
                console.log(error);
            })
            //return new Date(1551800395755).toLocaleString();
        },
        checkStatus: function (id, total) {
            // Get all STAGE-END with error logs of one task, every task only has one logs with this condition, host doesn't count
            return axios.get("http://reely.fit.fraunhofer.de:8080/logs?task=" + id + "&error=true&output=STAGE-END").then(response => {
                if (!response.data.items) {
                    return [total, 0];
                } else {
                    if (response.data.items[0].stage == "build") {
                        return [0, 0]
                    } else {
                        return [total - response.data.items.length, response.data.items.length];
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        },
        checkLogs: function (target) {
            var des = "target=" + target;
            return axios.get("http://reely.fit.fraunhofer.de:8080/logs?perPage=1000&sortOrder=desc&" + des).then(function (response) {

                if (response.data.items) { 
                    let fulltask = new Set();
                    response.data.items.forEach(el => {
                        fulltask.add(el.task)
                    });
                    let task = Array.from(fulltask).slice(0,10);

                    //console.log(task)
                    let lastLog = response.data.items.filter(el => el.task == task[0])
                    if (lastLog.some(el => el.error == true)) {
                        return {
                            tasks: task,
                            log: response.data.items,
                            error: true
                        };
                    } else {
                        return {
                            tasks:task,
                            log: response.data.items,
                            error: false
                        };
                    }
                } else {
                    return {
                        tasks:"",
                        log: "",
                        error: "none"
                    };
                }
            }).catch(error => {
                console.log(error);
            });
        },
        editorInit: function () {
            require("brace/ext/language_tools"); //language extension prerequsite...
            require("brace/mode/golang");
            require("brace/mode/javascript");
            require("brace/mode/less");
            require("brace/theme/github");
            require("brace/snippets/javascript");
        },
        deleteOrder: function (order) {

            $('#mymodal-body').empty()
            axios.delete("http://reely.fit.fraunhofer.de:8080/orders/" + order.id).then(
                response => {

                    let index = this.orders.indexOf(this.orders.find(el => el.id == order.id))
                    //console.log(order.id)
                    this.orders.splice(index, 1);
                    //console.log(this.orders);
                    $('#mymodal-body').append("Delete order with " + order.id + "  " + response.statusText)
                    $('#myAlert').modal();
                    //console.log(this.orders.length)
                }
            ).catch(error => {
                $('#mymodal-body').append("Delete order with " + order.id + "  " + error)
                $('#myAlert').modal();
            })

        },
        stopOrder: function (order) {

            $('#mymodal-body').empty();
            axios.put("http://reely.fit.fraunhofer.de:8080/orders/" + order.id + "/stop").then(response => {

                //this.orders.splice(order.id,1);
                //console.log(response);
                $('#mymodal-body').append("Stop order with " + order.id + "  " + response.data.message)
                $('#myAlert').modal();
                //console.log(this.orders.length)

            }).catch(error => {
                $('#mymodal-body').append("Delete order with " + order.id + "  " + error)
                $('#myAlert').modal();
            })
        },
        duplicateOrder: function (order) {

            $("#collapseThree").collapse("show");
            this.deployName = order.id;
            this.deployDebug = order.debug;
            this.source = "";
            document.getElementById("customFile").value = "";
            this.build_c = order.build ? order.build.commands.join("\n") : "";
            this.build_a = order.build ? order.build.artifacts.join("\n") : "";
            this.host = order.build ? order.build.host : "";
            this.install_c = order.deploy && order.deploy.install.commands ? order.deploy.install.commands.join("\n") : "";
            this.run_c = order.deploy && order.deploy.run.commands ? order.deploy.run.commands.join("\n") : "";
            this.targetDevices = [];
            if (order.deploy) {
                for (var i = 0; i < order.deploy.match.list.length; i++) {

                    this.targetDevices.push({
                        id: order.deploy.match.list[i],
                        tags: this.devices.find(el => el.id == order.deploy.match.list[i]).tags,
                    });
                }
            }
        },
        removeDevice: function (name) {
            for (var i = 0; i < this.targetDevices.length; i++) {
                if (this.targetDevices[i].id == name) {
                    // Array.splice() remove/replace the element at index i
                    this.targetDevices.splice(i, 1);
                }
            }
            //console.log(this.targetDevices);
        },
        filterHost: function () {
            var value = this.host.toLowerCase();
            this.devices.forEach(function (device) {
                if (!(device.id.toLowerCase().indexOf(value) > -1)) {
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
                        if (this.devices[j].tags) {
                            if (this.devices[j].tags.some(e => e == tagsNodes[i].innerHTML)) {
                                //console.log(this.targetDevices)
                                if (!(this.targetDevices.some(e => e.id == this.devices[j].id))) {
                                    //console.log(this.devices[j].tags)
                                    this.targetDevices.push({
                                        id: this.devices[j].id,
                                        tags: this.devices[j].tags
                                    });
                                    //console.log(i, j, m);
                                }
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
        },
        handleFileSelect: function (event) {
            console.log(this.source)
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
            this.source = archive.generateAsync({ type: "base64" });
            document.getElementById("mySourcelabel").innerHTML = files[0].name + "...";
        },
        submitDeploy: function () {

            $('#mymodal-body').empty();
            let ids = [];
            let tags = [];
            for (let i = 0; i < this.targetDevices.length; i++) {
                ids.push(this.targetDevices[i].id);
                /*    this.targetDevices[i].tags.forEach(function (el) {
                                    if (!tags.some(e => e == el)) {
                                        tags.push(el);
                                    }
                }); */
            }
            var myYaml;
            var taskDer = {
                source: {
                    zip: ""
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
            if (this.source) {
                this.source.then(data => {
                    taskDer.source.zip = data;
                    console.log(taskDer)
                    myYaml = yaml.safeDump(taskDer);
                    //console.log(myYaml);
                    axios.post("http://reely.fit.fraunhofer.de:8080/orders", myYaml).then(response => {
                        //console.log(response);
                        response.data.deploy ? response.data.deploy : (response.data.deploy = "");
                        response.data.build ? response.data.deploy : (response.data.build = "");

                        $("#collapseOne").collapse("show");
                        this.clearForm();
                        this.listen(response.data.id, true, response.data.deploy.match.list, response.data.build.host);

                    }).catch(error => {
                        console.log(error.response);
                        $("#mymodal-body").append(error.response.data.error);
                        $("#myAlert").modal();
                    });
                });
            } else {

                myYaml = yaml.safeDump(taskDer);
                //console.log(myYaml);    
                axios.post("http://reely.fit.fraunhofer.de:8080/orders", myYaml).then(response => {
                    //console.log(response);
                    response.data.deploy ? response.data.deploy : (response.data.deploy = "");
                    response.data.build ? response.data.deploy : (response.data.build = "");
                    this.listen(response.data.id, true, response.data.deploy.match.list, response.data.build.host);

                }).catch(error => {
                    console.log(error.response);
                    $("#mymodal-body").append(error.response.data.error);
                    $("#myAlert").modal();
                });
            }
        },
        listen: function (id, deploy, target, host) {
            $("#myTree").modal();
            //console.log(this.ws)
            var logs = [];
            var t = [];
            let deviceStatus = new Map();
            
            //If there is a build process
            if (host) {
                let status = new Map();
                status.set('build','STAGE-START');
                status.set('install','');
                status.set('run','');
                deviceStatus.set(host, status);
                t.push(host)
            }
            //If there is a deploy process
            if (target) {
                target.forEach(el => {
                    let status = new Map();
                    status.set('build','');
                    status.set('install','');
                    status.set('run','');
                    deviceStatus.set(el,status);
                    t.push(el); 
                })
            }
            //console.log(deviceStatus)
            if (!deploy) {
                axios.get("http://reely.fit.fraunhofer.de:8080/logs?task=" + id + "&sortOrder=desc&perPage=1000")
                    .then(response => {
                        this.generateTree(response.data.items, deviceStatus, t);
                    }).catch(error => {
                        console.log(error)
                    });
            }
            if (!("WebSocket" in window)) {
                alert("WebSocket is not supported by your Browser!");
                return;
            }
            // Clear the WebSocket
            if (this.ws) {
                this.ws.close();
                this.ws = "";
            } else {
                this.ws = new WebSocket("ws://reely.fit.fraunhofer.de:8080/events?order=" + id + "&topics=logs");
                this.ws.onopen = function () {
                    console.log("Socket connected.");
                };
                this.ws.onmessage = event => {
                    //console.log(event.data);
                    var obj = JSON.parse(event.data);
                    this.generateTree(obj.payload, deviceStatus, t);
                };
                this.ws.onclose = function () {
                    console.log("Socket disconnected.");
                    $("#mylog").prepend("<p>WebSocket Disconnected!</p>");
                    // If socket disconnected, try to connect again after 5s.
                    /* setTimeout(function () { listen(1, true);}, 5000); */
                };
            }
        },
        generateTree: function (logs, devicesStatus, targets) {

            $("#mylog").empty();
            d3.selectAll("circle").remove();
            d3.selectAll("line").remove();

            //console.log('all logs', logs)
            var code = "";
            var myTree = {
                value: 0,
                children: [{
                    name: "",
                    value: 0,
                    class: "node-s",
                    commands: "",
                    children: [
                        {
                            name: "",
                            value: 0,
                            class: "node-s",
                            commands: ""
                        },
                        {
                            name: "",
                            value: 0,
                            class: "node-f",
                            commands: ""
                        }
                    ]
                },
                {
                    name: "",
                    value: 0,
                    class: "node-f",
                    commands: "",
                }]
            };

            // Meaning there is build process.
            // Go through all host + targets
            targets.forEach(el => {
                // Get all logs for one devices, make sure, the logs is in desc order
                var oneLog = logs.filter(log => log.target == el);
                //console.log(oneLog)
                // IF there is log on this el device
                if (oneLog.length > 0) {
                    let endLogs = oneLog.filter(el =>{
                        return el.output == "STAGE-END"
                    });
                    //console.log(endLogs)
                    if(endLogs){
                        endLogs.forEach(item =>{
                            if(item.error){  
                                //console.log(item.target, devicesStatus.get(item.target))
                                devicesStatus.get(item.target).set(item.stage,['STAGE-END-e', oneLog.filter(el => el.stage == item.stage)])
                            }else{
                                //console.log(item.target, devicesStatus.get(item.target))
                                devicesStatus.get(item.target).set(item.stage, ['STAGE-END', oneLog.filter(el => el.stage == item.stage)])
                            }
                        })
                    }else{
                         if(devicesStatus.get(item.target).get(item.stage)[0].substring(0,9) != "STAGE-END"){
                              devicesStatus.get(item.target).set(item.stage,['', oneLog.filter(el => el.stage == item.stage)])
                         }
                    }
                //console.log(devicesStatus)
                  /*   // Check whether there is a stage ended with error
                    let e = oneLog.find(el => {
                        return el.error == true && el.output == "STAGE-END" && el.stage != "build"
                    })
                    let b_e = oneLog.find(el => {
                        return el.error == true && el.output == "STAGE-END" && el.stage == "build"
                    })
                    let b = oneLog.find(el => {
                        return el.stage == "build"
                    })
                    // If yes, change the stage status
                    if (e) {
                        devicesStatus.set(e.target, [e.stage, "STAGE-END-e", oneLog.filter(el => el.stage == e.stage)]);
                    } else {
                        devicesStatus.set(oneLog[0].target, [oneLog[0].stage, oneLog[0].output, oneLog.filter(el => el.stage == oneLog[0].stage)]);
                    }
                    if (b_e) {
                        devicesStatus.set(b_e.target, ["build", "STAGE-END-e", oneLog.filter(el => el.stage == "build")]);
                    } else if (b) {
                        devicesStatus.set("build", ["build", b.output, oneLog.filter(el => el.stage == "build")]);
                    } */
                }
                var c = "Device: " + el;
                oneLog.forEach(log => {
                    let s = "";
                    log.error ? s = "f" : s = "s"
                    c += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.output + "</div>";
                });
                code += '<div class="myCommandCard">' + c + '</div>';

            })
            //console.log(devicesStatus)
            devicesStatus.forEach((value, key) => {
                //console.log(value,key)
                if(value.get('build')){
                    switch (value.get('build')[0]) {
                            case "STAGE-END-e":
                                myTree.name = "build"
                                myTree.value = 1;
                                myTree.class = 'node-f';
                                myTree.commands = value.get('build')[1];
                                break;
                            default:
                                myTree.name = "build"
                                myTree.value = 1;
                                myTree.class = 'node-s';
                                myTree.commands = value.get('build')[1]; 
                                
                        }       
                }
                if(value.get('run')){
                    //console.log(value.get('run'))
                    switch (value.get('run')[0]) {
                            case "STAGE-END-e":
                                myTree.children[0].children[1].name = "run";
                                myTree.children[0].children[1].value++;
                                myTree.children[0].children[1].class = 'node-f';
                                myTree.children[0].children[1].commands = value.get('run')[1];
                                break;
                            default:
                                myTree.children[0].children[0].name = "run";
                                myTree.children[0].children[0].value++;
                                myTree.children[0].children[0].class = 'node-s';
                                myTree.children[0].children[0].commands = value.get('run')[1];
                        }
                       
                }else if(value.get('install')){
                    switch (value.get('install')[0]) {
                            case "STAGE-END-e":
                                myTree.children[1].name = "install";
                                myTree.children[1].value++;
                                myTree.children[1].class = 'node-f';
                                myTree.children[1].commands = value[2];
                                break;
                            default:
                                myTree.children[0].name = "install"
                                myTree.children[0].value++;
                                myTree.children[0].class = 'node-s';
                                myTree.children[0].commands = value[2];
                        }
                      
                }
/* 
                switch (value) {
                    case "build":
                        switch (value[1]) {
                            case "STAGE-END-e":
                                myTree.name = "build"
                                myTree.value = 1;
                                myTree.class = 'node-f';
                                myTree.commands = value[2];
                                break;
                            default:
                                myTree.name = "build"
                                myTree.value = 1;
                                myTree.class = 'node-s';
                                myTree.commands = value[2];
                        }
                        break;
                    case "install":
                        switch (value[1]) {
                            case "STAGE-END-e":
                                myTree.children[1].name = "install";
                                myTree.children[1].value++;
                                myTree.children[1].class = 'node-f';
                                myTree.children[1].commands = value[2];
                                break;
                            default:
                                myTree.children[0].name = "install"
                                myTree.children[0].value++;
                                myTree.children[0].class = 'node-s';
                                myTree.children[0].commands = value[2];
                        }
                        break;
                    case "run":
                        switch (value[1]) {
                            case "STAGE-END-e":
                                myTree.children[0].children[1].name = "run";
                                myTree.children[0].children[1].value++;
                                myTree.children[0].children[1].class = 'node-f';
                                myTree.children[0].children[1].commands = value[2];
                                break;
                            default:
                                myTree.children[0].children[0].name = "run";
                                myTree.children[0].children[0].value++;
                                myTree.children[0].children[0].class = 'node-s';
                                myTree.children[0].children[0].commands = value[2];
                        }
                        break;
                } */
            }) 
            //console.log(myTree)
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
                    $('#mylog').empty();
                    code = "";
                    d.data.commands.forEach(el => {
                        code += '<div class="myfont_' + d.data.class[5] + '">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                    });
                    $('#mylog').prepend('<div class="myCommandCard">' + code + '</div>')
                });
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
                        if (d.source.children[0].value == 0 && d.source.children.length <= 1 && d.target.children[0].value == 0) {
                            return 0;
                        } else {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                })
            $('#mylog').append(code);
            
        },
        clearForm: function () {
            this.deployName = "";
            document.getElementById("mySourcelabel").innerHTML = "";
            this.source = "";
            document.getElementById("customFile").value = "";
            this.deployDebug = false
            this.build_c = "";
            this.build_a = "";
            this.host = "";
            this.install_c = "";
            this.run_c = "";
            this.targetDevices = [];
        },
        closeModal: function () {

            if (this.ws) {
                this.ws.close();
                this.ws = "";
            }
            this.orders = [];
            this.getOrders();

        },
        getOrders: function () {

            //http://reely.fit.fraunhofer.de:8080/orders
            // /deployment.json
            axios.get("http://reely.fit.fraunhofer.de:8080/orders").then(response => {
                //console.log(this.orders)
                for (let i = 0; i < response.data.total; i++) {

                    let a = response.data.items[i];

                    a.build ? a.build : (a.build = "");
                    a.deploy ? a.deploy : (a.deploy = "");
                    a.isActive = false;

                    if (a.deploy) {
                        this.getFinishnStatus(a.id, a.deploy.match.list.length).then(data => {
                            a.finishedAt = data[0];
                            a.status = data[1];
                            this.orders.push(a);
                            //console.log(data)
                        });
                    } else {
                        this.getFinishTime(a.id).then(data => {
                            a.finishedAt = data;
                        });
                        a.status = [0, 0]
                        a.deploy = "";
                        this.orders.push(a);
                    }
                    //this.orders is the list of all deployment saved on the server
                }
                //console.log(this.orders)
            });

        },
        getTargets: function () {

            //http://reely.fit.fraunhofer.de:8080/targets
            // /device.json
            axios.get("http://reely.fit.fraunhofer.de:8080/targets").then(response => {
                //console.log(response.data);
                for (let i = 0; i < response.data.total; i++) {
                    let a = response.data.items[i];
                    a.targetActive = true;
                    a.hostActive = true;
                    // let marker = L.marker(L.latLng(a.location[0], a.location[1]), {
                    // Generate a (lat, lng) randomly for each device

                    // this.devices is the list of all devices registered on the server
                    
                    //console.log(this.devices)
                    //this.tags is the list of all tags of the devices, no duplicated
                    var tags="";
                    if (a.tags) {
                        for (let j = 0; j < a.tags.length; j++) {
                            tags+='<div class="badge badge-pill ' +a.tags[j] +'">'+a.tags[j]+'</div>'
                            if (!this.tags.some(e => e.tag === a.tags[j])) {
                                this.tags.push({
                                    isActive: true,
                                    tag: a.tags[j]
                                });
                            }
                        }
                    }
                    if (!a.location) {
                        a.location = {
                            lon: rand(50.749523),
                            lat: rand(7.203923),
                        }
                    }
                    let marker = L.marker(L.latLng(a.location.lon, a.location.lat), {
                        icon: L.icon({
                            iconUrl: "/done.png",
                            iconSize: [20, 20]
                        }),
                        title: a.id,
                        alt: a.tags
                    });
                    a.marker = marker;
                    
                    marker.bindPopup('<div>Name: '+a.id +'</div><div>Tags: '+ tags +'</div>');
                    this.checkLogs(a.id).then(data => {
                        a.logs = data;
                        if(data.error == true){
                            this.failed.push(a);
                        }else{
                            this.success.push(a); 
                        }
                        this.devices.push(a);
                        this.fullDevices.push(a);
                    });

                    this.devices.push(a);
                    //this.targetDevices is the list of devices selected in 'deployment target'
                    marker.on("click", event => {

                        marker.openPopup();

                        if (!this.targetDevices.some(e => e.id === event.target.options.title)) {
                            this.targetDevices.push({
                                id: event.target.options.title,
                                tags: event.target.options.alt
                            });
                        }
                    });
                    this.markers.addLayer(marker);
                }
            }).catch(error => {
                console.log(error);
            });
        },
    },
    mounted() {

        this.$refs.map.style.height = window.innerHeight + "px";
        this.$refs.list.style.height = window.innerHeight - 34 - 27 - 32-15 + "px";
        this.$refs.collapseThree.style.height = window.innerHeight - 34 - 27 - 32 -15 + "px";

        /* this.$refs.editor_build_t.editor.setValue("commands:", 1);
           this.$refs.editor_build_t.editor.setOption("highlightActiveLine", false);
        */
        this.getOrders();
        this.getTargets();
        this.map = L.map("map").setView([50.749523, 7.20343], 17);
        L.tileLayer(
            "https://api.mapbox.com/styles/v1/jingyan/cj51kol9z1fnm2rmy82k24hqm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamluZ3lhbiIsImEiOiJjajN5dDU5bXUwMDhwMzNwanBxeGZoZDZrIn0.-5_CMLp6GDZYhe-7Ra_w_g",
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(this.map);

        this.markers = L.markerClusterGroup({
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
        // console.log(markers);

        this.map.addLayer(this.markers);
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


