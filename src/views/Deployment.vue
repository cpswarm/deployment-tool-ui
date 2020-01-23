<template>
  <div class="mappanelContainer">
    <div class="panel">
        <div id="title">
            <h5 draggable="true" style="display: inline-block; margin:5px">Deployment Management</h5>
        </div>
        <div class="accordion" id="accordionExample" style="width:100%;padding:2.5px">
             <!-- add new deployment panel -->
             <div class="card">
                    <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseThree"
                        aria-expanded="false" aria-controls="collapseThree" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500" title="Open the panel to create new deployment task">
                        <img src="../assets/add.png" style="height:20px">
                        Add New Deployment
                    </button>
                <div id="collapseThree"  class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample" style="overflow:auto">
                    <div class="card-body" style="padding:7.5px" ref="collapseThree">
                        <h6 style="text-align:left">
                            <button type="button" class="btn btn-primary btn-sm" style="padding: 0 4px" data-toggle="collapse"
                                data-target="#collapseOne" title="Go back deployments list and duplicate one">Duplicate
                            </button>
                            <button type="button" class="btn btn-primary btn-sm" style="padding: 0 4px;position:relative;float:right;font-size:14px" title="Click to view this configuration in .yaml" @click="showYaml">Yaml
                            </button>
                        </h6>
                        <form id="newDeployment">
                            <div class="mycard-title" >Description:</div>
                            <div class="mycard-content">
                                <textarea v-model="deployDes" class="form-control form-control-sm" rows="3" style="padding:0 3px;"></textarea>
                            </div>
                            <div class="mycard-title" >Source:</div>
                            <div>
                               <div class="input-group mycard-content">
                                    <select class="mySelect" v-model="typeSource" @change="chooseSource">
                                            <option value="0">Choose...</option>
                                            <option value="1">From Artifacts</option>
                                            <option value="2">Upload Directory</option>         
                                    </select> 
                                    <div class="input-group-append" style="width:63%">
                                        <!-- if type source is 'no source',this is shown by default -->
                                        <input ref="emptySource" type="text" class="form-control form-control-sm"  style="height:26px;font-size:14px;border-radius: 0 .25rem .25rem 0;" disabled>
                                        <!-- if type source is 'from artifacts' -->
                                        <input ref="sourceOrder" type="text" class="form-control dropdown-toggle form-control-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterOrder(sourceOrder)" style="height:26px;font-size:14px;border-radius: 0 .25rem .25rem 0;display:none" v-model="sourceOrder">
                                        <div class="dropdown-menu" style="padding:2.5px;max-height:400px;overflow:auto">
                                            <p class="dropdown-header" style="padding:2px 5px"> <strong> Names:</strong> </p>
                                            <a v-for="order in orders" class="dropdown-item" v-show="order.nameActive" @click="selectArtifacts(order.id)" style="font-size:14px;padding:0 15px">{{order.id}}</a>
                                        </div>
                                        <!-- if type source is 'upload file' -->
                                        <div ref="custom_file" class="custom-file" style="height:26px; display:none">
                                            
                                            <input type="file" class="custom-file-input" id="customFile" multiple webkitdirectory @change="handleFileSelect">
                                            <label id="mySourcelabel" style="width:180px" class="custom-file-label" for="customFile">Choose file</label>
                                        
                                            <button type="button" id="btList" disabled class="btn btn-primary" style="padding: 0 4px;" data-toggle="modal"  data-target="#myList">List</button>
                                        </div>
                                    </div>
                                </div>
                                <p id="mySourcepath" class="mycard-content" style="margin:0"></p>       
                            </div>
                            <div class="mycard-title" >Debug:</div>
                            <div class="mycard-content">
                                <div class="form-check input-group">
                                    <input v-model="deployDebug" type="checkbox" class="form-check-input">
                                </div>
                            </div>
                            <div class="mycard-title" >Build:</div>
                            <div class="mycard-content" >
                                <div ref="build">
                                    <div style="display:none">(Disabled)</div>
                                    <div>
                                        <div class="myfont_t">commands:</div>
                                        <editor ref="editor_build_c" v-model="build_c" @init="editorInit" lang="golang"
                                            theme="github" width="100%" height="80"></editor>
                                  
                                        <div class="myfont_t">artifacts:</div>
                                        <editor ref="editor_build_a" v-model="build_a" @init="editorInit" lang="golang"
                                            theme="github" width="100%" height="80"></editor>
                                    
                                        <div class="input-group">
                                            <label class="myfont_t" style="padding: 7.5px 0;margin-bottom: 0;">host:</label>
                                            <input ref="hostInput" type="text" v-model="host" class="dropdown-toggle form-control form-control-sm"
                                                style="border-radius: .2rem; height:22px;margin: 5px 0" data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false" @keyup="filterHost">
                                            <div class="dropdown-menu" style="padding:2.5px">
                                            <a v-for="device in fullDevices" class="dropdown-item" v-show="device.hostActive"
                                                @click=" host = device.id " style="font-size:14px;padding:0 15px">{{device.id}}</a>
                                        </div>
                                    </div>
                                    </div> 
                                </div>
                            </div>
                            <div class="mycard-title" >Install:</div>
                            <div class="mycard-content" >
                                <div>
                                    <div class="myfont_t">commands:</div>
                                    <editor ref="editor_install_c" v-model="install_c" @init="editorInit" lang="golang"
                                        theme="github" width="100%" height="80"></editor>
                                </div>
                            </div>
                            <div class="mycard-title" >Run:</div>
                            <div class="mycard-content">
                                <div>
                                    <div class="myfont_t">commands:</div>
                                    <editor ref="editor_run_c" v-model="run_c" @init="editorInit" lang="golang" theme="github"
                                        width="100%" height="80"></editor>
                                </div>
                            </div>
                            <div class="mycard-title" >Target:</div>
                            <div class="mycard-content" style="font-size:13px">
                               (CLICK cluster or DOUBLE CLICK marker to select Target.)
                            </div>
                            <div class="mycard-content" style="grid-column: 1/3; border: 1px solid grey;border-style:dashed">
                                <!-- search devices -->
                                <form class="form-inline">
                                    <div class="input-group" style="width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                        <div id="searchTarget"></div>
                                        <input class="dropdown-toggle form-control form-control-sm" type="text" v-model="targetText"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterTarget"
                                            style="font-size: 14px;height: 26px;padding: 5px; border:none" :placeholder="'Search'">
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
                                <div style="height:350px;overflow: auto">
                                    <!-- device card shown as targeting device -->
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
                            </div>
                            <div style="text-align:left;margin:10px 0">
                                <button class="btn btn-danger" @click="clearForm" type="button" style="font-size:14px;padding: 2.5px 5px">Clear</button></div> 
                            <div style="text-align:right;margin-top:10px">
                                   <button class="btn btn-primary" @click="submitDeploy" type="button" style="font-size:14px;padding: 2.5px 5px;">Deploy</button>
                            </div>
                        </form>
                        <!-- show deployment configuration in yaml -->
                        <div ref="deployYaml" v-if="myYaml.show">
                            <textarea v-model="myYaml.y"  cols="30" rows="23" class="form-control" style="font-size:14px"></textarea>
                            <div style="text-align:left;margin:10px 0">
                                <button class="btn btn-danger" @click="clearForm" type="button" style="font-size:14px;padding: 2.5px 5px">Clear</button>
                                <button class="btn btn-primary" @click="submitDeploy" type="button" style="font-size:14px;padding: 2.5px 5px;position:relative; float: right">Deploy</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <!--  deployment list panel -->
            <div class="card">       
                  <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="false" aria-controls="collapseOne" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500" title="Open deployments list">
                            <img src="../assets/device.png" style="width:18px">
                            Deployment List
                    </button>        
                <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice" data-parent="#accordionExample" >
                    <div style="padding:5px;" >
                    <!-- deployment filter -->
                    <form class="form-inline" style="margin-bottom:5px"> 
                        <button type="button" class="btn" style="padding: 0 5px;border: 1px solid;margin: 0 5px 0 0;" @click="refresh" title="Refresh deployments list">
                            <img src="../assets/refresh.svg" style="width:14px">
                        </button>
                        <div class="input-group" style="width:92%">
                             <div id="searchOrder"></div>
                            <input class="dropdown-toggle form-control form-control-sm" v-model="orderSearchT" type="text"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterOrder(orderSearchT)"
                                style="font-size: 14px;height: 26px;padding: 5px;" :placeholder="'Search'">
                            <div class="input-group-append">
                                <a class="btn btn-outline-secondary" style="padding:0 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;" @click="searchDes">
                                    <img src="../assets/search.png" style="height:20px">
                                </a>
                            </div>
                            <div class="dropdown-menu" style="padding:2.5px; max-height:550px;overflow:auto">
                                <p class="dropdown-header" style="padding:2px 5px"> You can also search by description!</p>   
                                <div class="dropdown-divider"></div>
                             <p class="dropdown-header" style="padding:2px 5px"> <strong> Names:</strong> </p>
                               <a v-for="order in orders" class="dropdown-item" v-show="order.nameActive" @click="selectOrder(order.id)" style="font-size:14px;padding:0 15px">{{order.id}}</a>
                            </div>
                        </div>
                    </form>
                        <div id="deploymentList" ref="list" style="overflow:auto">
                            <!-- deployment card -->
                            <div v-for="order in orderOrders"   v-show="order.cardActive" :key="order.id" @click="clickCard(order)">
                                <div class="mycard card-body" style="padding:5px;margin-bottom:5px">
                                    <div class="mycard-title">Name:</div>
                                    <div class="mycard-content">{{order.id}}</div>
                                    <div class="mycard-title">Description:</div>
                                    <div class="mycard-content">{{order.description}}</div>
                                    <div class="mycard-title">Devices:</div>
                                    <div class="mycard-content">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="listen3(order.id,false, order.deploy.match.list,order.build.host)" title="Click to review status daigram">
                                        <img src="../assets/done.png" style="width:14px"> <p style="color:#00AE31;display:inline-block;padding: 0 5px;margin:0">{{order.status[0]}}</p>
                                        <img src="../assets/error.png" style="width:14px"> <p style="color:#D80027;display:inline-block;padding: 0 5px;margin:0">{{order.status[1]}}</p>
                                    </button>
                                </div>
                                <div class="mycard-title">Created Time:</div>
                                <div class="mycard-content">{{new Date(order.createdAt).toLocaleString()}}</div>
                                <div class="mycard-title">Finished Time:</div>
                                <div class="mycard-content">{{new Date(order.finishedAt).toLocaleString()}}</div>
                                <div class="mycard-title">Commands:</div>
                                <div class="mycard-content">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px;" @click="order.isActive? order.isActive= false: order.isActive=true" title="Check this deployment configuration" >
                                        <img src="../assets/search.png" style="width:14px">
                                    </button>
                                </div>
                                <!-- deployment configuration commands, by default it is hidden -->
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
                                     <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px;font-size: 18px;height: 25px;" @click="stopOrder(order)" title="Stop this task">
                                       &#9724;
                                    </button>   
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="duplicateOrder(order)" title = "Duplicate this task">
                                        <img src="../assets/duplicate.png" style="width:16px">
                                    </button>
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="deleteOrder(order)" title="Delete this task">
                                        <img src="../assets/delete.png" style="height:16px">
                                    </button>
                                </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
    <div id="map" ref="map"></div>
    <!-- error response dialog -->
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
    <!-- successful response dialog -->
    <div id="myMessage" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog alert alert-success" role="document" style="width:150%">
                <div class="modal-content" >
                    <div class="modal-header">
                    <h5 class="modal-title">Message</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="mymessage-body" class="modal-body" style="text-align:left"></div>
            </div>
        </div>
    </div>
    <!-- list dialog (e.g. uploaded files) -->
    <div id="myList" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-lg alert alert-success" role="document" style="width:150%">
                <div class="modal-content" >
                    <div class="modal-header">
                    <h5 class="modal-title">List</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="text-align:left"></div>
            </div>
        </div>
    </div>
    <!-- deployment progress status dialog modal -->
    <div id="myTree" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div id="myTree_dialog" class="modal-dialog" role="document" style="margin: 50px 100px;">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 id="treeTitle" class="modal-title" style="text-align:left; margin-right:45%">Process Diagram</h5>
                    <button id="editBtn" type="button" class="btn btn-light" style="padding: 0 4px; margin-right:5px" @click="goBackDeployment" title="Go back to new deployment form and edit this configuration">&#9998; Edit 
                    </button> 
                    <button type="button" class="btn btn-light" style="padding: 0 4px" data-dismiss="modal" aria-label="Close" @click="closeModal">
                        <span aria-hidden="true">&#10006; Close</span>
                    </button>
                </div>
                <div id="mytree-body" class="modal-body">
                    <div>
                        <img src="../assets/back.png" style="height:450px;width:130px">
                        <!-- background, main branch -->
                        <svg id="myTree_p" width="250" height="500">
                            <g transform="translate(-15, 50)">
                                <g class="links"></g>
                                <g class="nodes"></g>
                            </g>
                        </svg>
                        <!-- error background -->
                        <svg id="myTree_e" width="300" height="500" style="position:relative; top: -500px; left:85px">
                            <g transform="translate(0, 50)">
                                <g class="nodes"></g>
                            </g>
                        </svg>
                        <!-- devices nodes -->
                        <svg id="myTree_b" width="300" height="500" style="position:relative; top: -1000px;left:85px">
                            <g></g>
                        </svg>
                    </div>
                    <div style="text-align:left">
                        <strong>Logs: </strong>  
                       <div id="mylog" style="text-align:left; height:1000px; overflow: auto" class="myfont_c"></div>
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
        <button ref="next" disabled class="btn btn-sm btn-light" style="float: right" @click="next">
            <span style="left: -4px">&#9658;</span>
        </button>
        <div style="height:70px; overflow:hidden">
            <hr style="border: 1.5px solid #2c3e50;margin-top: 35px;">
                <div id="timeline_lis" ref="timeline_lis" style="position: relative;top:-54px;width:max-content;float:right">
                    <li v-for="order in orderOrders.slice().reverse()" class="timeline-li" @click="clickDeployment(order.id)" tabindex="0" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="top" data-html="true" :data-content="'Name: '+ order.id.substring(0,26) + '...<br>'+ 'Description: ' + order.description">
                    <div><strong style="margin-right:5px">{{order.date}}</strong>{{order.time}}</div>
                    <div v-if="order.status">
                        <img v-if="order.status[1]==0&&order.status[0]!=0" src="../assets/done.png" style="width:22px;background-color: #fff; border-radius: 50%" title="Click to check related devices and its deployment card">  
                        <img v-else src="../assets/error.png" style="width:22px;background-color: #fff; border-radius: 50%" title="Click to check related devices and its deployment card">              
                    </div>
               
                    </li> 
                </div>
            </div>
    </div> 
    <!--  notification card -->
    <div class="notification"> 
            <div class="mycard-title" style="color:#ffda44;" >Discovered:
                <img src="../assets/star.png">
            </div>
            <div class="mycard-content">
                <button type="button" class="btn btn-light btn-sm" style="color:#ffda44" @click="toDevices('new')" title="Click to check new discovered devices list"> {{this.newDiscover.length}}</button>
            </div> 
            <div class="mycard-title" style="color:#d80027">Failed:
                <img src="../assets/error.png">
            </div>
            <div class="mycard-content">
                <button type="button" class="btn btn-light btn-sm" style="color:#d80027" @click="toDevices('failed')" title="Click to check failed devices list">{{this.failed.length}}</button>
                </div>
            <div class="mycard-title" style="color:#00ae31">Successful:
                 <img src="../assets/done.png">
            </div>
            <div class="mycard-content" >
                <button type="button" class="btn btn-light btn-sm" style="color:#00ae31" @click="toDevices('success')"  title="Click to check success devices list">{{this.success.length}} </button>
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
import CRC32 from 'crc-32';





// Generate fake latitude and logitude
function rand(n) {
    let max = n + 0.001;
    let min = n - 0.001;
    return Math.random() * (max - min) + min;
}

export default {
    data() {
        return {
            //deployment configuration in yaml
            myYaml: {
                show: false,
                y: "",
            },
            typeSource: "0",  // deployment source type: 0 no source, 1 from artifacts, 2 upload files
            sourceOrder: "",  // artifacts id when source type is 1
            offset: 0,    // offset to enable the pagination button
            address: "",  // server address
            map: "",
            ws: "",       // websocket
            orderSearchT: "",  // searching keyword of deployment list
            deployDes: "",  // deployment description
            deployDebug: true, // deployment debug option
            source: "",    // zipped source file when source type is 2
            build_c: "",   // deployment build commands
            build_a: "",   // deployment build artifact
            install_c: "", // deployment install commands
            run_c: "",   // deployment run commands
            targetText: "", // target searching keywords
            targetDevices: [], // deployment target devices(creation)
            fullDevices: [],  // full device list get from database, cannot be changed
            tags: [],       // the distinct tags of all devices, for filtering
            orders: [],   // deployment list
            markers: [],  // device markers/marker clusters on the map
            failed: [],   // fail device list
            success: [],  // success device list
            newDiscover: [],  // newDiscover device list
            host: "",      // deployment build host
            targets: "",  // deployment targets
            installError: '',  // deployment progress status diagram install error backgraound
            runError: '',   // deployment progress status diagram run error backgraound
            background:[]  // deployment progress status diagram backgraound
            
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
        }
    },
    //methods are sorted alphabetically
    methods: {
        // reset deployment form and empty targets list 
        clearForm: function () {

            this.deployDes = '';
            this.typeSource = '0';
            this.sourceOrder = '';
            this.source = '';
            $('#searchTarget').children().remove();

            document.getElementById("mySourcelabel").innerHTML = "Choose File";
            document.getElementById("mySourcepath").innerHTML = "";
            document.getElementById("customFile").value = "";
            this.$refs.emptySource.style.display = 'flex';
            this.$refs.sourceOrder.style.display = 'none';
            this.$refs.custom_file.style.display = 'none';
            this.$refs.build.childNodes[0].style.display = 'none';
            this.$refs.build.childNodes[1].style.display = 'inline';

            this.deployDebug = false;
            this.build_c = "";
            this.build_a = "";
            this.host = "";
            this.install_c = "";
            this.run_c = "";
            this.targetDevices = [];

        },
        // refresh the markers on the map
        refreshmap: function (list) {
            this.markers.clearLayers();
            list.forEach(el => {
                let d = this.fullDevices.find(function (de) { return de.id === el })
                this.markers.addLayer(d.marker);
            });
            this.map.addLayer(this.markers)
            this.map.fitBounds(this.markers.getBounds());
        },
        // click deployment card
        clickCard: function (order) {
            if (order.deploy) this.refreshmap(order.deploy.match.list);
        },
        // click timeline item, show coreesponding device markers on the map and deployment card
        clickDeployment: function (id) { 
           $('#searchOrder').empty();     
           this.orders.forEach((i) => {
                if(i.id !== id){
                    i.cardActive = false;
                }else{
                    i.cardActive = true; 
                    this.clickCard(i);
                }
            }); 
        },
        // when close the dialog, refresh the full device list, deployment list, refresh the markers, reset deployment form, clear the source.
        closeModal: function () {
            if (this.ws) {
                this.ws.close();
                this.ws = "";
            }
            this.host = "";
            this.targets = "";
            this.source = "";
            this.orders = [];
            this.getOrders();
            this.fullDevices = [];
            this.failed = [];
            this.success = [];
            this.markers.clearLayers();
            this.getTargets();
            this.clearForm();
            this.source = '';
            $("#collapseOne").collapse("show");
            d3.selectAll("circle").remove();
            d3.selectAll("line").remove();

        },
        // request all logs on one device
        checkLogs: function (target) {
            return axios.get(this.address + "/logs?perPage=1&sortOrder=desc&output=stage&target=" + target).then(function (response) {

                if (response.data.items) {
                    let fulltask = new Set();
                    response.data.items.forEach(el => fulltask.add(el.task));
                    let task = Array.from(fulltask).slice(0, 15);
                    let lastLog = response.data.items.filter(el => el.task == task[0])
                    if (lastLog.some(el => el.error == true)) {
                        return { 'tasks': task,
                                 'log': response.data.items,
                                 'error': true                };
                    } else {
                        return { 'tasks': task,
                                 'log': response.data.items,
                                 'error': false               };
                    }
                } else {
                    return { 'tasks': "",
                             'log': "",
                             'error': "none"                  };
                }
            }).catch(error => {
                console.log(error);
            });
        },
        // based on source type, display corresponding iput
        chooseSource: function () {
            switch (this.typeSource) {
                //Choose... no source
                case '0':
                    this.$refs.emptySource.style.display = 'flex';
                    this.$refs.sourceOrder.style.display = 'none';
                    this.$refs.custom_file.style.display = 'none';
                    this.$refs.build.childNodes[0].style.display = 'none';
                    this.$refs.build.childNodes[1].style.display = 'inline';
                    break;
                //From Artifacts
                case '1':
                    this.$refs.emptySource.style.display = 'none';
                    this.$refs.custom_file.style.display = 'none';
                    this.$refs.sourceOrder.style.display = 'flex';
                    this.$refs.build.childNodes[0].style.display = 'block';
                    this.$refs.build.childNodes[1].style.display = 'none';
                    //this.source = '';
                    break;
                //Upload File
                case '2':
                    this.$refs.emptySource.style.display = 'none';
                    this.$refs.custom_file.style.display = 'flex';
                    this.$refs.sourceOrder.style.display = 'none';
                    this.$refs.build.childNodes[0].style.display = 'none';
                    this.$refs.build.childNodes[1].style.display = 'inline';
                    break;
            }
        },
        // create the badge appending to the search input 
        createBadge: function (content) {
            let badge = document.createElement("span");
            badge.innerHTML = content;
            badge.setAttribute("class", "btn btn-primary btn-sm");
            badge.setAttribute("style", "padding: 2px 5px");
            badge.onclick = ()=>{ 
                event.target.style.display = "none";
                this.searchTarget();
            };
            return badge;
        },
        // delete deployment from database
        deleteOrder: function (order) {
            let alert = $('#mymodal-body'), message=$('#mymessage-body');
            alert.empty();
            message.empty();
            axios.delete(this.address + "/orders/" + order.id).then( response => {
                let index = this.orders.indexOf(this.orders.find(el => el.id == order.id))
                this.orders.splice(index, 1);
                $('#myMessage').modal();
                message.append("Delete order with " + order.id + "  " + response.statusText);
            }).catch(error => {
                let message;
                if(error.response){
                    message = error.response.data.error;
                }else{
                    message = error;
                }
                alert.empty().append("Delete order with " + order.id + "  " + message);
                $('#myAlert').modal();
            })
        },
        // draw the status background of the diagram
        drawTreeback: function () {          
            //Build-Tree Nodes
            let treeLayout = d3.tree().size([100, 400])
            let root = d3.hierarchy(this.background);
            treeLayout(root);
            // Nodes
            let nodes = d3.select("#myTree_p g.nodes")
                .selectAll('circle.node')
                .data(root.descendants())
                .enter();
            nodes.append('circle')
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; })
                .attr('r', function (d) { return d.value; })
                .attr('fill', '#ececec')
                .style("stroke-dasharray", ("10,5"))
                .style('stroke-width', function (d) { return d.data.isFinish? '0px': '2px'; })
                .style("stroke", "#acacac")
                .style('transform-origin', function (d) { return d.x + 'px '+ d.y +'px'; })
                .style('animation', function (d) {   return d.data.isFinish ? 'none':'spinoffPulse 2s infinite ease';}) 

            // Links
            d3.select("#myTree_p g.links")
                .selectAll('line.link')
                .data(root.links())
                .enter()
                .append('line')
                .classed('link', true)
                .attr('x1', function (d) { return d.source.x; })
                .attr('y1', function (d) { return d.source.y; })
                .attr('x2', function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; })
                .attr('stroke', '#ececec')
                .style('stroke-width', function (d) { return d.source.data.line ? 0 : 1; });
        },
        // duplicate one previous task configuration
        duplicateOrder: function (order) {

            $("#collapseThree").collapse("show");
            this.deployDes = order.description ? order.description : "";

            // reset the source
            this.source = "";
            document.getElementById("mySourcelabel").innerHTML = "Choose File";
            document.getElementById("mySourcepath").innerHTML = "";
            document.getElementById("customFile").value = "";

            if (order.build.artifacts) {
                this.sourceOrder = order.id;
                this.typeSource = '1';
            } else {
                this.sourceOrder = '';
                this.typeSource = '0';
            }
            this.chooseSource();

            this.deployDebug = order.debug;

            this.build_c = order.build ? order.build.commands.join("\n") : "";
            this.build_a = order.build ? order.build.artifacts.join("\n") : "";
            this.host = order.build ? order.build.host : "";

            this.install_c = order.deploy && order.deploy.install.commands ? order.deploy.install.commands.join("\n") : "";
            this.run_c = order.deploy && order.deploy.run.commands ? order.deploy.run.commands.join("\n") : "";
            this.targetDevices = [];

            let s = document.getElementById("searchTarget");
            if (order.deploy) {
                s.innerHTML = "";
                for (var i = 0; i < order.deploy.match.list.length; i++) {
                    let b = this.createBadge(order.deploy.match.list[i]);
                    s.appendChild(b);
                    this.searchTarget();
                }
            }
        },
        editorInit: function () {
            require("brace/ext/language_tools"); //language extension prerequsite...
            require("brace/mode/golang");
            require("brace/mode/javascript");
            require("brace/mode/less");
            require("brace/theme/github");
            require("brace/snippets/javascript");
        },
        // watch user input, filter the dropdown menu item
        filter: function (list, key, value, word) {         
            list.forEach(l => {                      
                if (!l[key] || !(l[key].toLowerCase().indexOf(word) > -1)) {              
                    this.$set(l, value + 'Active', false)
                } else {
                    this.$set(l, value + 'Active', true)
                }
            })
        },
        // target dropdown menu filtering
        filterTarget: function () {
            let value = this.targetText.toLowerCase();
            this.filter(this.tags, 'tag', 'is', value);
            this.filter(this.fullDevices, 'id', 'name', value);
        },
        // host dropdown menu filtering
        filterHost: function () {
            let value = this.host.toLowerCase();
            this.filter(this.fullDevices, 'id', 'host', value);
        },
        // deployment dropdown filtering
        filterOrder: function (source) {
            let value = source.toLowerCase();
            this.filter(this.orders, 'id', 'name', value);
            this.filter(this.orders, 'description', 'name', value);
        },
        // generate the deployment progress status diagram data structure
        generateTree3: function (logs) {
            let nodes = [];
            if (this.targets) {
                // for each target
                for (let i = 0; i < this.targets.length; i++) {

                    let oneLog = logs.filter(log => log.target == this.targets[i].name && log.stage != 'build');
                    let c_d = "",  checksum =0, nodecksm =0;
                    let element = $('#' + this.targets[i].name);
                
                    if (oneLog.length > 0) {
                        // check logs and generate the HTML to show logs while deploying
                        oneLog.forEach(log => {
                            let s = "";
                            log.error ? s = "f" : s = "s";
                            this.targets[i].fullLog += log.stage + log.command + log.output;
                            c_d += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.command + " " + log.output + "</div>";
                        });
                        checksum = CRC32.str(this.targets[i].fullLog);
                        //console.log(this.targets[i].name, checksum)

                        let install = oneLog.find(l => { return l.output == "STAGE-END" && l.stage == 'install' });
                        let run = oneLog.filter(l => { return l.stage == 'run' });
                        this.targets[i].commands = oneLog;
                        
                        // Case1: there is install and installation has error
                        if (install && install.error == true) {
                            
                            this.targets[i].class = 'node-f';
                            this.targets[i].stage = 350;

                            // Check which error it belongs to 
                            let pos = this.installError.find(e=>{return e[0] === checksum});
                            if(pos){
                                this.targets[i].error = pos[1]
                            }else{
                                let newPos;
                                this.installError.length == 0 ? newPos = 100 : newPos = this.installError[this.installError.length-1][1] + 60;
                                this.targets[i].error = newPos;
                                this.installError.push([checksum,newPos,300]);
                            }
                        // Case2: there is install and installation has no error
                        } else if (install && run.length == 0) {

                            this.targets[i].class = 'node-s';
                            this.targets[i].stage = 350;
                            this.targets[i].error = 40;
                        // Case3: there is run and run ends with error
                        } else if (run.some(r => { return r.output == 'STAGE-END' && r.error == true })) {
                            
                            this.targets[i].class = 'node-f';
                            this.targets[i].stage = 450; 
                     
                            // Check which error it belongs to
                            let pos = this.runError.find(e=>{return e[0] === checksum});
                            if(pos){
                                this.targets[i].error = pos[1]
                            }else{
                                let newPos;
                                this.runError.length== 0 ? newPos = 100 : newPos = this.runError[this.runError.length-1][1] + 60;
                                this.targets[i].error = newPos;
                                this.runError.push([checksum,newPos,400]);
                            }
                        // Case4: there is run and run ends without error
                        } else if (run.some(r => { return r.output == 'STAGE-END' && r.error != true })) {
                            
                            this.targets[i].class = 'node-s';
                            this.targets[i].stage = 450;
                            this.targets[i].error = 40;
                        // Case5: there is a running
                        } else if (run.length > 0) {

                            this.targets[i].class = 'node-i';
                            this.targets[i].stage = 450;
                            this.targets[i].error = 40;
                        // Case6: there is a installing  
                        } else {
                            this.targets[i].class = 'node-i';
                            this.targets[i].stage = 350;
                            this.targets[i].error = 40;     
                        }
                    }
                    let s = element.children()[0];
                    $(s).append(c_d);
                    element.scrollTop(element.prop('scrollHeight'));
                }
                nodes = this.targets; 
                // check whether a stage is finished (if finish, the background won't rotate anymore)
                if(nodes.find(e=>{ return e.stage == 250 })){
                    this.background.children[0].children[0].isFinish = false;
                }else {
                     this.background.children[0].children[0].isFinish = true;
                }
                if (nodes.find(e=>{ return e.stage == 350 && e.error == 40 && e.class !='node-s' })){
                    this.background.children[0].children[0].children[0].isFinish = false;
                }else{
                    this.background.children[0].children[0].children[0].isFinish = true;
                }
                if (nodes.find(e=>{ return e.stage == 450 && e.error == 40 && e.class !='node-s' })){
                    this.background.children[0].children[0].children[0].children[0].isFinish = false;
                }else{
                     this.background.children[0].children[0].children[0].children[0].isFinish = true;
                }
            }
            //if there is a build process
            if (this.host) {
                // Get all logs for host          
                let one = logs.filter(log => log.stage == "build");
                this.host.commands = one;
                
                if(this.host.name.indexOf('0build') == -1) this.host.name += '0build';
                let element = $('#' + this.host.name);
                // if build ends with error
                if (one.some(l => { return l.error == true && l.output == 'STAGE-END' })) {
                    this.host.stage = 150;
                    this.host.error = 40;
                    this.host.class = 'node-f';
                    this.background.children[0].isFinish = true;
                // if build ends without error
                } else if (one.some(l => { return l.output == 'STAGE-END' })) {
                    this.host.error = 40;
                    this.host.stage = 150;
                    this.host.class = 'node-s';
                    this.background.children[0].isFinish = true;
                }
                this.host.stage == 150 ? this.background.isFinish = true:this.background.isFinish = false;
                let c_b = "";
                // check logs and generate the HTML to show logs while deploying
                one.forEach(log => {
                    let s = "";
                    log.error ? s = "f" : s = "s";
                    c_b += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.command + "  " + log.output + "</div>";
                });
                
                let a = element.children()[0];
                $(a).append(c_b);
                element.scrollTop(element.prop('scrollHeight'));
                nodes = this.targets.concat(this.host);
            }
            return nodes;
        },
        // generate deployment description (as a object)
        generateTaskDer: function () {

            let ids = [];
            for (let i = 0; i < this.targetDevices.length; i++) {
                ids.push(this.targetDevices[i].id);
            }
            var taskDer = {
                description: this.deployDes ? this.deployDes.split("\n").join() : null,
                source: {
                    order: this.typeSource == '1' ? this.sourceOrder : null,
                    zip: this.typeSource == '2' ? 'Uploaded Files' : null,
                },
                build: {
                    commands: this.typeSource != '1' && this.build_c ? this.build_c.split("\n") : null,
                    artifacts: this.typeSource != '1' && this.build_a ? this.build_a.split("\n") : null,
                    host: this.typeSource != '1' && this.host ? this.host : null
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
            return taskDer;
        },
        // check one task finished time and calculate how many devices succeed or failed, return [finish time, [success,fail]]
        getFinishnStatus: function (id, total) {
            return axios.get(this.address + "/logs?perPage=1000&sortOrder=desc&output=stage&task=" + id).then(response => {
                if(response.data.items){
                     let finishAt = response.data.items[0].time;
                     let logs = response.data.items.filter(el => el.error && el.output == "STAGE-END")
                    if (logs.length == 0) {
                        return [finishAt, [total, 0]];
                    } else {
                        return logs[0].stage == "build" ?  [finishAt, [0, 1]] : [finishAt, [total - logs.length, logs.length]];
                    }
                }else{
                    return [0,[0,0]];
                }
               
            }).catch(error => {
                console.log(error);
            });
        },
        // check one task finished time
        getFinishTime: function (id) {
            //Request the latest logs time
            return axios.get(this.address + "/logs?perPage=1&sortOrder=desc&task=" + id).then(response => {
                return response.data.items[0].time;
            }).catch(error => {
                console.log(error);
            });
        },
        // get all tasks
        getOrders: function () {
            axios.get(this.address + "/orders?sortOrder=desc").then(response => {
                for (let i = 0; i < response.data.total; i++) {
                    let a = response.data.items[i];
                    a.build ? a.build : (a.build = "");
                    a.deploy ? a.deploy : (a.deploy = "");
                    a.isActive = false;
                    a.nameActive = true;
                    a.cardActive = true;

                    let date = new Date(a.createdAt);
                    let day = date.getDate() < 9 ? '0' + date.getDate().toString() : date.getDate();
                    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1);
                    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes();

                    a.date = date.toUTCString().substring(5, 11);
                    a.time = date.toUTCString().substring(17, 22);

                    let total = 0;
                    a.deploy?  total = a.deploy.match.list.length: total = 1;
                    this.getFinishnStatus(a.id, total).then(data => {
                            a.finishedAt = data[0];
                            a.status = data[1];
                            this.orders.push(a);
                    });
                }
            });
        },
        // get all devices
        getTargets: function () {
            axios.get(this.address + "/targets").then(response => {
                for (let i = 0; i < response.data.total; i++) {
                    let a = response.data.items[i];
                    // to show the device name in dropdown menu of host
                    a.hostActive = true;
                    // to show the device name in dropdown menu of target
                    a.nameActive = true;
                    let tags = "";
                    if (a.tags) {
                        for (let j = 0; j < a.tags.length; j++) {
                            tags += '<div class="badge badge-pill ' + a.tags[j] + '">' + a.tags[j] + '</div>'
                            if (!this.tags.some(e => e.tag === a.tags[j])) {
                                this.tags.push({  'isActive': true,
                                                  'tag': a.tags[j]});
                            }
                        }
                    }
                    if (!a.location) {
                        a.location = {
                            lon: rand(50.749523),
                            lat: rand(7.203923),
                        }
                    }
                    // create a marker of this device
                    let marker = L.marker(L.latLng(a.location.lon, a.location.lat), {
                        'title': a.id,
                        'alt': a.tags ? a.tags : []
                    });
                    a.marker = marker;
                    // check tasks status and decide the marker icon, add to success or fail list
                    this.checkLogs(a.id).then(data => {
                        a.logs = data;
                        if (data.error == true) {
                            this.failed.push(a);
                            marker.setIcon(L.icon({
                                iconUrl: "/error.png",
                                iconSize: [20, 20]
                            }))
                        } else {
                            this.success.push(a);
                            marker.setIcon(L.icon({
                                iconUrl: "/done.png",
                                iconSize: [20, 20]
                            }))
                        }
                        this.fullDevices.push(a);
                    });
                    marker.bindPopup('<div>Name: ' + a.id + '</div><div>Tags: ' + tags + '</div>');
                    marker.on("click", event => {  marker.openPopup(); });
                    this.markers.addLayer(marker);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        // on the status diagram, go to edit the deployment form and redeploy
        goBackDeployment: function () {
            // close the modal
            $("#myTree").modal('toggle');
            let id = $('#treeTitle').text().substring(17); // get the order id from modal title!!
            if($('#editBtn').val() == 'nodeploy'){
                let order = this.orders.find(e =>{ return e.id == id})
                this.duplicateOrder(order);
            }
        },
        
        handleFileSelect: function (event) 
        {
            let files = event.target.files;
             
            let archive = new jsZip();
            let paths = [];
            for (let i = 0, f; (f = files[i]); i++) {
                let path = f.webkitRelativePath.substring(f.webkitRelativePath.indexOf('/')+1)
                paths.push(path);
                archive.file(path, f);
            }
            
            this.source = archive.generateAsync({ type: "base64" });
            if (files){
                var bt = document.getElementById('btList');
                bt.disabled = false;
                document.getElementById("mySourcelabel").innerHTML = 'Selected'+' '+files.length+' '+'files';

                $('#myList').on('show.bs.modal', function (event) {
                    $('#myList .modal-title').text("List of Selected Files");
                    $('#myList .modal-body').empty().append('<ul class="list-group"><li>' + paths.join('</li><li>') + '</li></ul>');
                })
            } 
            else{
                bt.disabled = true;
            }
        },
        
    
        // submit(POST) the deployment to backend service
        handleDeploy: function (taskDer) {
            let myYaml = yaml.safeDump(taskDer);
            axios.post(this.address + "/orders", myYaml).then(response => { 
                response.data.build ? response.data.deploy : (response.data.build = "");
                response.data.deploy ? response.data.deploy : (response.data.deploy = "");
                // generate the diagram
                this.listen3(response.data.id, true, response.data.deploy.match.list, response.data.build.host);
                
            }).catch(error => {
                let message;
                if(error.response){
                    message = error.response.data.error;
                }else{
                    message = error;
                }
                $("#mymodal-body").empty().append(message);
                $("#myAlert").modal();
            });     
        },
        // generate the diagram
        listen3: function (id, deploy, target, host) {
            
            let mylog = $("#mylog");
            mylog.empty(); 
            $('#treeTitle').empty().append('Process Diagram: '+id);
            $("#myTree").modal();

            d3.selectAll("circle").remove();
            d3.selectAll("line").remove();

            /* //Dummy data
            target = target.concat(['apple','kiwi','anana','melon','watermelon','bear','peach','berry','mango','orange'])
            */
            
            // generate the HTML to show the logs of (host and target) during deploying
            if (host) {
                this.host = {name: host, error: 40, stage: 50, class: 'node-i'}
                mylog.append('<h6 style="margin:2.5px 0">Build: </h6><div class="myCommands card"><button class="btn btn-light myBtn" type="button" data-toggle="collapse" data-target="#'+host+'0build'+'" aria-expanded="true" aria-controls="collapseOne">Device: ' + host + '</button>'
                +'<div id="' + host +'0build' + '" class="collapse myCommandCard"  style="text-align:right"><div style="text-align:left"></div></div></div>');
            } else {
                this.host = "";
                mylog.append('<h6 style="margin:2.5px 0">Build: No Build process.</h6>')
            }
            if (target) {
                let targetStr = '<h6 style="margin:0">Deploy: </h6>';
                this.targets = target.map(t => {
                   targetStr += '<div class="myCommands card"><button class="btn btn-light myBtn" type="button" data-toggle="collapse" data-target="#'+t+'" aria-expanded="true" aria-controls="collapseOne">Device: ' + t + '</button>'
                    +'<div id="' + t + '" class="collapse myCommandCard" style="text-align:right"><div  style="text-align:left"></div></div></div>';
                    return { name: t, error: 40, stage: 250, class: 'node-i', fullLog:''}
                })
                mylog.append(targetStr);
            } else {
                this.targets = [];
                mylog.append('<h6 style="margin:0">Deploy: No Deploy process.</h6>');
            }

            // add a fetch logs button to every target and host
            this.targets.forEach(t=>{
                let element = $('#' + t.name);
                let btn = document.createElement('button');
                btn.innerHTML= ' &#8634;  Fetch logs';
                btn.setAttribute("class", "btn btn-primary btn-sm");
                btn.setAttribute("style", "padding:0 2px");
                btn.onclick = ()=>{this.requestLogs(t.name)};
                element.append(btn);
            });
            if(this.host){
                let btn = document.createElement('button');
                btn.innerHTML= ' &#8634;  Fetch logs';
                btn.setAttribute("class", "btn btn-primary btn-sm");
                btn.setAttribute("style", "padding:0 2px");
                btn.onclick = ()=>{ 
                    this.requestLogs(this.host.name.substring(0, this.host.name.length - 6));
                };
            }
            
            // compute the background circle size and device node size
            let size = 0, nodeSize = 0, r = 0;
            this.targets.length < 6 ? size = 3 * this.targets.length : size = 25;
            this.targets.length > 0 ? r = 40 / this.targets.length : r = 5;

            if (r < 1) {
                nodeSize = 2;
            } else if (r > 5) {
                nodeSize = 5;
            } else { nodeSize = r }

            // background data tree
            this.background =  {
                name: 'START',
                value: 5,
                isFinish: this.host? false:true,
                children: [{
                    name: 'BUILD',
                    value: 5,
                    line: true,
                    isFinish: true,
                    children: [{
                        name: 'START',
                        value: size,
                        isFinish: true,
                        children: [
                            { name: 'INSTALL', value: size, isFinish: true, children: [{ name: 'RUN', value: size, isFinish: true, }]
                            }]
                    }]
                }]
            }
            this.drawTreeback();

            this.installError = [];
            this.runError = [];
            let targetNodes = [];

            // draw device nodes
            let node = d3.select("#myTree_b g").selectAll('circle');
            let treeLayout = d3.tree().size([100, 400]);
            let simulation = d3.forceSimulation(targetNodes)
                .force('charge', d3.forceManyBody().strength(5))
                .force('x', d3.forceX().x(function (d) { return d.error;}))
                .force('y', d3.forceY().y(function (d) { return d.stage;}))    
                .alphaTarget(1) 
                .on('tick', ()=>{               
                     node.attr("cx", function(d) { return d.x; })
                         .attr("cy", function(d) { return d.y; })
                         .attr("class", function(d) { return d.class; })
            });

            // if click the device status on deployment card (not submit a new deployment )
            if (!deploy) {
                axios.get(this.address + "/logs?sortOrder=asc&perPage=1000&task=" + id).then(response => {

                    $('#editBtn').val('nodeploy');
                    targetNodes = this.generateTree3(response.data.items); 

                    //Dummy data
                    /*  targetNodes = [{
                         class: "node-s",            
                         error: 30,
                         name: "banana",
                         stage: 150,
                    },
                    {
                         class: "node-s",            
                         error: 30,
                        name: "banana",
                        stage: 350,
                    },
                    {
                         class: "node-s",            
                         error: 30,
                        name: "banana",
                        stage: 450,
                    },
                    {
                         class: "node-s",            
                         error: 30,
                        name: "banana",
                        stage: 450,
                    },
                    {
                         class: "node-s",            
                         error: 30,
                        name: "banana",
                        stage: 450,
                    },
                    {
                         class: "node-s",            
                         error: 30,
                        name: "banana",
                        stage: 450,
                    },
                    {
                         class: "node-s",            
                         error: 30,
                        name: "banana",
                        stage: 450,
                    },
                    {
                         class: "node-s",            
                         error: 30,
                        name: "banana",
                        stage: 450,
                    },
                      {
                         class: "node-f",            
                         error: 95,
                        name: "banana",
                        stage: 450,
                    },
                      {
                         class: "node-f",            
                         error: 95,
                        name: "banana",
                        stage: 450,
                    },
                       
                         {
                         class: "node-f",            
                         error: 95,
                        name: "banana",
                        stage: 450,
                    },
                       
                         {
                         class: "node-f",            
                         error: 150,
                        name: "banana",
                        stage: 450,
                    },]  */
                    
                    // update devices nodes position
                    node = node.data(targetNodes);
                    node.exit().remove();
                    node = node.enter().append('circle')
                                .attr('r', nodeSize)
                                .attr('class', function (d) {return d.class; })
                                .merge(node)
                                .on('click', function (d) {  $('#'+ d.name).collapse('toggle');});
                    
                    simulation.nodes(targetNodes).force('collision', d3.forceCollide().radius(5));
                    d3.select("#myTree_p g.nodes").selectAll("circle").remove();

                    // update background circles (rotation)
                    let root = d3.hierarchy(this.background);
                    treeLayout(root);
                    let nodes = d3.select("#myTree_p g.nodes")
                                    .selectAll('circle.node')
                                    .data(root.descendants())
                                    .enter().append('circle');
                    nodes.attr('cx', function (d) { return d.x; })
                        .attr('cy', function (d) { return d.y; })
                        .attr('r', function (d) { return d.value+1; })
                        .attr('fill', '#ececec')
                        .style("stroke-dasharray", ("10,4"))
                        .style('stroke-width', function (d) { return d.data.isFinish? '0px': '2px';})
                        .style("stroke", "#acacac")
                        .style('transform-origin', function (d) { return d.x + 'px '+ d.y +'px'; })
                        .style('animation', function (d) { return d.data.isFinish ? 'none':'spinoffPulse 1.5s infinite ease'; }) 

                    let links = d3.select("#myTree_p g.links")
                                    .selectAll('line.link')
                                    .data(root.links())
                                    .enter()
                                    .append('line')
                                    .classed('link', true);
                    links.attr('x1', function (d) { return d.source.x; })
                        .attr('y1', function (d) { return d.source.y; })
                        .attr('x2', function (d) { return d.target.x; })
                        .attr('y2', function (d) { return d.target.y; })
                        .attr('stroke', '#ececec')
                        .style('stroke-width', function (d) { return d.source.data.line ? 0 : 1; });

                    // draw error backgraound
                    let errorNodes = this.installError.concat(this.runError); 
                    //Dummy data: let errorNodes =[[977741087, 90, 400],[977741087, 145, 400]]
                    let circles = d3.select('#myTree_e g.nodes').selectAll("circle.node")
                                                  .data(errorNodes)
                                                  .enter()
                                                  .append("circle");
                    let circleAttributes = circles.attr("cx", function (d) { return d[1] })
                                                  .attr("cy", function (d) { return d[2] })
                                                  .attr("r", function (d) { return size; })
                                                 .style('fill', '#ececec'); 

                    }).catch(error => {
                        console.log(error);
                });
            // if generating the diagram via submitting a new deployment 
            }else{
                if(target && host){
                    targetNodes = this.targets.concat(this.host);
                }else if(target && !host){
                    targetNodes = this.targets;
                }else if(!target && host){
                    targetNodes.push(this.host);
                }

                node = node.data(targetNodes);
                node.exit().remove();
                node = node.enter().append('circle')
                                .attr('r', nodeSize)
                                .attr('class', function (d) {return d.class; })
                                .merge(node)

                simulation.nodes(targetNodes)
                            .force('x', d3.forceX().x(function (d) { return d.error;}))   
                            .force('y', d3.forceY().y(function (d) { return d.stage;}))   
                            .force('collision', d3.forceCollide().radius(5));
            }

            if (!("WebSocket" in window)) {
                alert("WebSocket is not supported by your Browser!");
                return;
            }
            if (this.ws) {
                this.ws.close();
                this.ws = "";
            } 
                let address;
                this.address.indexOf('https') > -1 ? address = "wss://" : address = "ws://";
                // open a websocket to receive real-time logs
                this.ws = new WebSocket(address + this.address.substring(7) + "/events?task=" + id + "&topics=logs");
                this.ws.onopen = function () {
                    console.log("Socket connected.");
                };
                this.ws.onmessage = event => {
                    let obj = JSON.parse(event.data);
                    // pass the logs to generate the diagram data structure
                    targetNodes = this.generateTree3(obj.payload);
                    // update device nodes position
                    node = node.data(targetNodes);
                    node.exit().remove();
                    node = node.enter().append('circle')
                                .attr('r', nodeSize)
                                .attr('class', function (d) {return d.class; })
                                .merge(node)
                                .on('click', function (d) { $('#'+ d.name).collapse('toggle') });

                    simulation.nodes(targetNodes)
                            .force('x', d3.forceX().x(function (d) { return d.error;}))   
                            .force('y', d3.forceY().y(function (d) { return d.stage;}))   
                            .force('collision', d3.forceCollide().radius(5));
                    
                    let root = d3.hierarchy(this.background);
                    treeLayout(root);

                    // update background circles (rotation)
                    d3.select("#myTree_p g.nodes").selectAll("circle").remove();
                    let nodes = d3.select("#myTree_p g.nodes")
                                    .selectAll('circle.node')
                                    .data(root.descendants())
                                    .enter().append('circle');
                    nodes.attr('cx', function (d) { return d.x; })
                        .attr('cy', function (d) { return d.y; })
                        .attr('r', function (d) { return d.value+1; })
                        .attr('fill', '#ececec')
                        .style("stroke-dasharray", ("10,4"))
                        .style('stroke-width', function (d) {return d.data.isFinish? '0px': '2px';})
                        .style("stroke", "acacac")
                        .style('transform-origin', function (d) { return d.x + 'px '+ d.y +'px'; })
                        .style('animation', function (d) {  return d.data.isFinish ? 'none':'spinoffPulse 2s infinite ease';}) 

                    let links = d3.select("#myTree_p g.links")
                                    .selectAll('line.link')
                                    .data(root.links())
                                    .enter()
                                    .append('line')
                                    .classed('link', true);
                    links.attr('x1', function (d) { return d.source.x; })
                        .attr('y1', function (d) { return d.source.y; })
                        .attr('x2', function (d) { return d.target.x; })
                        .attr('y2', function (d) { return d.target.y; })
                        .attr('stroke', '#ececec')
                        .style('stroke-width', function (d) { return d.source.data.line ? 0 : 1; });

                    // draw error backgraound
                    let errorNodes = this.installError.concat(this.runError);
                    let circles = d3.select('#myTree_e g.nodes').selectAll("circle.node")
                                                  .data(errorNodes)
                                                  .enter()
                                                  .append("circle");
                    circles.attr("cx", function (d) { return d[1]})
                            .attr("cy", function (d) { return d[2] })
                            .attr("r", function (d) { return size; })
                            .style('fill', '#ececec'); 
                };
                this.ws.onclose = function () {
                    console.log("Socket disconnected.");
                    $("#mylog").prepend("<p>WebSocket Disconnected!</p>");
                };
            
        },
        // click the right button on timeline, disable it when the latest task is shown
        next: function () {
            if (this.offset > 0) {
                this.$refs.pre.disabled = false;
                this.offset -= 100;
                this.$refs.timeline_lis.style.transform = 'translateX(' + this.offset + 'px)';
                this.$refs.timeline_lis.style.transition = 'all .6s';
            } else {
                this.offset <= 0? this.$refs.next.disabled = true: this.$refs.pre.disabled = true;
            }
        },
        // click the left button on timeline, disable it when the oldest task is shown
        previous: function () {
            if (this.$refs.timeline_lis.offsetWidth - this.offset > (this.map.getSize().x - 20)) {
                this.offset += 100;
                this.$refs.timeline_lis.style.transform = 'translateX(' + this.offset + 'px)';
                this.$refs.timeline_lis.style.transition = 'all .6s';
                this.$refs.next.disabled = false
            } else {
                this.offset >= 0? this.$refs.pre.disabled = true : this.$refs.next.disabled = true;
            }
        },
        // remove the device from the target list(new deployment)
        removeDevice: function (name) {
            let childrens = $("#searchTarget").children();
            for (let i = 0; i < this.targetDevices.length; i++) {
                if (this.targetDevices[i].id == name) {
                    this.targetDevices.splice(i, 1);
                }
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
        // request the debug logs of one task(needed when 'debug' option was unchecked during a deployment creation)
        requestLogs:function(id){
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
                alert.empty().append( "Request Logs of target with " + id + "  " + message);
                $('#myAlert').css('z-index',2000).modal();
             })
        },
        // refresh full deployment list
        refresh: function () {
            this.orders = [];
            this.getOrders();
            $('#searchOrder').empty();
        },
        // search deployment by description under deployment list
        searchDes: function () {
            if(this.orderSearchT){
                let badge = this.createBadge(this.orderSearchT);
                document.getElementById("searchOrder").appendChild(badge);
                this.searchOrder();
            }
        },
        // search deployment by name under deployment list
        searchOrder: function () {

            let tagsNodes = document.getElementById("searchOrder").childNodes;
            let value = this.orderSearchT.toLowerCase(); 
            this.orders.forEach(o => {
                for (var i = 0; i < tagsNodes.length; i++) {               
                    if (tagsNodes[i].style.display != "none") {
                        if (o.id == tagsNodes[i].innerHTML || (value.length > 0 && o.description && o.description.toLowerCase().indexOf(value) > -1)) {
                            o.cardActive = true;   
                            break;
                        } else {
                            o.cardActive = false;
                        }
                    }
                }
            })
            this.orderSearchT = "";
        },
        // search devices under new deployment
        searchTarget: function () {
            this.targetDevices=[];
            let tagsNodes = document.getElementById("searchTarget").childNodes;
            for (let i = 0; i < tagsNodes.length; i++) {
                if (tagsNodes[i].style.display != "none") {
                    for (let j = 0; j < this.fullDevices.length; j++) {
                        if ((this.fullDevices[j].tags && this.fullDevices[j].tags.some(e => e == tagsNodes[i].innerHTML) || this.fullDevices[j].id == tagsNodes[i].innerHTML)) {
                            if (!(this.targetDevices.some(e => e.id == this.fullDevices[j].id))) {
                                this.targetDevices.push({
                                    'id': this.fullDevices[j].id,
                                    'tags': this.fullDevices[j].tags
                                });
                            }
                        }
                    }
                }
            }
        },
        // search previous task id under new deployment 
        selectArtifacts: function (id) {
            this.sourceOrder = id;
        },
        // click device name or tag in dropdown menu under new deployment
        selectItem: function (tag) {
            this.targetText = "";
            let badge = this.createBadge(tag);
            document.getElementById("searchTarget").appendChild(badge);
            this.searchTarget();
        },
        // click deployment name in dropdown menu under deployment list
        selectOrder: function (id) {
         
            let badge = this.createBadge(id);
            document.getElementById("searchOrder").appendChild(badge);
            this.searchOrder();
        },
        // show deployment configuration in yaml and applied the changes when switches to form vew
        showYaml: function () {

            if (this.myYaml.show) {
                let obj = yaml.safeLoad(this.myYaml.y);
                try {
                    this.deployDes = obj.description ? obj.description : "";
                    if (obj.source.order && obj.source.zip) {
                        $('#mymodal-body').empty().append("<strong>Inviald Yaml: </strong><br><strong>You can't set source.order and source.zip at same time!</strong>");
                        $('#myAlert').modal();
                    } else {
                        if (obj.source.order) {
                            this.sourceOrder = obj.source.order;
                            this.typeSource = '1';

                        } else if (obj.source.zip) {
                            this.sourceOrder = '';
                            this.typeSource = '2';
                        }

                        this.chooseSource();
                        this.deployDebug = obj.debug;

                        this.build_c = obj.build.commands ? obj.build.commands.join("\n") : "";
                        this.build_a = obj.build.artifacts ? obj.build.artifacts.join("\n") : "";
                        this.host = obj.build.host ? obj.build.host : "";

                        this.install_c = obj.deploy.install.commands ? obj.deploy.install.commands.join("\n") : "";
                        this.run_c = obj.deploy.run.commands ? obj.deploy.run.commands.join("\n") : "";
                        this.targetDevices = [];

                        for (let i = 0; i < obj.deploy.target.ids.length; i++) {
                            this.targetDevices.push({
                                'id': obj.deploy.target.ids[i],
                                'tags': this.fullDevices.find(el => el.id == obj.deploy.target.ids[i]).tags,
                            });
                        }

                        this.myYaml.show = false;
                        event.target.innerHTML = 'Yaml'
                        document.getElementById('newDeployment').style.display = 'grid';
                    }

                } catch (error) {
                    $('#mymodal-body').empty().append("<strong>Inviald Yaml: </strong>" + error +'<br><strong>Please check the syntax!</strong>');
                    $('#myAlert').modal();
                }
            } else {
                event.target.innerHTML = 'Form';
                this.myYaml.show = true;
                document.getElementById('newDeployment').style.display = 'none';
            }
            let taskDer = this.generateTaskDer();
            this.myYaml.y = yaml.safeDump(taskDer);
        },
        // stop a deployment
        stopOrder: function (order) {
            let alert = $('#mymodal-body'), message = $('#mymessage-body');
            alert.empty();
            message.empty();
            axios.put(this.address + "/orders/" + order.id + "/stop").then(response => {
                message.append("Stop order with " + order.id + "  " + response.data.message);
                $('#myMessage').modal();
            }).catch(error => {
                 let message;
                if(error.response){
                    message = error.response.data.error;
                }else{
                    message = error;
                }
                alert.empty().append("Stop order with " + order.id + "  " + message);
                
                $('#myAlert').modal();
            })
        },
        // append source to a new deployment object and submit it
        submitDeploy: function () {
            var taskDer = this.generateTaskDer();
            if (this.typeSource == '2') {
                if (this.source) {
                    this.source.then(data => {
                        taskDer.source.zip = data;
                        this.handleDeploy(taskDer);
                    });
                }else{
                    $('#mymodal-body').empty().append("You selected source type is 'uploaded file', but you haven't upload one.<br> If you dont need a package, please select 'choose..' option.");
                    $("#myAlert").modal();
                }
            } else {
                this.handleDeploy(taskDer);
            }
        },
        // redirect to Device Management
        toDevices: function (para) {
            this.$router.push({
                path: "/home", props: {
                    devices: this.fullDevices,
                }
            });
        },
    },
    mounted() {

        this.$refs.map.style.height = window.innerHeight + "px";
        this.$refs.list.style.height = window.innerHeight - 34 - 27 - 32 - 20 - 32 + "px";
        this.$refs.collapseThree.style.height = window.innerHeight - 34 - 27 - 32 - 10 + "px";

        this.address = localStorage.getItem('address');

        this.getOrders();
        this.getTargets();
        this.map = L.map("map").setView([45.749523, 18.20343], 5);
        this.$refs.myTimeline.style.width = this.map.getSize().x - 20 + 'px'
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
                let childCount = cluster.getChildCount();
                let childs = cluster.getAllChildMarkers();
                let name = '';

                if (childs.some(c => { return c.options.icon.options.iconUrl == '/error.png' })) {
                    name = 'myCluster-e';
                } else {
                    name = 'myCluster';
                }
                return L.divIcon({
                    'html': "<div><span>" + childCount + "</span></div>",
                    'className': name,
                    'iconSize': new L.Point(40, 40)
                });
            }
        });
        this.map.addLayer(this.markers);

        $('#collapseThree').on('show.bs.collapse', () => {
            this.markers.on('clusterclick', a => {
                a.layer.getAllChildMarkers().forEach(m => {
                    if (!(this.targetDevices.some(e => e.id == m.options.title))) {
                        this.targetDevices.push({
                            'id': m.options.title,
                            'tags': m.options.alt
                        });
                    }
                })
            })
            this.fullDevices.forEach(d => {
                d.marker.on('dblclick', event => {
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
    updated() {
        $('[data-toggle="popover"]').popover();
        this.markers.refreshClusters();
    }
};
</script>

<style>
.myCluster {
  background-color: #b5e28c99;
  background-clip: padding-box;
  border-radius: 20px;
}
.myCluster div {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-top: 5px;
  background-color: #6ecc3999;
  text-align: center;
  border-radius: 15px;
  font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.myCluster span, .myCluster-e span  {
  line-height: 30px;
}
.myCluster-e {
  background-color: #e26b8199;
  background-clip: padding-box;
  border-radius: 20px;
}
.myCluster-e div {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-top: 5px;
  background-color: #da2143;
  text-align: center;
  border-radius: 15px;
  font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.myCommands{
  border: 1px solid #cccccc;
  border-radius: 2.5px;
  padding: 5px;
  margin-bottom: 5px;
}
#newDeployment {
  display: grid;
  grid-template-columns: 1fr 4.5fr;
  grid-gap: 2.5px;
}
.myCommandCard{
    max-height: 400px;
    background: #fcfcfc;
    padding: 5px;
    overflow: auto;
}
.simpleDeviceCard {
  border: 1px solid #cccccc;
  border-radius: 2.5px;
  padding: 2.5px;
  margin: 2.5px;
  font-size: 14px;
}

#mySourcelabel::after {
    height: 24px;
    padding: 2.5px;
}
#mySourcelabel {
    text-align: left;
    height: 26px;
    padding: 3.5px;
    font-size: 14px;
    border-radius: 0 .25rem .25rem 0;
}

#myList li {
    list-style: none;
}
#myList li:nth-of-type(odd) {
    background: #f5f5f5;
}

#mytree-body {
  display: grid;
  grid-template-columns: 3fr 6.5fr;
  grid-gap: 5px;
}
#mytree-body2 {
  display: grid;
  grid-template-columns:  0.5fr 2.6fr 6fr;
  grid-gap: 5px;
}
#stage {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
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
.myBtn{
    padding:2.5px 7.5px !important;
    width:100%;
    text-align:left !important;
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
.node-n {
  fill: #cccccc;
  stroke: none;
}
.node-i {
  fill: rgb(46, 81, 171);
  stroke: none;
}
.node-s {
  fill: rgb(0, 174, 49);
  stroke: none;
}
.node-f {
  fill: #d80027;
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
.mySelect{
    padding: 0 5px 0 0;
    height: 26px;
    border: 1px solid #ced4da;
    border-radius: .25rem 0 0 .25rem;
    width: 135px;
}

@media (min-width: 576px){
    #myTree_dialog, #myTree_dialog2{
        max-width:110% !important;
    }
}
@-webkit-keyframes spinoffPulse {
    0% { -webkit-transform:rotateZ(0deg)}
	100% { -webkit-transform:rotate(360deg)}
}
</style>


