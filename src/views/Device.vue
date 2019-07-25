<template>
    <div class="mappanelContainer">
        <div class="panel">
            <div id="title">
                <h5 style="display: inline-block; margin:5px">Device Management</h5>
            </div>
            <div class="accordion" id="accordionExample" style="width:100%;padding:2.5px">
                   <!-- update devices panel -->
                   <div class="card">
                        <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500" title="Open the panle to batch update devices">
                            <img src="../assets/edit.png" style="width:20px">Update Devices
                        </button>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body" ref="collapseTwo" style="text-align:left;padding:7.5px; overflow:auto">
                            <p style="margin-bottom:0;font-size:14px">Updating Targets:</p>
                             <small>(CLICK cluster or DOUBLE CLICK marker to select Target.)</small>
                            <div style="height:380px; border: 1px solid #e4e4e4; padding: 2.5px;border-radius:2px;overflow: auto">
                                <div>
                                    <!-- device filter -->
                                    <form class="form-inline">
                                        <div class="input-group" style="text-align:left;width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                            <div id="searchTarget2"></div>
                                            <input class="dropdown-toggle form-control form-control-sm" type="text"
                                                v-model="searchText2" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false" @keyup="filterDevice" style="font-size: 14px;height: 26px;padding: 5px; border:none"  :placeholder="'Search'">
                                            <div class="dropdown-menu" style="padding:2.5px">
                                                    <p class="dropdown-header" style="padding:2px 5px"> <strong> Names:</strong> </p>
                                            <a v-for="device in fullDevices" class="dropdown-item" v-show="device.nameActive" @click="selectItem2(device.id)"
                                                style="font-size:14px;padding:0 15px">{{device.id}}</a>
                                             <div class="dropdown-divider"></div>
                                             <p class="dropdown-header" style="padding:2px 5px">   <strong> Tags:</strong> </p>
                                            <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive" @click="selectItem2(tag.tag)"
                                                style="font-size:14px;padding:0 15px">{{tag.tag}}</a>
                    
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- updated device card -->
                                <div v-for="device in targetDevices" class="simpleDeviceCard">
                                    <div style="padding:2.5px;">Name:
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
                            <p style="margin-bottom:5px;font-size:14px">This update settings will apply to all selected deivces.</p>
                            <!-- update settings -->
                            <form id="updateTags">
                                <div class="mycard-title">Tags:</div>
                                <div class="mycard-content">
                                    <div class="input-group">
                                        <h6 class="mycard-content" style="margin-top:2.5px">Type:</h6>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light">
                                                <input type="checkbox" autocomplete="off" value="actuator"> actuator
                                            </label>
                                            <label class="btn btn-light">
                                                <input type="checkbox" autocomplete="off" value="light" >light
                                            </label>
                                            <label class="btn btn-light">
                                                <input type="checkbox" autocomplete="off" value="motion"> motion
                                            </label>
                                             <label class="btn btn-light">
                                                <input value="builder" type="checkbox"> builder
                                            </label>
                                            <label class="btn btn-light">
                                                <input type="checkbox" autocomplete="off" value="drone" >drone
                                            </label>
                                            <label class="btn btn-light">
                                                <input type="checkbox" autocomplete="off" value="swarm">swarm
                                            </label>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <h6 class="mycard-content" style="margin-top:2.5px">HW Arch:</h6>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light">
                                                <input type="checkbox" autocomplete="off" value="amd64" > amd64
                                            </label>
                                            <label class="btn btn-light" >
                                                <input type="checkbox" autocomplete="off" value="arm32" > arm32
                                            </label>
                                             <label class="btn btn-light">
                                                <input type="checkbox" autocomplete="off" value="raspi0" > raspi0
                                            </label>
                                            <label class="btn btn-light" >
                                                <input type="checkbox" autocomplete="off" value="raspi2" > raspi2
                                            </label>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <h6 class="mycard-content" style="margin-top:2.5px">OS:</h6>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light">
                                                <input type="checkbox"  value="linux" > linux
                                            </label>
                                            <label class="btn btn-light">
                                                <input type="checkbox" value="darwin"> darwin
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mycard-title">Location:</div>
                                <div class="mycard-content"> 
                                    <input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;" v-model="location"></div>
                            </form>                     
                            <div style="margin-top:5px">
                                <button type="button" class="btn btn-danger" style="font-size:14px;padding: 2.5px 5px;" @click="clearForm">Clear</button>
                                <button type="button" class="btn btn-primary" style="font-size:14px;padding: 2.5px 5px;float:right" @click="batchUpdate">Update</button>
                            </div>    
                        </div>
                    </div>
                </div>
                <!-- manage token panel -->
                <div class="card">
                        <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseThree"
                            aria-expanded="false" aria-controls="collapseThree" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500" title="Open the panel to manage tokens">
                            <img src="../assets/key.svg" style="height:20px">
                            Manage Tokens
                        </button>  
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div ref="collapseThree" style="overflow:auto">
                        <div style="margin:10px 12.5px 5px;">
                           <!--  request for new tokens -->
                            <form id="newToken" class="form-inline">
                                <div class="mycard-title">
                                    <h6 style="font-size:15px;margin:0">Token Set Name:</h6>
                                </div>
                                <div class="mycard-content">
                                    <input v-model ="tokenName" class="form-control form-control-sm" type="text" style="height: 26px;">
                                </div>
                                <div class="mycard-title">
                                    <h6 style="font-size:15px;margin:0">#Tokens:</h6></div>
                                <div class="mycard-content">
                                    <input v-model ="tokenSize" class="form-control form-control-sm" type="text" style="height: 26px;">
                                    <button class="btn btn-primary btn-sm" type="button" style="padding: 0 5px; margin-left:20px" @click="postToken">Get</button>
                                </div>
                            </form>
                        </div>
                        <div style="padding:5px">
                            <!-- token sets table -->
                            <table id="mytable" class="table" style="text-align:left;font-size:15px">
                                <thead>
                                    <tr>
                                       <th scope="col">Name</th>
                                        <th scope="col">#Available </th>
                                        <th scope="col">Expires Time</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="tokenSet in token">
                                        <td>{{tokenSet.name}}</td>
                                        <td>{{tokenSet.available}}</td>
                                        <td>{{tokenSet.expiresAt}}</td>
                                        <td><button class="btn btn-danger btn-sm" @click="deleteToken(tokenSet.name)" style="padding: 0 5px">Delete</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
                <!-- device list panel -->
                <div class="card">
                        <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="false" aria-controls="collapseOne" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500" title="Open devices list">
                            <img src="../assets/device.png" style="width:18px">
                            Device List
                        </button>
                    <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice" data-parent="#accordionExample"
                        ref="collapseOne">
                        <div style="padding:5px">
                           <!--  device filter -->
                            <div id="search" style="margin-bottom:5px">    
                                <form class="form-inline">
                                    <button type="button" class="btn" style="padding: 0 5px;border: 1px solid;margin: 0 5px 0 0;" @click="refresh" title="Refresh devices list">
                                        <img src="../assets/refresh.svg" style="width:14px">
                                    </button>
                                    <div class="input-group" style="width:92%;">
                                        <div id="searchTarget"></div>
                                        <input class="dropdown-toggle form-control form-control-sm" type="text" v-model="searchText"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterDevice" :placeholder="'Search'"
                                            style="font-size: 14px;height: 26px;padding: 5px;">
                                        <div class="dropdown-menu" style="padding:2.5px">
                                            <p class="dropdown-header" style="padding:2px 5px"> <strong> Names:</strong> </p>
                                            <a v-for="device in fullDevices" class="dropdown-item" v-show="device.nameActive" @click="selectItem(device.id)"
                                                style="font-size:14px;padding:0 15px">{{device.id}}</a>
                                             <div class="dropdown-divider"></div>
                                             <p class="dropdown-header" style="padding:2px 5px">   <strong> Tags:</strong> </p>
                                            <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive" @click="selectItem(tag.tag)"
                                                style="font-size:14px;padding:0 15px">{{tag.tag}}</a>
                                        </div>
                                    </div>                                 
                                </form>
                            </div>                           
                            <div id="deviceList" ref="list" style="overflow:auto">
                                <!--  device card, the data list is called 'orderTarget', each item is called 'device' which is a object -->
                                <div v-for="device in orderTargets" v-show="device.isActive" @click="clickCard(device.marker)" :key="device.id">
                                    <div class="mycard my-card-body" style="padding:8px;margin-bottom:5px">
                                        <div class="mycard-title">Name:</div>
                                        <div class="mycard-content" >{{device.id}}</div>
                                        <div class="mycard-title">Tags:</div>
                                        <div class="mycard-content">
                                            <span>
                                                <button v-for="tag in device.tags" class="badge badge-pill" :class="tag"
                                                    @click="showRelationship(tag,device)" title="Cilck and check devices sharing with this tag">{{tag}}
                                                </button>
                                            </span>
                                        </div>
                                        <div class="mycard-title">Latest Task:</div>
                                        <div class="mycard-content" style="font-size:12px;margin-top:2.5px">
                                            <span v-if="device.logs.tasks[0][1]!='none'">{{device.logs.tasks[0][0]}}</span>
                                        </div>
                                        <div class="mycard-title">Task History:</div>
                                        <div style="margin-bottom:5px">
                                            <div v-if="device.logs.tasks[0][1]!='none'">
                                                <hr style="border: 1px solid #2c3e50;margin:10px 0"> 
                                                <li v-for="task in device.logs.tasks.slice().reverse()" class="history_li" @click="showLog(device.logs.log, task[0],device.id)">    
                                                    {{task[0].substring(0,2)}}  
                                                    <img v-if="task[1]==false" src="../assets/done.png" style="position:relative; top:-39px;width:12px;background-color: #fff; border-radius: 50%" title="Click to check logs" >  
                                                    <img v-else src="../assets/error.png" style="position:relative; top:-39px;width:12px;background-color: #fff; border-radius: 50%" title="Click to check logs">                
                                                </li>
                                            </div>
                                        </div>
                                        <div></div>
                                        <div style="text-align:right">
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px; margin-right:2px" title="Open a terminal" @click="showTerminal">
                                                <img src="../assets/terminal.png" style="width:15px"
                                                   >
                                            </button>
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" title="Open edit form" @click="showEditForm(device)">
                                                <img src="../assets/edit.png" style="width:16px"
                                                   >
                                            </button>
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" title="Delete device" @click="deleteTarget(device.id)">
                                                <img src="../assets/delete.png" style="width:16px" >
                                            </button>
                                        </div>
                                    </div>
                                    <!-- terminal interface, it is hidden by default -->
                                    <div class="myT" style="display:none">
                                        <div style="background-color:#dedede;height:22px">
                                            <div style="font-size:14px; display:inline-block">$agent: {{device.id}}</div>
                                            <button type="button" class="close" aria-label="Close" style="height:20px"
                                                @click="hideTerminal(device.id)">
                                                <span style="height:20px">&times;</span>
                                            </button>
                                        </div>
                                        <textarea class="myTerminal" style="width: 100%" rows="13" v-bind:id="device.id"
                                         @keydown="executeTerminal(device.id)">$ </textarea>
                                    </div>
                                    <!-- update form on device card, it is hidden by default -->
                                    <div style="display:none">
                                        <form class="updateDevice">
                                            <div style=" grid-column: 1/4;">
                                                <button type="button" class="close" aria-label="Close" style="height:20px"
                                                    @click="hideEdit">
                                                    <span style="height:20px">&times;</span>
                                                </button>
                                            </div>
                                            <div class="mycard-title">Name:</div>
                                            <div class="mycard-content">
                                                <input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;">
                                            </div>
                                            <div></div>
                                            <div class="mycard-title">Tags:</div>
                                            <div class="mycard-content">
                                                <div class="input-group">
                                                    <p style="margin:2.5px 0">Type:</p>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                       
                                                         <label class="btn btn-light">
                                                            <input type="checkbox" autocomplete="off" value="builder"> builder
                                                        </label>    
                                                        <label class="btn btn-light">
                                                            <input type="checkbox"  autocomplete="off" value="actuator"> actuator
                                                        </label>
                                                        <label class="btn btn-light">
                                                            <input type="checkbox" autocomplete="off" value="light" >light
                                                        </label>
                                                        <label class="btn btn-light">
                                                            <input type="checkbox" autocomplete="off" value="motion"> motion
                                                        </label>
                                                         <label class="btn btn-light">
                                                            <input type="checkbox" autocomplete="off" value="drone" >drone
                                                        </label>
                                                        <label class="btn btn-light">
                                                            <input type="checkbox" autocomplete="off" value="swarm">swarm
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="input-group">
                                                     <p style="margin:2.5px 0">HW Arch:</p>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                        <label class="btn btn-light">
                                                            <input type="checkbox"  autocomplete="off" value="amd64"> amd64
                                                        </label>
                                                        <label class="btn btn-light">
                                                            <input type="checkbox" autocomplete="off" value="arm32"> arm32
                                                        </label>
                                                        <label class="btn btn-light">
                                                            <input type="checkbox"  autocomplete="off" value="raspi2"> raspi2
                                                        </label>
                                                           <label class="btn btn-light">
                                                            <input type="checkbox"  autocomplete="off" value="raspi0"> raspi0
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="input-group">
                                                     <p style="margin:2.5px 0">OS:</p>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                       
                                                        <label class="btn btn-light">
                                                            <input type="checkbox"  autocomplete="off" value="linux"> linux
                                                        </label>
                                                        <label class="btn btn-light">
                                                            <input type="checkbox" autocomplete="off" value="darwin"> darwin
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
                                                    @click="submitEdit(device.id)">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
        <div id="map"  ref="map"></div>
        <!-- error response dialog -->
        <div id="myAlert" class="modal fade" tabindex="5" role="dialog" aria-hidden="true">
            <div class="modal-dialog alert alert-danger" role="document" style="width:150%">
                <div class="modal-content" >
                    <div class="modal-header">
                        <h5 id="" class="modal-title">Message</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div id="mymodal-body" class="modal-body" style="text-align:left"></div>
            </div>
        </div>
        </div>
        <!-- successful response dialog -->
         <div id="myMessage" class="modal fade" tabindex="5" role="dialog" aria-hidden="true">
            <div class="modal-dialog alert alert-success" role="document" style="width:150%">
                <div class="modal-content" >
                    <div class="modal-header">
                        <h5 class="modal-title">Message</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div id="mymessage-body" class="modal-body" style="text-align:left"></div>
            </div>
        </div>
        </div>
        <!-- deployment logs diaog modal -->
        <div id="myLog" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div id="myLog-dialog" class="modal-dialog" role="document" style="margin: 50px 100px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="logTitle" class="modal-title" style="text-align:left; margin-right:53%">Task:</h5>
                        <button type="button" class="btn btn-light" style="padding: 0 4px; margin-right:5px" @click="requestLogs"> &#8634; Fetch logs
                        </button> 
                        <button type="button" class="btn btn-light" style="padding: 0 4px" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&#10006; Close</span>
                        </button>
                    </div>
                    <div id="mylog-body" class="modal-body">
                        <div class="accordion" id="accordionLog">
                            <div class="card" style="background-color:#f1f1f1">
                                <button class="btn btn-light myBtn" type="button" data-toggle="collapse" data-target="#collapsebuild" aria-expanded="true" aria-controls="collapsebuild">
                                      Build
                                </button>
                                <div id="collapsebuild" class="collapse show  myCommandCard" aria-labelledby="headingBuild"> </div>
                            </div>
                            <div class="card" style="background-color:#f1f1f1">
                                <button class="btn btn-light myBtn" type="button" data-toggle="collapse" data-target="#collapseinstall" aria-expanded="true" aria-controls="collapseinstall">
                                      Install
                                </button>
                                <div id="collapseinstall" class="collapse show  myCommandCard" aria-labelledby="headinginstall">  </div>
                            </div>
                            <div class="card" style="background-color:#f1f1f1">
                                <button class="btn btn-light myBtn" type="button" data-toggle="collapse" data-target="#collapserun" aria-expanded="true" aria-controls="collapserun">
                                     Run
                                </button>
                                <div id="collapserun" class="collapse show  myCommandCard" aria-labelledby="headingrun"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- timeline -->
        <div class="myTimeline" ref="myTimeline">
               <button ref="pre" class="btn btn-sm btn-light" @click="previous">
                    <span style="left: -5px">&#9668;</span> 
                </button> 
                <button ref="next" disabled class="btn btn-sm btn-light"  style="float: right" @click="next">
                    <span style="left: -4px">&#9658;</span>
                </button>
               <div style="height:70px; overflow:hidden">
                <hr style="border: 1.5px solid #2c3e50;margin-top: 35px;">
                <div ref="timeline_lis" style="position: relative;top:-54px;width:max-content;float:right">
                    <li v-for="order in orderOrders.slice().reverse()" class="timeline-li" @click="clickDeployment(order.id)" tabindex="0" data-trigger="focus" data-toggle="popover" data-placement="top" data-html="true" :data-content="'Name: '+ order.id.substring(0,26) + '...<br>'+ 'Description: ' + order.description">
                    <div><strong style="margin-right:5px">{{order.date}}</strong>{{order.time}}</div>
                    <div v-if="order.status">
                        <img v-if="order.status[1]==0 && order.status[0]!=0" src="../assets/done.png" style="width:22px;background-color: #fff; border-radius: 50%" title="Click to check related devices">  
                        <img v-else src="../assets/error.png" style="width:22px;background-color: #fff; border-radius: 50%" title="Click to check related devices">              
                    </div>    
                    </li> 
                </div>
            </div>
        </div>
        <!--  notification card -->
        <div class="notification"> 
            <div class="mycard-title" style="color:#ffda44" >Discovered:
                <img src="../assets/star.png">
            </div>
            <div class="mycard-content">
                <button type="button" class="btn btn-light btn-sm" style="color:#ffda44" @click="showNewDevices" title="Click to check new discovered devices list">{{this.newDiscover.length}}</button>
            </div> 
            <div class="mycard-title" style="color:#d80027">Failed:
                <img src="../assets/error.png">
            </div>
            <div class="mycard-content">
                <button type="button" class="btn btn-light btn-sm" style="color:#d80027" @click="filterDevices('failed')"  title="Click to check failed devices list">{{this.failed.length}}</button>
            </div>
            <div class="mycard-title" style="color:#00ae31">Successful:
                 <img src="../assets/done.png">
            </div>
            <div class="mycard-content" >
                <button type="button" class="btn btn-light btn-sm" style="color:#00ae31" @click="filterDevices('success')" title="Click to check success devices list">{{this.success.length}} </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import CRC32 from 'crc-32'

function rand(n) {
    let max = n + 0.001;
    let min = n - 0.001;
    return Math.random() * (max - min) + min;
}
export default {
    data() {
        return {
            address:"", // server address
            offset:0,   // offset to enable the pagination button
            failed:[],  // failed device list
            success:[], // success device list
            newDiscover:[],  // newDiscover device list
            orders:[],  // deployment list
            map: "",
            polyline: "",  // relationship lines on the map
            updateOneName: "",
            devices: [],   // device list (the device cards shown in Device List)
            fullDevices:[],  // full device list get from database, cannot be changed
            tags: [],   // the distinct tags of all devices, for filtering
            targetDevices: [],  // updated device list
            markers: [],  // device markers/marker clusters on the map
            searchText: "",  // searching keyword of device list
            searchText2: "",  // searching keyword of updated device list
            terminal: '$ ',   // terminal interface input
            location:"",     // device location
            crt:'',   // keycode when input commands in terminal
            ws:'',    // websocket
            tokenName: '', 
            tokenSize:'',
            token: [],  // token list
        };
    },
    components: {
        editor: require("vue2-ace-editor")
    },
    computed: {
        // the sorted deployment list
        orderOrders: function () {
            return this.orders.sort(function (a, b) {
                return b.createdAt - a.createdAt
            })
        },
        // the sorted device list
        orderTargets: function(){
            return this.devices.sort(function (a, b) {
                return b.updatedAt - a.updatedAt
            })
        }
    },
    //methods are sorted alphabetically
    methods: {
        // append deployment logs when user click history tasks
        appendLogs: function(log,id){
            let build = $("#collapsebuild"), install = $("#collapseinstall"), run = $("#collapserun");
            build.empty().collapse('show');
            install.empty().collapse('show');
            run.empty().collapse('show');

            let checksum = 0, count =0;
            
            let logs =  log.filter(el => el.task == id);
            for(let i =1; i < logs.length;i++){
                let c ='';
                logs[i].error == true?  c = 'f':c= 's';

                let line = logs[i].stage + '  ' + logs[i].command + '  ' + logs[i].output;
                let l = new Date(logs[i].time).toLocaleString()+'  '+line;
                let csm = CRC32.str(line);
                // merge the same line by CRC32 checksum
                if(checksum == csm){
                    count++;
                    switch(logs[i].stage){
                    case 'build':
                            build.children().last().html('<span class="badge badge-primary" style="margin-right:2.5px">'+count+'</span>'+l);
                            break;
                    case 'install':
                            install.children().last().html('<span class="badge badge-primary" style="margin-right:2.5px">'+count+'</span>'+l);
                            break;
                    case 'run':
                            run.children().last().html('<span class="badge badge-primary" style="margin-right:2.5px">'+count+'</span>'+l);
                            break;
                    }
                }else{
                    count = 0 ;
                    let n = '<div class="myfont_'+c+'">' + l + '</div>';  
                    switch(logs[i].stage){
                        case 'build':
                            if(logs[i].output == 'STAGE-END')   build.prev().children().remove();
                            build.append(n);
                            break;
                        case 'install':
                            if(logs[i].output == 'STAGE-END')   install.prev().children().remove();
                            install.append(n);
                            break;
                        case 'run':
                            if(logs[i].output == 'STAGE-END')   run.prev().children().remove();
                            run.append(n);
                            break;
                    }
                }
                checksum = csm; 
            }
            //if there is no logs under one stage, remove the spinner
            if(build.children().length==0){
                build.prev().children().remove();
            }
            if(install.children().length==0){
                install.prev().children().remove();
            }
            if(run.children().length==0){
                run.prev().children().remove();
            }
        },
        // batch update device
        batchUpdate: function () {
            let input = document.getElementById('updateTags').getElementsByTagName('input');  
            // myUpdate is the update settings       
            let myUpdate = {
                tags:[],
            }
            Array.from(input).forEach(item =>{
                if(item.checked){
                    myUpdate.tags.push(item.value);
                }
            });
            let alert = $('#mymodal-body'), message = $('#mymessage-body');
            alert.empty();
            message.empty();

            //open update devices panel
            $("#collapseOne").collapse("show");

            //for each targeting device, PUT the update
            this.targetDevices.forEach(el=>{
                let p = this.fullDevices.find(d=>{ return d.id == el.id });
                if(p.publicKey) myUpdate.publicKey = p.publicKey;

                myUpdate.location = p.location;
                if(this.location){
                    myUpdate.location.lon = parseFloat(input[input.length-1].value.split(',')[0]);
                    myUpdate.location.lat = parseFloat(input[input.length-1].value.split(',')[1]);
                }
               
                axios.put(this.address + "/targets/" + el.id, myUpdate).then(response=>{
                    $('#myMessage').modal();
                    message.append("Update target with "+ el.id + "  " + response.statusText + "<br>");
                }).catch(error => {
                    $('#myAlert').modal();
                    alert.append("Update target with " + el.id + "  " + error);
                }); 
            });          
        },
        // reset update settings and empty targeting device list 
        clearForm: function () {
            let t = document.getElementById('updateTags');
            let input = t.getElementsByTagName('input');
            let label = t.getElementsByTagName('label');

            $('#searchTarget2').empty();
        
            Array.from(input).forEach(item =>{ item.checked = false });
            Array.from(label).forEach(item =>{ item.setAttribute('class','btn btn-light') });

            this.targetDevices=[];
            this.updateTags =[];
            this.location = "";
        },
        // when close the dialog, refresh the full device list, deployment list, recalculate the successful, failed list, refresh the markers.
        closeModal: function () {
            this.devices = [];
            this.fullDevices = [];
            this.failed = [];
            this.success = [];
            this.token=[];
            this.markers.clearLayers();
            this.getTargets();
            this.getTokens();
        },
        // request all logs on one device
        checkLogs: function (target) {

            let des = "target=" + target;
            return axios.get(this.address + "/logs?perPage=1000&sortOrder=desc&" + des).then(function (response) {

                if (response.data.items) { 
                    let fulltask = new Set();
                    response.data.items.forEach( el =>  fulltask.add(el.task) );
                    // the lastet 15 tasks of one device
                    let task = Array.from(fulltask).slice(0,15);
                    // check logs of each task and return whether there was error overall. [task id, error]
                    let tasks = task.map(t =>{
                        let lastLog = response.data.items.filter(el => el.task == t); 
                        if (lastLog.some(el => el.error == true)) {
                             return t = [t,true]
                        }else{
                             return t = [t,false]
                        }
                    });
                    return { 'tasks': tasks,
                             'log': response.data.items.reverse(),  };
                } else {
                    return { 'tasks':[['','none']],
                             'log': [],                             };
                }
            }).catch(error => {
                console.log(error);
            });
        }, 
        // click timeline item, show device markers on the map and cards of one deployment 
        clickDeployment: function (id) {

            if(this.polyline) this.polyline.remove();
            
            this.markers.clearLayers();
            this.devices = [];
            let filteredData = this.orders.find(i=> { return i.id === id });

            if(filteredData.deploy){
                filteredData.deploy.match.list.forEach(el=>{
                    let d = this.fullDevices.find(function (de) { return de.id === el  });
                    this.devices.push(d);      
                    this.markers.addLayer(d.marker);
                })
            }
            this.map.addLayer(this.markers)
            this.map.fitBounds(this.markers.getBounds());
        },  
        // click device card
        clickCard: function (marker) {  
             this.map.panTo(marker.getLatLng());
             marker.openPopup();
        },
        // create the badge appending to the search input 
        createBadge: function (content) {
            let badge = document.createElement("span");
            badge.innerHTML = content;
            badge.setAttribute("class", "btn btn-primary btn-sm");
            badge.setAttribute("style", "padding: 2px 5px");
            badge.onclick = ()=>{ 
                event.target.style.display = "none";
                this.searchTarget2();
            };
            return badge;
        },
        // delete device from database
        deleteTarget: function (id) {
            
            let alert = $('#mymodal-body'), message=$('#mymessage-body');
            alert.empty();
            message.empty();

            axios.delete(this.address+"/targets/" + id).then(response => {

                let index = this.devices.indexOf(this.devices.find(el => el.id === id));
                // make this device card invisible
                this.devices.splice(index, 1);
                this.failed = [];
                this.success = [];
                this.devices.forEach(el=>{ el.logs.error == true ? this.failed.push(el): this.success.push(el); })
                $('#myMessage').modal();
                message.append("Delete target with " + id + "  " + response.statusText);

            }).catch(error => {
                $('#myAlert').modal();
                alert.append("Delete target with " + id + "  " + error);
            })
            
        },
        // delete tokens set from database
        deleteToken: function (name) {

            let alert = $('#mymodal-body'), message=$('#mymessage-body');
            alert.empty();
            message.empty();

            axios.delete(this.address+"/token_sets/" + name).then(response => {
                let index = this.token.indexOf(this.token.find(el => el.name === name));
                this.token.splice(index, 1);
                $('#myMessage').modal();
                message.append("Delete token set with name: " + name + "  " + response.statusText);

            }).catch(error => {
                let message;
                if(error.response){
                    message = error.response.data.error;
                }else{
                    message = error;
                }
                alert.empty().append("Delete token set with name:" + name + "  " +  message);
                $('#myAlert').modal();  
            })  
        },
        // watch the keyboard input, whether there is 'enter', if yes PUT the commands to the backend
        executeTerminal: function (id) {
            this.crt += event.keyCode + ',';
    
            let element = $('#' + id);
            let terminal = element.val();

            // if press 'ctr+c', DELETE the commands
            if (this.crt.substring(this.crt.length - 6) == '17,67,') {
                axios.delete(this.address + "/targets/" + id + "/command").then(response => {
                    terminal += 'This Terminal disconnected!' + response.data + '\n$ ';
                    element.val(terminal).scrollTop(element.prop('scrollHeight'));
                }).catch(error => {
                    terminal +='\n' +error + '\n$ ';
                    element.val(terminal).scrollTop(element.prop('scrollHeight'));
                })
            // if press 'enter', PUT the commands
            } else if (this.crt.substring(this.crt.length - 3) == '13,') {
                this.submitTerminal(id, terminal)
            }
        },
        // watch user input and filter the dropdown menu
        filterDevice: function () {
            var value = this.searchText.toLowerCase();
            this.tags.forEach(function (tag) { tag.tag.toLowerCase().indexOf(value) > -1 ? tag.isActive = true: tag.isActive = false; });
            this.fullDevices.forEach(d=>{ !(d.id.toLowerCase().indexOf(value) > -1) ? d.nameActive = false: d.nameActive = true; })
        },
        // click notification card item and filtering device
        filterDevices: function (para) {

            $('#searchTarget').empty();
            switch(para){
                case 'failed': 
                    this.devices = this.failed;
                    event.path[2].childNodes[2].style.background = '#ececec';
                    event.path[2].childNodes[3].style.background = '#ececec';

                    event.path[2].childNodes[4].style.background = '#fff';
                    event.path[2].childNodes[5].style.background = '#fff';
                    event.path[2].childNodes[0].style.background = '#fff';
                    event.path[2].childNodes[1].style.background = '#fff';
                    break;
                case 'success': 
                    this.devices = this.success;
                    event.path[2].childNodes[4].style.background = '#ececec';
                    event.path[2].childNodes[5].style.background = '#ececec';
                    event.path[2].childNodes[2].style.background = '#fff';
                    event.path[2].childNodes[3].style.background = '#fff';
                    event.path[2].childNodes[0].style.background = '#fff';
                    event.path[2].childNodes[1].style.background = '#fff';
                    break;
            }
            this.markers.clearLayers();
            this.devices.forEach(d=>{
                d.isActive = true;
                this.markers.addLayer(d.marker);
            });
            this.map.fitBounds(this.markers.getBounds())
        },
        // check one task finished time and calculate how many devices succeed or failed, return [finish time, [success,fail]]
        getFinishnStatus: function (id, total) {

            return axios.get(this.address+"/logs?task=" + id + "&perPage=1000&sortOrder=desc").then(response => {

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
        // check one task finished time
        getFinishTime: function (id) {
            return axios.get(this.address+"/logs?task=" + id + "&perPage=1&sortOrder=desc").then(response => {
                
                return response.data.items? response.data.items[0].time: "";
            }).catch(error => {
                console.log(error);
            })
        },
        // get all tasks
        getOrders: function () {
    
            axios.get(this.address+"/orders?sortOrder=desc").then(response => {
                for (let i = 0; i < response.data.total; i++) {

                    let a = response.data.items[i];
                    a.build ? a.build : (a.build = "");
                    a.deploy ? a.deploy : (a.deploy = "");
                    a.isActive = false;
                     
                    let date = new Date(a.createdAt);
                    let day = date.getDate() < 9 ? '0'+date.getDate().toString(): date.getDate();
                    let month = date.getMonth() < 9 ? '0'+(date.getMonth()+1).toString(): (date.getMonth() + 1 );
                    let minute = date.getMinutes() < 10 ? '0'+ date.getMinutes().toString(): date.getMinutes();

                    a.date = date.toUTCString().substring(5,11);
                    a.time = date.toUTCString().substring(17,22);
         
                    if (a.deploy) {
                        this.getFinishnStatus(a.id, a.deploy.match.list.length).then(data => {
                            a.finishedAt = data[0];
                            a.status = data[1];
                            this.orders.push(a);
                        });
                    } else {
                        this.getFinishTime(a.id).then(data => {
                            a.finishedAt = data;
                        });
                        a.status = [0, 0]
                        a.deploy = ""; 
                        this.orders.push(a);
                    }    
                }     
            });
        }, 
        // get all devices
        getTargets: function () {
            axios.get(this.address+"/targets").then(response => {
                //for each device
                for (let i = 0; i < response.data.total; i++) {

                    let a = response.data.items[i];
                    // to show the device card
                    a.isActive = true;
                    // to show relationship lines
                    a.relations = false;
                    // to show the device name in dropdown menu
                    a.nameActive = true;
                   
                    if (!a.location) {
                        a.location = { lon: rand(50.749523), 
                                       lat: rand(7.203923), }
                    }
                    let tags = "";
                    if (a.tags) {
                        for (let j = 0; j < a.tags.length; j++) {
                            tags += '<div class="badge badge-pill ' + a.tags[j] + '">' + a.tags[j] + '</div>';
                            // get distinct tags
                            if (!this.tags.some(e => e.tag === a.tags[j])) {
                                this.tags.push({
                                    'isActive': true,
                                    'tag': a.tags[j]
                                });
                            }
                        }
                    }

                    let icon ="";
                    // create a marker of this device
                    let marker = L.marker(L.latLng(a.location.lon, a.location.lat), {
                        'title': a.id,
                        'alt': a.tags ? a.tags : []
                    })
                    a.marker = marker;
                    // check tasks status and decide the marker icon, add to success or fail list
                    this.checkLogs(a.id).then(data => {
                        a.logs = data;                 
                        if(data.tasks[0][1] == true){
                            this.failed.push(a);
                            marker.setIcon(L.icon({
                                'iconUrl': "/error.png",
                                'iconSize': [20, 20]
                            }))
                        }else{
                            this.success.push(a); 
                            marker.setIcon(L.icon({
                                'iconUrl': "/done.png",
                                'iconSize': [20, 20]
                            }))
                        }
                        this.devices.push(a);
                        this.fullDevices.push(a);
                    }); 
                    //Markers click function
                    marker.bindPopup('<div>Name: ' + a.id + '</div><div>Tags: ' + tags + '</div>');
                    marker.on("click", event => {
                        marker.openPopup();
                        if(this.polyline) this.polyline.remove();
                        this.devices.splice(0,this.devices.length, a);       
                    });

                    this.markers.addLayer(marker);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        // get all tokens
        getTokens: function(){      
            axios.get(this.address + "/token_sets").then(response =>{
                for(let i =0; i<response.data.items.length; i++){
                    let a = response.data.items[i];
                    this.token.push({
                        'name': a.name,
                        'available': a.available,
                        'expiresAt': new Date(a.expiresAt).toLocaleString(),
                    })
                }
            })
        },
        // get all new discovered device
        handelNewDiscover: function (devices) {
           
                let a = devices;
                a.isActive = true;
                a.relations = true;
                  
                if (!a.location) {
                    a.location = {
                            lon: rand(50.749523),
                            lat: rand(7.203923),
                    }
                }
                let marker = L.marker(L.latLng(a.location.lon, a.location.lat), {
                    icon: L.icon({
                        'iconUrl': "/star.png",
                        'iconSize': [20, 20]
                    }),
                    'title': a.id,
                    'alt': a.tags ? a.tags : []
                });
                a.marker = marker;
                a.logs = {
                    'tasks':[['','none']],
                    'log':[],
                };
                this.newDiscover.push(a);
                let tags = "";
                if (a.tags) {
                    for (let j = 0; j < a.tags.length; j++) {
                        tags += '<div class="badge badge-pill ' + a.tags[j] + '">' + a.tags[j] + '</div>'
                        if (!this.tags.some(e => e.tag === a.tags[j])) {
                            this.tags.push({
                                    'isActive': true,
                                    'tag': a.tags[j]
                            });
                        }
                    }
                }
                marker.bindPopup('<div>Name: ' + a.id + '</div><div>Tags: ' + tags + '</div>');
                marker.on("click", event => {
                    marker.openPopup();
                    if(this.polyline) this.polyline.remove();
                    this.devices.splice(0,this.devices.length, a);
                });
                marker.on('dblclick', event =>{
                    if (!this.targetDevices.some(e => e.id === event.target.options.title)) {
                        this.targetDevices.push({
                            'id': event.target.options.title,
                            'tags': event.target.options.alt
                        });
                    }
                })
        },
        // hide the terminal and reset related variables
        hideTerminal: function (id) {
            event.path[4].childNodes[0].style.display = 'grid';
            event.path[4].childNodes[1].style.display = 'none';
            let close = true;
            let terminals = document.getElementsByClassName('myT');
            for(let i =0; i<terminals.length;i++){
               if(terminals[i].style.display!='none'){
                   close = false;
                   break;
               }
            } 
            if (close && this.ws){
                this.ws.close();
                this.ws = "";
            }
            $('#' + id).val('$ ');
            this.crt='';
        },
        // hide the edit form
        hideEdit: function (e) {
            e.path[5].childNodes[0].style.display = 'grid';
            e.path[5].childNodes[2].style.display = 'none';
        },
        // click the right button on timeline, disable it when the latest task is shown
        next: function () {
            if(this.offset > 0){
                this.$refs.pre.disabled=false;
                this.offset -= 100;
                this.$refs.timeline_lis.style.transform = 'translateX('+ this.offset +'px)'; 
                this.$refs.timeline_lis.style.transition = 'all .6s'; 
            }else{
                this.offset <= 0? this.$refs.next.disabled = true: this.$refs.pre.disabled = true;
            }   
        },
        // click the left button on timeline, disable it when the oldest task is shown
        previous: function () {
           
            if(this.$refs.timeline_lis.offsetWidth-this.offset > (this.map.getSize().x - 20)){
                this.offset += 100;
                this.$refs.timeline_lis.style.transform = 'translateX('+ this.offset +'px)';
                this.$refs.timeline_lis.style.transition = 'all .6s'; 
                this.$refs.next.disabled=false
            }else{
                this.offset >= 0? this.$refs.pre.disabled = true : this.$refs.next.disabled = true;       
            }  
        },
        // request new tokens, generate the dialog content HTML to show the new tokens
        postToken: function () {

            axios.post(this.address + '/token_sets?total=' + this.tokenSize + '&name='+this.tokenName).then(response=>{            
                let a = response.data;
                // generate the dialog content HTML to show the new tokens          
                let str = '<h6>This view will be unaccesable after you close this modal!</h6><div class="myToken">' + '<div class="mycard-title">Name:</div><div class="mycard-content">'+ a.name + '</div>';
                str += '<div class="mycard-title">Size:</div><div class="mycard-content">'+ a.available + '</div>';
                str += '<div class="mycard-title">Expires Time:</div><div class="mycard-content">'+ new Date(a.expiresAt).toLocaleString() + '</div>';
                str += '<div class="mycard-title">Tokens:</div><div class="mycard-content">';
                a.tokens.forEach(t =>{
                    str += t + '<br>'
                });
                str += '</div></div>';
                $('#mymessage-body').empty().append(str);
                $('#myMessage').modal();
            }).catch(error=>{
                let message;
                let alert = $('#mymodal-body');
                if(error.response){
                    message = error.response.data.error;
                }else{
                    message = error;
                }
                alert.empty().append("Get new tokens error:  " + message);
                $('#myAlert').modal();
            })
        }, 
        // remove the device from the target list(update device)
        removeDevice: function (name) {
             let childrens = $("#searchTarget2").children();
            for (var i = 0; i < this.targetDevices.length; i++) {
                if (this.targetDevices[i].id === name) this.targetDevices.splice(i, 1);
            }
            for(let j =0; j<childrens.length; j++){
                 if(childrens[j].innerHTML==name){
                    childrens[j].remove();
                } 
            }
            if(this.targetDevices.length==0){
                childrens.remove();
            }
        }, 
        // refresh full device list and recalculate the success and failure
        refresh: function () {
            $('#searchTarget').empty(); 
            this.devices=[];
            this.fullDevices=[];
            this.failed=[];
            this.success=[];
            this.newDiscover=[];
            this.markers.clearLayers();
            this.getTargets();
        },
        // request the debug logs of one task(needed when 'debug' option was unchecked during a deployment creation)
        requestLogs:function(){

             let id= event.target.value;
             let alert = $('#mymodal-body'), message=$('#mymessage-body');
             alert.empty();
             message.empty();

             axios.put(this.address+"/targets/" +id +"/logs").then(response=>{
                    $('#myMessage').css('z-index',2000).modal();
                    message.append("Request Logs of target with " + id + "  " + response.statusText);
 
             }).catch(error =>{
                let message;
                if(error.response){
                    message = error.response.data.error;
                }else{
                    message = error;
                }
                alert.empty().append("Request Logs of target with " + id + "  " + message);
                $('#myAlert').css('z-index',2000).modal();
             })
        },
        // search devices under device list
        searchTarget: function () {
            var tagsNodes = document.getElementById("searchTarget").childNodes;
            //console.log(tagsNodes);
            this.devices = this.fullDevices;
            this.devices.forEach( d=>{
                for (var i = 0; i < tagsNodes.length; i++) {         
                    if (tagsNodes[i].style.display != "none") {
                        if ((d.tags && d.tags.some(e => e == tagsNodes[i].innerHTML)) || d.id == tagsNodes[i].innerHTML ) {                 
                            d.isActive = true;
                            break;
                        }  else {
                            d.isActive = false;
                        }         
                    }
                }
            })   
        },
        // search devices under update device
        searchTarget2: function () {
            this.targetDevices=[];
            var tagsNodes = document.getElementById("searchTarget2").childNodes;
            for (var i = 0; i < tagsNodes.length; i++) {
                if (tagsNodes[i].style.display != "none") {
                    for (var j = 0; j < this.fullDevices.length; j++) {
                        //console.log(this.devices)
                        if ((this.fullDevices[j].tags && this.fullDevices[j].tags.some(e => e == tagsNodes[i].innerHTML)) || this.fullDevices[j].id == tagsNodes[i].innerHTML) {
                            if (!this.targetDevices.some(e => e.id === this.fullDevices[j].id)) {
                                this.targetDevices.push({
                                    id: this.fullDevices[j].id,
                                    tags: this.fullDevices[j].tags
                                });
                            }
                        }
                    }
                }
            }
        },
        // click device name or tag in dropdown menu under device list
        selectItem: function (tag) {
            this.searchText="";
            var badge = this.createBadge(tag);
            document.getElementById("searchTarget").appendChild(badge);
            this.searchTarget();
        },
        // click device name or tag in dropdown menu under update device
        selectItem2: function (tag) {
            this.searchText2="";
            var badge = this.createBadge(tag);
            document.getElementById("searchTarget2").appendChild(badge);
            this.searchTarget2();
        },
        // show edit form
        showEditForm: function (device) {
            event.path[3].style.display = 'none';
            event.path[4].childNodes[2].style.display = 'inline';
            event.path[4].childNodes[2].childNodes[0].childNodes[2].childNodes[0].value= device.id;
            if(device.tags){
                device.tags.forEach(item => {
                    let tag = event.path[4].childNodes[2].childNodes[0].childNodes[5];
                    Array.from(tag.getElementsByTagName('label')).forEach(el => {
                        if(el.childNodes[0].value == item){
                            el.childNodes[0].checked = "true"
                            el.setAttribute('class','btn btn-light active');
                        }
                    })
                })
            }
            event.path[4].childNodes[2].childNodes[0].childNodes[8].childNodes[0].value= [device.location.lon,device.location.lat];
        },
        // show logs dialog modal 
        showLog: function (log,id,name) {

            $("#logTitle").empty().append('Task: '+ id + '<br>Device: ' + name).next()[0].value = name;
            
            $('#accordionLog button span').remove();
            $('#accordionLog button').append('<span class="spinner-border spinner-border-sm text-primary" role="status" style="margin-left:10px"><span class="sr-only"></span></span>');
            this.appendLogs(log,id);

            let protocol = '';
            this.address.indexOf('https') > -1? protocol = 'wss://' : protocol = 'ws://';
            // open socket to get new logs sending back when the deployment is running
            let ws =  new WebSocket(protocol + this.address.substring(7) + "/events?topics=logs&task=" + id + "target=" + name );

            ws.onopen = function () { console.log("Socket connected.") };
            ws.onmessage = event => {
                let obj = JSON.parse(event.data);
                this.appendLog(obj.payload,id);                
            };
            ws.onclose = function () {
                console.log("Socket disconnected.");
                $("#mylog").prepend("<p>WebSocket Disconnected!</p>");
            };        
            $("#myLog").modal();
        },       
        // show device card and markers of new discovered devices
        showNewDevices: function () {
            
            event.path[2].childNodes[0].style.background = '#ececec';
            event.path[2].childNodes[1].style.background = '#ececec';
            event.path[2].childNodes[2].style.background = '#fff';
            event.path[2].childNodes[3].style.background = '#fff';
            event.path[2].childNodes[4].style.background = '#fff';
            event.path[2].childNodes[5].style.background = '#fff';
          
            this.devices = this.newDiscover;
            this.newDiscover = [];
            this.markers.clearLayers();
            this.devices.forEach(item=>{
                this.markers.addLayer(item.marker)
            })
        },
        // show relationship lines on the map
        showRelationship: function (tag, device) {
            device.marker.openPopup();
            let latlngs = [];
            this.devices.forEach(function (target) {
                if (target.tags && target.tags.some(el => el == tag)) {
                    latlngs.push([[target.location.lon, target.location.lat],
                                  [device.location.lon, device.location.lat]])
                }
            });
            let color;
            // chose the line color based on the tag, the tags are hard-coded
            switch (tag) {
                    case 'amd64':
                        color = "#376b6d";
                        break;
                    case 'raspi0':
                        color = "#42602d";
                        break;
                    case 'darwin':
                        color = "#f17c67";
                        break;
                    case 'linux':
                        color = "#b54434";
                        break;
                    case 'builder':
                        color = "#cc543a";
                        break;
                    case 'raspi2':
                        color = "#58b2dc";
                        break;
                    case 'arm32':
                        color = "#0d5661";
                        break;
                    case 'actuator':
                        color = "#36563c";
                        break;
                    case 'sensor':
                        color = "#516E41";
                        break;
                    case 'light':
                        color = '#7048ce';
                        break;
                    case 'motion':
                        color = "#9f50d4";
                        break;
                     case 'drone':
                        color = "#e4c200";
                        break;
                     case 'swarm':
                        color = "#06aa00";
                        break;
                }
            
            if(this.polyline) this.polyline.remove();
            this.polyline = L.polyline(latlngs,{ 'color': color,
                                                 'weight': 2,     })
            this.polyline.addTo(this.map);
            this.map.fitBounds(this.polyline.getBounds());
        },
        // show terminal interface
        showTerminal: function (e) {
            e.path[3].style.display = 'none';
            e.path[4].childNodes[1].style.display = 'inline';

            if(!this.ws){
                let protocol = '';
                this.address.indexOf('https') > -1? protocol = 'wss://' : protocol = 'ws://';
                this.ws = new WebSocket(protocol + this.address.substring(7) + "/events?topics=logs&task=terminal");
            } 
        },
        // submit the edit form of one device
        submitEdit: function (id) {

            let d = this.devices.find(i=> {return i.id == id});
            let input= event.path[2].getElementsByTagName('input');
            // update settings 
            let myUpdate = {
                id: input[0].value,
                tags:[],
                location: {
                        lon: parseFloat(input[input.length-1].value.split(',')[0]),
                        lat: parseFloat(input[input.length-1].value.split(',')[1])
                },
            }
            if(d.publicKey) myUpdate.publicKey = d.publicKey; 
            Array.from(input).forEach(item =>{
                if(item.checked){
                    myUpdate.tags.push(item.value)
                }
            });
            let alert = $('#mymodal-body'), message = $('#mymessage-body');
            alert.empty();
            message.empty();
            
            event.path[4].childNodes[0].style.display = 'grid';
            event.path[4].childNodes[2].style.display = 'none';
            axios.put(this.address+"/targets/" +id, myUpdate).then(response=>{

                    let i = this.devices.findIndex(el =>el.id == id);

                    this.devices[i].marker.setLatLng(L.latLng(myUpdate.location.lon, myUpdate.location.lat));
                    this.devices[i].marker.title = myUpdate.id;
                    this.devices[i].marker.alt = myUpdate.tags;
                    this.$set(this.devices[i], 'id', myUpdate.id);
                    this.$set(this.devices[i], 'tags', myUpdate.tags);
                    this.$set(this.devices[i], 'location', myUpdate.location);
                    this.map.panTo(this.devices[i].marker.getLatLng());
                    $('#myMessage').modal();
                    message.append("Update target with " + id + "  " + response.statusText);
                }
            ).catch(error => {
                let message;
                if(error.response){
                    message = error.response.data.error;
                }else{
                    message = error;
                }
                alert.empty().append("Update target with " + id + "  " + message);
                $('#myAlert').modal();       
            }); 
        },
        // PUT commands to backend
        submitTerminal: function (id,terminal) {

            let commands = terminal.split("\n");
            let command = {
                command: commands[commands.length - 1].substring(2)
            }
            let element = $('#'+id);
            element.keypress(function (e) { // suppress enter keypress
                if (e.keyCode == 13) e.preventDefault();
            });
            // if there is commands
            if(command.command){
                terminal += '\n';
                axios.put(this.address + "/targets/" + id + "/command", command).then(response => {
                    
                    element.val(terminal).scrollTop(element.prop('scrollHeight')); // wait for events
                
                }).catch(error => {
                    terminal += '\n'+ error.response.data.error +'\n$ '
                    element.val(termina).scrollTop(element.prop('scrollHeight'));
                })
            // if user just press 'enter'
            } else {
                element.val( terminal +'\n$ ');
            }
            // handle the output
            this.ws.onmessage = event => {             
                var obj = JSON.parse(event.data);
                obj.payload.forEach(l => { 
                    if(l.target == id){
                        if(l.output == "EXEC-END"){
                            terminal += '$ ';
                        }
                        else if(l.output != "EXEC-START"){
                            terminal += l.output + '\n';
                        }
                    } 
                });
                // update the terminal view
                element.val(terminal).scrollTop(element.prop('scrollHeight'));
            };
        },
    },
    mounted() {

        this.$refs.map.style.height = window.innerHeight + "px";
        this.$refs.list.style.height = window.innerHeight-32-32-32-27-34-20 + "px";
        this.$refs.collapseTwo.style.height = window.innerHeight-32-32-32-34-5 + "px";
        this.$refs.collapseThree.style.height = window.innerHeight-32-32-32-34-5 + "px";  

        this.address = localStorage.getItem('address');
        
        this.map = L.map("map").setView([45.749523, 18.20343],5);
        this.$refs.myTimeline.style.width = this.map.getSize().x - 20 +'px';
        
        //Custermize the markerCluster style
        var i =0;
        this.markers = L.markerClusterGroup({
            spiderLegPolylineOptions: {
                weight: 1,
                color: "#222",
                opacity: 0.1
            },
            iconCreateFunction: function (cluster) {
                let childCount = cluster.getChildCount();
                let childs = cluster.getAllChildMarkers();
                let name='';
                
                if(childs.some(c=> {return c.options.icon.options.iconUrl =='/error.png'})){
                    name ='myCluster-e';
                }else{
                    name = 'myCluster';
                }         
                return L.divIcon({
                    'html': "<div><span>" + childCount + "</span></div>",
                    'className':name,
                    'iconSize': new L.Point(40, 40)
                });
            }
        });
        this.getTargets();
        this.getOrders();
        this.getTokens();

        let protocol = '';
        this.address.indexOf('https') > -1? protocol = 'wss://' : protocol = 'ws://';

        // open socket to get new discovered device information
        let ws = new WebSocket(protocol + this.address.substring(7) + "/events?topics=targetAdded");
        ws.onopen = function () { console.log("Socket connected.") };
        ws.onmessage = event => {
            let obj = JSON.parse(event.data);
            this.handelNewDiscover(obj.payload);
            console.log("new device!")
        };
        ws.onclose = function () {
            console.log("Socket disconnected.");
            $("#mylog").prepend("<p>WebSocket Disconnected!</p>");
        };

        L.tileLayer( "https://api.mapbox.com/styles/v1/jingyan/cj51kol9z1fnm2rmy82k24hqm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamluZ3lhbiIsImEiOiJjajN5dDU5bXUwMDhwMzNwanBxeGZoZDZrIn0.-5_CMLp6GDZYhe-7Ra_w_g",
            {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
        ).addTo(this.map);
    
        this.map.addLayer(this.markers); 

        $('#collapseTwo').on('show.bs.collapse', ()=> {
            this.markers.on('clusterclick', a =>{
                a.layer.getAllChildMarkers().forEach(m =>{
                    if (!(this.targetDevices.some(e => e.id == m.options.title))) {
                        this.targetDevices.push({
                            'id': m.options.title,
                            'tags': m.options.alt
                        });
                    }
                })
            })
            this.fullDevices.forEach(d =>{
                d.marker.on('dblclick', event =>{
                    if (!this.targetDevices.some(e => e.id === event.target.options.title)) {
                        this.targetDevices.push({
                            'id': event.target.options.title,
                            'tags': event.target.options.alt
                        });
                    }
                })
            })
        })     
    },
    updated(){
        $('[data-toggle="popover"]').popover(); 
        this.markers.refreshClusters(); 
    }
};
</script>

<style>
.mappanelContainer {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
.myTimeline{
    position: absolute;
    bottom: 0;
    right: 5px;
    z-index: 1000;
    background-color: #ffffff96;
    border-radius: 5px
}
.myTimeline button{
    width: 20px;
    height: 20px;
    position: relative;
    float: left;
    top: 25px;
    border-radius: 50%;
    color: rgb(44, 62, 80);
    border: 2px solid rgb(44, 62, 80);
}
.myTimeline button span{
    font-size: 9px;
    position: relative;
    top: -8px;
}
.timeline-li{
    height: 68px;
    padding-top: 5px;
    font-size: 14px;
    list-style: none;
    width: 100px;
    float: left;
    cursor: pointer;
}
.timeline-li:focus, .timeline-li:active{
    border: 1px solid #00000033;
    border-radius: 5px;
    background-color: #ffffff;
    outline: none;
}
.notification{
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1000;
    display:grid;
    grid-template-columns: 6fr 1fr;
    padding: 2.5px 5px;
    background-color: #fff;
    box-shadow: 2px 2px 2px #52575b50;
}
.notification button{
    padding: 0 2px
}
.notification img{
    width: 15px
}
.mycollapse{
    display: grid;
    grid-template-columns: 150px 1fr 1fr;
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
    text-align: left;
}
#updateTags {
  display: grid;
  grid-template-columns: 1fr 4.5fr;
  grid-gap: 2.5px;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding: 5px 2.5px;
}
#updateTags label, .updateDevice label{
    font-size: 13px; 
    padding: 0 5px;
    margin:2.5px
}
.updateDevice {
  display: grid;
  grid-template-columns: 1fr 4.5fr;
  grid-gap: 2.5px;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding: 5px 2.5px;
  margin-bottom: 5px;
}
.history_li{
    color: #8e8e8e;
    width: 20px;
    font-size: 12px;
    position: relative;
    float: left;
    text-align: center;
    cursor: pointer;
    list-style: none;
    height: 10px;
}
.mycard {
  display: grid;
  grid-template-columns: 1fr 3.3fr;
  padding: 2.5px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 2px;
}
.mycard:active{
  border: 1px solid #007bff;
  border-radius: 2px;
}
.mycard-title {
  text-align: right;
  font-size: 14px;
  padding-right:5px
}
.mycard-content {
  text-align: left;
  font-size: 13px;
}
.myHeading{
  padding: 0;
  width: 100%
}
.amd64{
    background-color: #376b6d;
}
.raspi0{
    background-color: #42602d;
}
.sensor{
    background-color: #516E41;
}
.light{
    background-color: #7048ce;
}
.motion{
    background-color: #9f50d4;
}
.actuator{
    background-color: #36563c;
}
.arm32{
    background-color: #0d5661;
}
.raspi2{
    background-color: #58b2dc;
}
.builder{
    background-color: #cc543a;
}
.linux{
    background-color: #b54434;
}
.darwin{
    background-color: #f17c67;
}
.drone{
    background-color: #e4c200;
}
.swarm{
    background-color: #06aa00;
}
.raspi0, .amd64, .darwin, .arm32, .builder, .linux, .actuator,.sensor, .raspi2,.light,.motion,.drone,.swarm{
    color: #fff;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.raspi0:hover, .amd64:hover, .darwin:hover, .arm32:hover, .builder:hover, .linux:hover, .actuator:hover,.sensor:hover, .raspi2:hover, .light:hover,.motion:hover,.drone:hover,.swarm:hover{
    cursor: pointer;
}
.myTerminal{
  background-color: black;
  color: white;
  font: 11.5px Inconsolata, monospace;
  text-shadow: 0 0 5px #C8C8C8;
}
#newToken{
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 2.5px;
}
.myToken{
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 2.5px;
    border: 1px solid #c4c4c4;
}
@media (min-width: 576px){
    #myLog-dialog{
        max-width:110% !important;
    }
}
</style>


