<template>
    <div class="mappanelContainer">
        <div ref="panel" class="panel" style="width:400px;overflow: scroll;">
            <div id="title">
                <h5 style="display: inline-block; margin:5px">Device Management</h5>
            </div>
            <div class="accordion" id="accordionExample" style="width:100%;padding:2.5px">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="false" aria-controls="collapseOne" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                            <img src="../assets/device.png" style="width:18px">
                            Devices List
                        </button>
                    </div>
                    <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice" data-parent="#accordionExample"
                        ref="collapseOne">
                        <div style="padding:5px">
                            <div id="search" style="margin-bottom:5px">
                                <form class="form-inline">
                                    <div class="input-group" style="text-align:left;width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                        <div id="searchTarget"></div>
                                        <input class="dropdown-toggle form-control form-control-sm" type="text" v-model="searchText"
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
                            </div>
                            <div id="deviceList">
                                <div v-for="device in devices" v-show="device.isActive" @click="clickCard(device.marker)">
                                    <div class="mycard my-card-body" style="padding:5px;margin-bottom:5px">
                                        <div class="mycard-title">Name:</div>
                                        <div class="mycard-content">{{device.id}}</div>
                                        <div class="mycard-title">Tags:</div>
                                        <div class="mycard-content">
                                            <span>
                                                <div v-for="tag in device.tags" class="badge badge-pill" :class="tag"
                                                    @click="device.relations=showRelationship(tag,device)">{{tag}}
                                                </div>
                                            </span>
                                        </div>
                                        <div class="mycard-title">Latest Task:</div>
                                        <div class="mycard-content">operationA-v01</div>
                                        <div class="mycard-title">Latest Logs:</div>
                                        <div v-if="device.logs.error" style="text-align:left">
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px">
                                                <img src="../assets/done.png" style="width:20px" @click="showlog1(device.logs.log)">
                                            </button>
                                        </div>
                                        <div v-else style="text-align:left">
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px">
                                                <img src="../assets/error.png" style="width:20px" @click="showlog1(device.logs.log)">
                                            </button>
                                        </div>
                                        <div class="mycard-title">History Tasks:</div>
                                        <div></div>
                                        <div></div>
                                        <div style="text-align:right">
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px">
                                                <img src="../assets/terminal.png" style="width:16px;margin-right:5px"
                                                    @click="showTerminal">
                                            </button>
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px">
                                                <img src="../assets/edit.png" style="width:16px;margin-right:2.5px"
                                                    @click="showEditForm(device)">
                                            </button>
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px">
                                                <img src="../assets/delete.png" style="width:16px;margin-right:5px">
                                            </button>
                                        </div>
                                    </div>
                                    <div style="display:none">
                                        <div style="background-color:#dedede;height:22px">
                                            <div style="font-size:14px; display:inline-block">$agent: {{device.id}}</div>
                                            <button type="button" class="close" aria-label="Close" style="height:20px"
                                                @click="hideTerminal">
                                                <span style="height:20px">&times;</span>
                                            </button>
                                        </div>
                                        <textarea v-model="terminal" class="myTerminal" style="width: 100%" rows="10"
                                            @input="submitTerminal"></textarea>
                                    </div>
                                    <div style="display:none">
                                        <form id="updateDevice">
                                            <div style=" grid-column: 1/4;">
                                                <button type="button" class="close" aria-label="Close" style="height:20px"
                                                    @click="hideEdit">
                                                    <span style="height:20px">&times;</span>
                                                </button>
                                            </div>
                                            <div class="mycard-title">Name:</div>
                                            <div class="mycard-content">
                                                <input type="text" class="form-control form-control-sm"
                                                    style="font-size: 14px;height: 22px;padding: 5px;">
                                            </div>
                                            <div></div>
                                            <div class="mycard-title">Tags:</div>
                                            <div class="mycard-content">
                                                <div class="input-group">
                                                    <label style="margin-top:2.5px">Type:</label>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                        <label class="btn btn-light active" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> drone
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> sensor
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> robot
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="input-group">
                                                    <label style="margin-top:2.5px">HW Arch:</label>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                        <label class="btn btn-light active" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> arm64
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> arm32
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> 8051
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="input-group">
                                                    <label style="margin-top:2.5px">OS:</label>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                        <label class="btn btn-light active" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> freebsd
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> netbsd
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" checked autocomplete="off"> darwin
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div></div>
                                            <div class="mycard-title">Location:</div>
                                            <div><input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;"></div>
                                            <div></div>
                                            <div style="text-align:right;margin-top:5px;grid-column:1/4">
                                                <button type="button" class="btn btn-primary btn-sm" style="font-size:13px;padding: 2.5px 5px;"
                                                    @click="submitEdit">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                            <img src="../assets/edit.png" style="width:20px">
                            Update Devices
                        </button>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample"
                        ref="collapseTwo">
                        <div class="card-body" style="text-align:left;padding:7.5px">
                            <p style="margin-bottom:5px;font-size:14px">Updating Targets:</p>
                            <div style="height:300px; border: 1px solid #e4e4e4; padding: 2.5px;border-radius:2px;overflow: scroll">
                                <div>
                                    <form class="form-inline">
                                        <div class="input-group" style="text-align:left;width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                            <div id="searchTarget2"></div>
                                            <input class="dropdown-toggle form-control form-control-sm" type="text"
                                                v-model="searchText" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false" @keyup="filterDevice" style="font-size: 14px;height: 26px;padding: 5px; border:none">
                                            <div class="input-group-append">
                                                <a class="btn btn-outline-secondary" aria-expanded="true" style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
                                                    @click="searchTarget2">
                                                    <img src="../assets/search.png" style="height:20px">
                                                </a>
                                            </div>
                                            <div class="dropdown-menu" style="padding:2.5px">
                                                <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive"
                                                    @click="selectItem2(tag.tag)" style="font-size:14px;padding:0px 15px">{{tag.tag}}</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
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
                            <p style="margin-bottom:5px;font-size:14px">This update settings will apply to all selected
                                deivces.</p>
                            <form id="updateTags">
                                <div class="mycard-title">Name Base:</div>
                                <div class="mycard-content">
                                    <div class="form-check input-group">
                                        <input class="form-check-input" type="radio" name="radio">
                                        <input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;">
                                        <label>- 1/2/3...</label>
                                    </div>
                                    <div class="form-check input-group">
                                        <input class="form-check-input" type="radio" name="radio">
                                        <input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;">
                                        <label class="form-check-label" for="exampleCheck1">- a/b/c...</label>
                                    </div>
                                </div>
                                <div class="mycard-title">Tags:</div>
                                <div class="mycard-content">
                                    <div class="input-group">
                                        <label style="margin-top:2.5px">Type:</label>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light active" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> drone
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> sensor
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> robot
                                            </label>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <label style="margin-top:2.5px">HW Arch:</label>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light active" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> arm64
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> arm32
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> 8051
                                            </label>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <label style="margin-top:2.5px">OS:</label>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light active" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> freebsd
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> netbsd
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" checked autocomplete="off"> darwin
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mycard-title">Location:</div>
                                <div class="mycard-content"> <input type="text" class="form-control form-control-sm"
                                        style="font-size: 14px;height: 22px;padding: 5px;"></div>

                            </form>
                            <div style="text-align:right;margin-top:5px;">
                                <button type="button" class="btn btn-primary" style="font-size:14px;padding: 2.5px 5px;">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingThree">
                        <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseThree"
                            aria-expanded="false" aria-controls="collapseThree" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                            <img src="../assets/add.png" style="height:20px">
                            Add New Tokens
                        </button>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample"
                        ref="collapseThree">
                        <div style="margin:10px 12.5px 5px">
                            <form id="newDevice" class="form-inline">
                                <h6 style="font-size:15px;margin:0">#Tokens:</h6>
                                <input class="form-control form-control-sm" type="text" style="font-size: 14px;height: 26px;padding: 5px;margin-left:10px;">
                                <a>
                                    <img src="../assets/add.png" style="width:20px; margin-left:10px">
                                </a>
                            </form>
                        </div>
                        <div style="padding:5px">
                            <table id="mytable" class="table" style="text-align:left;font-size:15px">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Token</th>
                                        <th scope="col">Remaining Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>djksie3juuh</td>
                                        <td>6 days</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>ndsi48dujhrz</td>
                                        <td>3 days 2 hours</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>hdsk33kxoplsc</td>
                                        <td>expired</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>33jdueufoplsc</td>
                                        <td>expired</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="map" style="width:800px" ref="map"></div>
        <div id="myLog" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document" style="margin: 50px 100px;">
                <div class="modal-content" style="width:170%">
                    <div class="modal-header">
                        <h5 class="modal-title">Logs for Task:</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="mylog-body" class="modal-body">
                        <div class="accordion" id="accordionLog">
                            <div class="card" style="background-color:#f1f1f1">
                                <div id="headingbuild">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapsebuild"
                                        aria-expanded="true" aria-controls="collapsebuild" style="padding: 0 10px">
                                        <span>&#9656;</span>
                                    </button>
                                    Build
                                </div>
                                <div id="collapsebuild" class="collapse show" aria-labelledby="headingBuild" style="padding: 0 0px 0px 35px;">
                                </div>
                            </div>
                            <div class="card" style="background-color:#f1f1f1">
                                <div id="headinginstall">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapseinstall" aria-expanded="false" aria-controls="collapseinstall"
                                        style="padding: 0 10px">
                                        <span>&#9656;</span>
                                    </button>
                                    Install
                                </div>
                                <div id="collapseinstall" class="collapse" aria-labelledby="headinginstall" style="padding: 0 0px 0px 35px;">
                                </div>
                            </div>
                            <div class="card" style="background-color:#f1f1f1">
                                <div id="headingrun">
                                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                        data-target="#collapserun" aria-expanded="false" aria-controls="collapserun"
                                        style="padding: 0 10px">
                                        <span>&#9656;</span>
                                    </button>
                                    Run
                                </div>
                                <div id="collapserun" class="collapse" aria-labelledby="headingrun" style="padding: 0 0px 0px 35px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import "leaflet.smooth_marker_bouncing";
import $ from "jquery";
import "@/timeline.js"


function rand(n) {
    let max = n + 0.001;
    let min = n - 0.001;
    return Math.random() * (max - min) + min;
}
export default {
    data() {
        return {
            orders:[],
            ordersIds:[],
            map: "",
            polyline: "",
            updateOneName: "",
            devices: [],
            tags: [],
            targetDevices: [],
            markers: [],
            searchText: "",
            terminal: new Date().toUTCString() + ':~'
        };
    },
    components: {
        editor: require("vue2-ace-editor")
    },
    methods: {
        checkLogs: function (target) {
            var des = "target=" + target;
            return axios.get("http://reely.fit.fraunhofer.de:8080/logs?perPage=1000&" + des).then(function (response) {

                if (response.data.items) {
                    if (response.data.items.some(el => el.error == true)) {
                        return {
                            log: response.data.items,
                            error: false
                        };
                    } else {
                        return {
                            log: response.data.items,
                            error: true
                        };
                    }
                } else {
                    return {
                        log: "",
                        error: true
                    };
                }

            }).catch(error => {
                console.log(error);
            });
        },
        showlog1: function (log) {
            log.forEach(function (el) {
                if (el.error == true) {
                    $("#collapse" + el.stage).append('<div class="myfont_f">' + new Date(el.time).toLocaleString() + '  <div class="myfont_t" style="display:inline-block">' + el.command + '</div>  ' + el.output + '</div>')
                } else {
                    $("#collapse" + el.stage).append('<div class="myfont_s">' + new Date(el.time).toLocaleString() + '  <div class="myfont_t" style="display:inline-block">' + el.command + '</div>  ' + el.output + '</div>')
                }
            }
            )
            $("#myLog").modal()
        },
        submitEdit: function () {
            // Post one device update
        },
        hideEdit: function (e) {
            e.path[5].childNodes[0].style.display = 'grid';
            e.path[5].childNodes[2].style.display = 'none';
        },
        showEditForm: function (device) {
            event.path[3].style.display = 'none';
            event.path[4].childNodes[2].style.display = 'inline';
            //console.log(event.path[4].childNodes[2].childNodes[0].childNodes[8].childNodes[0])
            event.path[4].childNodes[2].childNodes[0].childNodes[2].childNodes[0].value= device.id;
            event.path[4].childNodes[2].childNodes[0].childNodes[8].childNodes[0].value= [device.location.lon,device.location.lat];
        },
        submitTerminal: function () {
            //Post one line command
            //console.log(this.terminal.split('\n'));
        },
        hideTerminal: function (e) {
            e.path[4].childNodes[0].style.display = 'grid';
            e.path[4].childNodes[1].style.display = 'none';
            //console.log(e.path)
        },
        showTerminal: function (e) {
            e.path[3].style.display = 'none';
            e.path[4].childNodes[1].style.display = 'inline'
            //console.log(e.path)
        },
        clickCard: function (marker) {
            //L.Marker.stopAllBouncingMarkers();
            //console.log("card");
            //L.Marker.getBouncingMarkers().forEach(el => el.toggleBouncing()); 
        },
        showRelationship: function (tag, device) {
            //console.log()
            device.marker.bounce(4);
            if (this.polyline) {
                this.polyline.remove();
                this.polyline = "";
            }
            if (device.relations == true) {

                var latlngs = [];
                this.devices.forEach(function (target) {
                    if (target.tags.some(el => el == tag)) {
                        latlngs.push([
                            [target.location.lon, target.location.lat],
                            [device.location.lon, device.location.lat]])
                    }
                });
                let color;
                switch (tag) {
                    case 'amd64':
                        color = "#DFABFF";
                        break;
                    case 'swarm':
                        color = "#FF8A8A";
                        break;
                }
                this.polyline = L.polyline(latlngs,
                    {
                        color: color,
                        weight: 2,
                    }).addTo(this.map);
                this.map.fitBounds(this.polyline.getBounds());

                //console.log(polyline)
            }
            return device.relations ? false : true;
        },
        filterDevice: function () {
            var value = this.searchText.toLowerCase();
            this.tags.forEach(function (tag) {
                if (!(tag.tag.toLowerCase().indexOf(value) > -1)) {
                    tag.isActive = false;
                } else {
                    tag.isActive = true;
                }
            });
        },
        removeDevice: function (name) {
            for (var i = 0; i < this.targetDevices.length; i++) {

                if (this.targetDevices[i].id == name) {
                    this.targetDevices.splice(i, 1);
                }
            }
        },
        selectItem: function (tag) {
            var badge = document.createElement("span");
            badge.innerHTML = tag;
            badge.setAttribute("class", "btn btn-primary btn-sm");
            badge.onclick = function () {
                this.style.display = "none";
            };
            document.getElementById("searchTarget").appendChild(badge);
        },
        selectItem2: function (tag) {
            var badge = document.createElement("span");
            badge.innerHTML = tag;
            badge.setAttribute("class", "btn btn-primary btn-sm");
            badge.onclick = function () {
                this.style.display = "none";
            };
            document.getElementById("searchTarget2").appendChild(badge);
        },
        // All device -> search devices
        searchTarget: function () {
            var tagsNodes = document.getElementById("searchTarget").childNodes;

            //console.log(tagsNodes);
            for (var i = 0; i < tagsNodes.length; i++) {
                if (tagsNodes[i].style.display != "none") {
                    for (var j = 0; j < this.devices.length; j++) {
                        if (this.devices[j].tags.some(e => e == tagsNodes[i].innerHTML)) {
                            //console.log(this.devices[j].tags, tagsNodes[i].innerHTML)
                            this.devices[j].isActive = true;
                        } else {
                            this.devices[j].isActive = false;
                        }
                    }
                }
            }
        },
        //Update device -> search devices
        searchTarget2: function () {
            var tagsNodes = document.getElementById("searchTarget2").childNodes;

            for (var i = 0; i < tagsNodes.length; i++) {
                if (tagsNodes[i].style.display != "none") {
                    for (var j = 0; j < this.devices.length; j++) {
                        //console.log(this.devices)
                        if (this.devices[j].tags.some(e => e == tagsNodes[i].innerHTML)) {
                            if (!this.targetDevices.some(e => e.id === this.devices[j].id)) {
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
        },
        closeSearch: function () {
            //console.log(document.getElementById("collapseTwo").className)
            if (document.getElementById("collapseTwo").className == "collapse") {
                document.getElementById("search").style.display = "none";
            } else {
                document.getElementById("search").style.display = "inline";
            }
        },
        getTargets: function () {
            //http://reely.fit.fraunhofer.de:8080/targets
            // /device.json
            axios.get("/device.json").then(response => {
                //console.log(response.data);
                for (let i = 0; i < response.data.total; i++) {

                    let a = response.data.items[i];
                    a.isActive = true;
                    a.relations = true;
                    //This the correct latlng
                    //let marker = L.marker(L.latLng(a.location[0], a.location[1]), {
                    //The latlng is faked
                    // let marker = L.marker(L.latLng(rand(50.749523), rand(7.20343)), {
                    //This the correct latlng
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
                        alt: a.tags ? a.tags : []
                    });
                    a.marker = marker;
                    /* this.checkLogs(a.id).then(data => {
                        a.logs = data;
                        this.devices.push(a);
                    }) */

                    a.logs="";
                    this.devices.push(a);

                    //console.log(a.tags.length);
                    if (a.tags) {
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
                    //Markers click function
                    marker.on("click", event => {
                        if (!this.targetDevices.some(
                            e => e.id === event.target.options.title
                        )) {
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
        getDataAddMarkers: function( {label, value, map, exclamation} ) {
                
                map.eachLayer(function (layer) {
                        if (layer instanceof L.Marker) {
                            map.removeLayer(layer);
                        }
                }); 

                this.markers.clearLayers();

                var filteredData = this.orders.find((i, n)=> { 
                    return i.id === label
                });
                //console.log(filteredData)
                if(filteredData.deploy){
                    filteredData.deploy.match.list.forEach(el=>{
                          let d = this.devices.find(function (de) {
                            return de.id === el      
                          })
                    //console.log(d)
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
                //console.log(filteredData);
                //markerGroup.addTo(map);
               
        },
        getOrders: function () {

            //http://reely.fit.fraunhofer.de:8080/orders
            // /deployment.json
            axios.get("/deployment.json").then(response => {
                //console.log(this.orders)
                for (let i = 0; i < response.data.total; i++) {

                    let a = response.data.items[i];

                    a.build ? a.build : (a.build = "");
                    a.deploy ? a.deploy : (a.deploy = "");
                    a.isActive = false;
                    this.orders.push(a);
                    this.ordersIds.push(a.id);
                }

                L.control.timelineSlider({
                    timelineItems: this.ordersIds,
                    changeMap: this.getDataAddMarkers
                }).addTo(this.map);
            });
        },
    },
    mounted() {
        this.$refs.map.style.height = window.innerHeight + "px";
        this.$refs.panel.style.height = window.innerHeight + "px";

        this.getTargets();
        this.getOrders();
        this.map = L.map("map").setView([50.749523, 7.20343], 17);

        L.tileLayer(
            "https://api.mapbox.com/styles/v1/jingyan/cj51kol9z1fnm2rmy82k24hqm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamluZ3lhbiIsImEiOiJjajN5dDU5bXUwMDhwMzNwanBxeGZoZDZrIn0.-5_CMLp6GDZYhe-7Ra_w_g",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(this.map);

        //Custermize the markerCluster style
        this.markers = L.markerClusterGroup({
            spiderLegPolylineOptions: {
                weight: 1,
                color: "#222",
                opacity: 0.1
            },
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();

                //console.log(cluster)
                //cluster.unspiderfy();
                return L.divIcon({
                    html: "<div><span>" + childCount + "</span></div>",
                    className: "myCluster",
                    iconSize: new L.Point(40, 40)
                });
            }
        });
        this.map.addLayer(this.markers);
        
    }
};
</script>

<style>
.mappanelContainer {
  display: flex;
  flex-direction: row;
}

.panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#mytable th,
#mytable td {
  padding: 7.5px;
}
#mylog-body{
    text-align: left
}
#newDeployment {
  display: grid;
  grid-template-columns: 1fr 4.5fr;
  grid-gap: 2.5px;
}
#updateTags {
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  grid-gap: 2.5px;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding: 5px 2.5px;
}
#updateDevice {
  display: grid;
  grid-template-columns: 0.7fr 4fr 0.5fr;
  grid-gap: 2.5px;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding: 5px 2.5px;
}
.mybtn{
    font-size: 13px;
    padding: 0 5px;
    margin: 0 2.5px
}
.mycard {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 2.5px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 2px;
}
.mycard:active{
  border: 1px solid #007bff;
  border-radius: 2px;
}
.collapse {
  overflow: scroll;
}
.mycard-title {
  text-align: right;
  font-size: 15px;
}
.mycard-content {
  text-align: left;
  font-size: 14px;
}
#deviceList {
  overflow: scroll;
}

.card-header {
  width: 400px;
}

#headingOne,
#headingTwo,
#headingThree {
  padding: 0;
}
.amd64{
    color: #fff;
    background-color: #DFABFF;
    margin-right:2.5px;
}
.swarm{
    color: #fff;
    background-color: #FF8A8A;
    margin-right:2.5px;
}
.swarm:hover, .amd64:hover{
    cursor: pointer;
}
.myTerminal{
  background-color: black;
  color: white;
  font: 11.5px Inconsolata, monospace;
  text-shadow: 0 0 5px #C8C8C8;
}
</style>


