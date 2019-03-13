<template>
<div class="mappanelContainer">
    <div ref="panel" class="panel" style="width:400px;overflow: scroll;">
        <div id="title">
            <h5 style="display: inline-block; margin:5px">Device Management</h5>
        </div>
        <div class="accordion" id="accordionExample" style="width:100%;padding:2.5px">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <button class="btn btn-light collapsed" type="button" data-toggle="collapse"
                        data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"
                        style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                        <img src="../assets/device.png" style="width:18px">
                        Devices List
                    </button>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice"
                    data-parent="#accordionExample" ref="collapseOne">
                    <div style="padding:5px">
                        <div id="search" style="margin-bottom:5px">
                            <form class="form-inline">
                                <div class="input-group"
                                    style="text-align:left;width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                    <div id="searchTarget"></div>
                                    <input class="dropdown-toggle form-control form-control-sm" type="text"
                                        v-model="searchText" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false" @keyup="filterDevice"
                                        style="font-size: 14px;height: 26px;padding: 5px; border:none">
                                    <div class="input-group-append">
                                        <a class="btn btn-outline-secondary" aria-expanded="true"
                                            style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
                                            @click="searchTarget">
                                            <img src="../assets/search.png" style="height:20px">
                                        </a>
                                    </div>
                                    <div class="dropdown-menu" style="padding:2.5px">
                                        <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive"
                                            @click="selectItem(tag.tag)"
                                            style="font-size:14px;padding:0px 15px">{{tag.tag}}</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div id="deviceList">
                            <div v-for="device in devices" v-show="device.isActive" @click="clickCard(device.marker)">
                                <div class="mycard my-card-body" style="padding:5px;margin-bottom:5px">
                                    <div class="mycard-title">Name:</div>
                                    <div class="mycard-content">{{device.name}}</div>
                                    <div class="mycard-title">Tags:</div>
                                    <div class="mycard-content">
                                        <span>
                                            <div v-for="tag in device.tags" class="badge badge-pill" :class="tag"
                                                @click="device.relations=showRelationship(tag,device)">{{tag}}
                                            </div>
                                        </span>
                                    </div>
                                    <div class="mycard-title">Current Task:</div>
                                    <div class="mycard-content">operationA-v01</div>
                                    <div class="mycard-title">Current Logs:</div>
                                    <div v-if="device.logs.error" style="text-align:left">
                                        <img src="../assets/done.png" style="width:20px"
                                            @click="showlog1(device.logs.log)">
                                    </div>
                                    <div v-else style="text-align:left">
                                        <img src="../assets/error.png" style="width:20px"
                                            @click="showlog1(device.logs.log)">
                                    </div>
                                    <div class="mycard-title">History Tasks:</div>
                                    <div></div>
                                    <div></div>
                                    <div style="text-align:right">
                                        <img src="../assets/terminal.png" style="width:20px;margin-right:5px"
                                            @click="showTerminal">
                                        <img src="../assets/edit.png" style="width:20px;margin-right:5px"
                                            @click="showEditForm">
                                        <img src="../assets/delete.png" style="width:20px;margin-right:5px">
                                    </div>
                                </div>
                                <div style="display:none">
                                    <div style="background-color:#dedede;height:22px">
                                        <div style="font-size:14px; display:inline-block">$agent: {{device.name}}</div>
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
                                                <ul style="display:inline-block;padding-left:5px;margin-bottom:0">
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">drone</button>
                                                    </li>
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">sensor</button>
                                                    </li>
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">robot</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="input-group">
                                                <label style="margin-top:2.5px">HW Arch:</label>
                                                <ul style="display:inline-block;padding-left:5px;margin-bottom:0">
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">arm64</button>
                                                    </li>
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">arm32</button>
                                                    </li>
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">8051</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="input-group">
                                                <label style="margin-top:2.5px">OS:</label>
                                                <ul style="display:inline-block;padding-left:5px;margin-bottom:0">
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">freebsd</button>
                                                    </li>
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">netbsd</button>
                                                    </li>
                                                    <li class="my-li" style="display:inline-block">
                                                        <button class="btn btn-primary btn-sm"
                                                            style="margin:5px;padding:0 5px">darwin</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div></div>
                                        <div style="text-align:right;margin-top:5px;grid-column:1/4">
                                            <button type="button" class="btn btn-primary btn-sm"
                                                style="font-size:13px;padding: 2.5px 5px;"
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
                    <button class="btn btn-light collapsed" type="button" data-toggle="collapse"
                        data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                        style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                        <img src="../assets/edit.png" style="width:20px">
                        Update Devices
                    </button>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample"
                    ref="collapseTwo">
                    <div class="card-body" style="text-align:left;padding:7.5px">
                        <p style="margin-bottom:5px;font-size:14px">Updating Targets:</p>
                        <div
                            style="height:300px; border: 1px solid #e4e4e4; padding: 2.5px;border-radius:2px;overflow: scroll">
                            <div>
                                <form class="form-inline">
                                    <div class="input-group"
                                        style="text-align:left;width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                        <div id="searchTarget2"></div>
                                        <input class="dropdown-toggle form-control form-control-sm" type="text"
                                            v-model="searchText" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false" @keyup="filterDevice"
                                            style="font-size: 14px;height: 26px;padding: 5px; border:none">
                                        <div class="input-group-append">
                                            <a class="btn btn-outline-secondary" aria-expanded="true"
                                                style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
                                                @click="searchTarget2">
                                                <img src="../assets/search.png" style="height:20px">
                                            </a>
                                        </div>
                                        <div class="dropdown-menu" style="padding:2.5px">
                                            <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive"
                                                @click="selectItem2(tag.tag)"
                                                style="font-size:14px;padding:0px 15px">{{tag.tag}}</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div v-for="device in targetDevices" class="simpleDeviceCard">
                                <div class="input-group" style="padding:2.5px;">Name:
                                    <div style="padding:0 2.5px;display:inline-block;width:80%">{{device.name}}</div>
                                    <button type="button" class="close" aria-label="Close"
                                        @click="removeDevice(device.name)" style="height:20px">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="input-group" style="padding:2.5px">Tags:
                                    <div v-for="tag in device.tags"
                                        style="padding: 2.5px; margin: 0 2.5px;line-height: 1.5;"
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
                                    <input type="text" class="form-control form-control-sm"
                                        style="font-size: 14px;height: 22px;padding: 5px;">
                                    <label>- 1/2/3...</label>
                                </div>
                                <div class="form-check input-group">
                                    <input class="form-check-input" type="radio" name="radio">
                                    <input type="text" class="form-control form-control-sm"
                                        style="font-size: 14px;height: 22px;padding: 5px;">
                                    <label class="form-check-label" for="exampleCheck1">- a/b/c...</label>
                                </div>
                            </div>
                            <div class="mycard-title">Tags:</div>
                            <div class="mycard-content">
                                <div class="input-group">
                                    <label style="margin-top:2.5px">Type:</label>
                                    <ul style="display:inline-block;padding-left:5px;margin-bottom:0">
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">drone</button>
                                        </li>
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">sensor</button>
                                        </li>
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">robot</button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="input-group">
                                    <label style="margin-top:2.5px">HW Arch:</label>
                                    <ul style="display:inline-block;padding-left:5px;margin-bottom:0">
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">ARM64</button>
                                        </li>
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">ARM32</button>
                                        </li>
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">8051</button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="input-group">
                                    <label style="margin-top:2.5px">OS:</label>
                                    <ul style="display:inline-block;padding-left:5px;margin-bottom:0">
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">FreeBSD</button>
                                        </li>
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">NetBSD</button>
                                        </li>
                                        <li class="my-li" style="display:inline-block">
                                            <button class="btn btn-primary btn-sm"
                                                style="margin:5px;padding:0 5px">Darwin</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        <div style="text-align:right;margin-top:5px;">
                            <button type="button" class="btn btn-primary"
                                style="font-size:14px;padding: 2.5px 5px;">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree">
                    <button class="btn btn-light collapsed" type="button" data-toggle="collapse"
                        data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                        style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                        <img src="../assets/add.png" style="height:20px">
                        Add New Tokens
                    </button>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample"
                    ref="collapseThree">
                    <div style="margin:10px 12.5px 5px">
                        <form id="newDevice" class="form-inline">
                            <h6 style="font-size:15px;margin:0">#Tokens:</h6>
                            <input class="form-control form-control-sm" type="text"
                                style="font-size: 14px;height: 26px;padding: 5px;margin-left:10px;">
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
                                <button class="btn btn-link" type="button" data-toggle="collapse"
                                    data-target="#collapsebuild" aria-expanded="true" aria-controls="collapsebuild"
                                    style="padding: 0 10px">
                                    <span>&#9656;</span>
                                </button>
                                Build
                            </div>
                            <div id="collapsebuild" class="collapse show" aria-labelledby="headingBuild"
                              style="padding: 0 0px 0px 35px;">
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
                            <div id="collapseinstall" class="collapse" aria-labelledby="headinginstall"
                               style="padding: 0 0px 0px 35px;">
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
                            <div id="collapserun" class="collapse" aria-labelledby="headingrun"
                                 style="padding: 0 0px 0px 35px;">
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

var map;
var polyline;

function rand(n) {
    let max = n + 0.001;
    let min = n - 0.001;
    return Math.random() * (max - min) + min;
}
function checkLogs(target) {

   /*  var des = "target=" + target;
    try {(async () => {
            let logs = await axios.get("http://reely.fit.fraunhofer.de:8080/logs?" + des);
            logs.data.items.some( el=>el.error ==true)
            return {
                log:logs,
                error: false
            };
        })();
    } catch (error) {
        console.log(error);
    } */
    return {
                log: [
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "STAGE-START",
            "time": 1550760204391,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "compressed to 571 bytes",
            "time": 1550760204410,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760204424,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760205436,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "received package sized 1025981 bytes",
            "time": 1550760206077,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "STAGE-START",
            "time": 1550760206113,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "compressed to 1026008 bytes",
            "time": 1550760206216,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760206223,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760207241,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760215456,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760216474,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760217260,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760218276,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760226494,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760227513,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760228299,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760229319,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760237538,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760238553,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760239341,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760240364,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760248581,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760249599,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760306604,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760314824,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760315839,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760316624,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "run",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760317643,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760325864,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760326882,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760327659,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760328675,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760336919,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760337940,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760338710,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760339732,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760347966,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760348979,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760349756,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "install",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760350784,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent announcement",
            "time": 1550760359001,
            "target": "my-laptop"
        },
        {
            "task": "0b796aac-30f7-47b5-ad13-0bfe8367be5c",
            "stage": "build",
            "command": "$manager",
            "output": "sent task",
            "time": 1550760360016,
            "target": "my-laptop"
        },
       
    ],
                error: false
            };
}

export default {
    data() {
        return {
            devices: [],
            tags: [],
            targetDevices: [],
            searchText: "",
            terminal: new Date().toUTCString() + ':~'
        };
    },
    components: {
        editor: require("vue2-ace-editor")
    },
    methods: {
        showlog1: function (log) {
            log.forEach(function(el) {
                if(el.error == true){
                    $("#collapse"+el.stage).append('<div class="myfont_f">'+ new Date(el.time).toLocaleString()+'  <div class="myfont_t" style="display:inline-block">'+ el.command +'</div>  '+el.output + '</div>')
                }else{
                    $("#collapse"+el.stage).append('<div class="myfont_s">'+ new Date(el.time).toLocaleString()+'  <div class="myfont_t" style="display:inline-block">'+ el.command +'</div>  '+el.output + '</div>')
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
        showEditForm: function (e) {
            e.path[2].style.display = 'none';
            e.path[3].childNodes[2].style.display = 'inline'
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
            e.path[2].style.display = 'none';
            e.path[3].childNodes[1].style.display = 'inline'
            //console.log(e.path[3].childNodes[1])
        },
        clickCard: function (marker) {
            //L.Marker.stopAllBouncingMarkers();
            //console.log("card");
            //L.Marker.getBouncingMarkers().forEach(el => el.toggleBouncing()); 
        },
        showRelationship: function (tag, device) {
            //console.log()
            device.marker.bounce(4);
            if (polyline) {
                polyline.remove();
                polyline = "";
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
                polyline = L.polyline(latlngs,
                    { color: color,
                        weight: 2,
                    }).addTo(map);
                map.fitBounds(polyline.getBounds());

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

                if (this.targetDevices[i].name == name) {
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
                            if (!this.targetDevices.some(e => e.name === this.devices[j].name)) {
                                this.targetDevices.push({
                                    name: this.devices[j].name,
                                    tags: this.devices[j].tags
                                });
                                //console.log(i, j, m);
                            }
                        }
                        // implement Array.some() manually
                        /*  for (var m = 0; m < this.devices[j].tags.length; m++) {
                          //console.log(this.devices[j].tags[m],tagsNodes[i].innerHTML)
                          if (this.devices[j].tags[m] == tagsNodes[i].innerHTML) {
                            if (
                              !this.targetDevices.some(e => e.name === this.devices[j].name)
                            ) {
                              this.targetDevices.push({
                                name: this.devices[j].name,
                                tags: this.devices[j].tags
                              });
                              //console.log(i, j, m);
                            }
                            break;
                          }
                        } */
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
        }
    },
    mounted() {
        this.$refs.map.style.height = window.innerHeight + "px";
        this.$refs.panel.style.height = window.innerHeight + "px";

        map = L.map("map").setView([50.749523, 7.20343], 17);
        L.tileLayer(
            "https://api.mapbox.com/styles/v1/jingyan/cj51kol9z1fnm2rmy82k24hqm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamluZ3lhbiIsImEiOiJjajN5dDU5bXUwMDhwMzNwanBxeGZoZDZrIn0.-5_CMLp6GDZYhe-7Ra_w_g",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(map);

        //Custermize the markerCluster style
        var markers = L.markerClusterGroup({
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
        //axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";
        //http://reely.fit.fraunhofer.de:8080/targets
        // /device.json
        axios.get("/device.json").then(response => {
            //console.log(response.data);
            for (let i = 0; i < response.data.total; i++) {
                let a = response.data.items[i];
                //This the correct latlng
                //let marker = L.marker(L.latLng(a.location[0], a.location[1]), {
                //The latlng is faked
                // let marker = L.marker(L.latLng(rand(50.749523), rand(7.20343)), {
                //This the correct latlng
                let marker = L.marker(L.latLng(a.location.lon, a.location.lat), {
                    icon: L.icon({
                        iconUrl: "/done.png",
                        iconSize: [20, 20]
                    }),
                    title: a.id,
                    alt: a.tags ? a.tags : []
                });
                this.devices.push({
                    marker: marker,
                    logs: checkLogs(a.id),
                    name: a.id,
                    tags: a.tags ? a.tags : [],
                    location: a.location,
                    isActive: true,
                    relations: true
                });

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
                            e => e.name === event.target.options.title
                        )) {
                        this.targetDevices.push({
                            name: event.target.options.title,
                            tags: event.target.options.alt
                        });
                    }
                });
                markers.addLayer(marker);
            }
        }).catch(error => {
                console.log(error);
            });
        map.addLayer(markers);
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


