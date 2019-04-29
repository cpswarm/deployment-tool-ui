<template>
  <div class="mappanelContainer">
    <div class="panel">
        <div id="title">
            <h5 draggable="true" style="display: inline-block; margin:5px">Deployment Management</h5>
        </div>
        <div class="accordion" id="accordionExample" style="width:100%;padding:2.5px">
            <div class="card">
                <div class="card-header" id="headingOne" style="text-align:left;width:100%">
                  <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseOne"
                            aria-expanded="false" aria-controls="collapseOne" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                            <img src="../assets/device.png" style="width:18px">
                            Deployment List
                    </button>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice" data-parent="#accordionExample" >
                    <div style="padding:5px;" >
                    <form class="form-inline" style="margin-bottom:5px"> 
                        <button type="button" class="btn" style="padding: 0px 5px;border: 1px solid;margin: 0 5px 0 0px;" @click="refresh">
                            <img src="../assets/refresh.svg" style="width:16px">
                        </button>
                        <div class="input-group" style="width:92%">
                             <div id="searchOrder"></div>
                            <input class="dropdown-toggle form-control form-control-sm" v-model="orderSearchT" type="text"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterOrder(orderSearchT)"
                                style="font-size: 14px;height: 26px;padding: 5px;">
                            <div class="input-group-append">
                                <a class="btn btn-outline-secondary" style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;" @click="searchOrder">
                                    <img src="../assets/search.png" style="height:20px">
                                </a>
                            </div>
                            <div class="dropdown-menu" style="padding:2.5px; max-height:550px;overflow:auto">
                                <p class="dropdown-header" style="padding:2px 5px"> You can also search by description!</p>
                                <div class="dropdown-divider"></div>
                             <p class="dropdown-header" style="padding:2px 5px"> <strong> Names:</strong> </p>
                               <a v-for="order in orders" class="dropdown-item" v-show="order.nameActive" @click="selectOrder(order.id)" style="font-size:14px;padding:0px 15px">{{order.id}}</a>
                            </div>
                        </div>
                    </form>
                        <div id="deploymentList" ref="list" style="overflow:scroll">
                            <div v-for="order in orderOrders"   v-show="order.cardActive" :key="order.id" @click="clickCard(order)">
                                <div class="mycard card-body" style="padding:5px;margin-bottom:5px">
                                    <div class="mycard-title">Name:</div>
                                    <div class="mycard-content">{{order.id}}</div>
                                    <div class="mycard-title">Description:</div>
                                    <div class="mycard-content">{{order.description}}</div>
                                    <div class="mycard-title">Devices:</div>
                                    <div class="mycard-content">
                                    <img src="../assets/done.png" style="width:16px">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="listen3(order.id,false, order.deploy.match.list,order.build.host)">
                                        <p style="color:#00AE31;display:inline-block;padding:2.5px;margin:0">{{order.status[0]}}</p>
                                    </button>
                                    <img src="../assets/error.png" style="width:16px">
                                    <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px" @click="listen3(order.id,false, order.deploy.match.list,order.build.host)">
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
                            <button type="button" class="btn btn-primary btn-sm" style="padding: 0 4px;position:relative;float:right;font-size:14px" @click="showYaml">View Yaml
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
                                            <option value="2">Upload Files</option>         
                                        </select> 
                                    <div class="input-group-append" style="width:63%">
                                        <input ref="emptySource" type="text" class="form-control form-control-sm"  style="height:26px;font-size:14px;border-radius: 0 .25rem .25rem 0;" disabled>
                                        <input ref="sourceOrder" type="text" class="form-control dropdown-toggle form-control-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterOrder(sourceOrder)" style="height:26px;font-size:14px;border-radius: 0 .25rem .25rem 0;display:none" v-model="sourceOrder">
                                        <div class="dropdown-menu" style="padding:2.5px;max-height:400px;overflow:auto">
                                            <p class="dropdown-header" style="padding:2px 5px"> <strong> Names:</strong> </p>
                                            <a v-for="order in orders" class="dropdown-item" v-show="order.nameActive" @click="selectArtifacts(order.id)" style="font-size:14px;padding:0px 15px">{{order.id}}</a>
                                        </div>
                                        <div ref="custom_file" class="custom-file" style="height:26px; display:none">
                                            <input type="file" class="custom-file-input" id="customFile" multiple webkitdirectory @change="handleFileSelect">
                                            <label id="mySourcelabel" class="custom-file-label" for="customFile">Choose file</label>
                                    </div>
                                    </div>
                                </div>       
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
                                            theme="github" width="100%" height="70"></editor>
                                  
                                        <div class="myfont_t">artifacts:</div>
                                        <editor ref="editor_build_a" v-model="build_a" @init="editorInit" lang="golang"
                                            theme="github" width="100%" height="70"></editor>
                                    
                                        <div class="input-group">
                                            <label class="myfont_t" style="padding: 7.5px 0;margin-bottom: 0px;">host:</label>
                                            <input ref="hostInput" type="text" v-model="host" class="dropdown-toggle form-control form-control-sm"
                                                style="border-radius: .2rem; height:22px;margin: 5px 0" data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false" @keyup="filterHost">
                                            <div class="dropdown-menu" style="padding:2.5px">
                                            <a v-for="device in fullDevices" class="dropdown-item" v-show="device.hostActive"
                                                @click=" host = device.id " style="font-size:14px;padding:0px 15px">{{device.id}}</a>
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
                                        theme="github" width="100%" height="70"></editor>
                                </div>
                            </div>
                            <div class="mycard-title" >Run:</div>
                            <div class="mycard-content" >
                                <div>
                                    <div class="myfont_t">commands:</div>
                                    <editor ref="editor_run_c" v-model="run_c" @init="editorInit" lang="golang" theme="github"
                                        width="100%" height="70"></editor>
                                </div>
                            </div>
                            <div class="mycard-title" >Target:</div>
                            <div class="mycard-content" style="grid-column: 1/3; border: 1px solid grey;border-style:dashed">
                                <form class="form-inline">
                                    <div class="input-group" style="width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                        <div id="searchTarget"></div>
                                        <input class="dropdown-toggle form-control form-control-sm" type="text" v-model="targetText"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterTarget"
                                            style="font-size: 14px;height: 26px;padding: 5px; border:none">
                                        <div class="input-group-append">
                                            <a class="btn btn-outline-secondary" aria-expanded="true" style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
                                                @click="searchTarget">
                                                <img src="../assets/search.png" style="height:20px">
                                            </a>
                                        </div>
                                        <div class="dropdown-menu" style="padding:2.5px">
                                                   <p class="dropdown-header" style="padding:2px 5px"> <strong> Names:</strong> </p>
                                            <a v-for="device in fullDevices" class="dropdown-item" v-show="device.nameActive" @click="selectItem(device.id)"
                                                style="font-size:14px;padding:0px 15px">{{device.id}}</a>
                                             <div class="dropdown-divider"></div>
                                             <p class="dropdown-header" style="padding:2px 5px">   <strong> Tags:</strong> </p>
                                            <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive" @click="selectItem(tag.tag)"
                                                style="font-size:14px;padding:0px 15px">{{tag.tag}}</a>
                                        </div>
                                    </div>
                                </form>
                                <div style="height:350px;overflow: scroll">
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
                            <div></div> 
                            <div style="text-align:right;margin-top:10px">
                                 <button class="btn btn-primary" @click="clearForm" type="button" style="font-size:14px;padding: 2.5px 5px;margin-right:5px">Clear</button>
                                <button class="btn btn-primary" @click="submitDeploy" type="button" style="font-size:14px;padding: 2.5px 5px;">Deploy</button>
                            </div>
                        </form>
                       
                        <div ref="deployYaml" v-if="myYaml.show">
                            <textarea v-model="myYaml.y"  cols="30" rows="23" class="form-control" style="font-size:14px"></textarea>
                        </div> 
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="map" ref="map"></div>
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
    <div id="myTree" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div id="myTree_dialog" class="modal-dialog" role="document" style="margin: 50px 100px;">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Process Tree</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="mytree-body" class="modal-body">
                    <div>
                        <svg id="myTree_p" width="500" height="550">
                            <g transform="translate(0, 50)">
                                <g class="links"></g>
                                <g class="nodes"></g>
                            </g>
                        </svg>
                        <svg id="myTree_b" width="500" height="550" style="position:relative; top: -550px">
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
     <div id="myTree2" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div id="myTree_dialog2" class="modal-dialog" role="document" style="margin: 50px 100px;">
            <div class="modal-content" >
                <div class="modal-header">
                    <h5 class="modal-title">Process Tree</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="mytree-body2" class="modal-body">
                    <div id="stage" style="height:320px">
                        <div>Build</div>
                        <div>Deploy</div>
                        <div>Install</div>
                        <div>Run</div>
                        <div>End</div>
                    </div>
                    <div>
                        <svg id="mytree_b2" width="200" height="60">
                            <g transform="translate(15, 20)">
                                <g class="links"></g>
                                <g class="nodes"></g>
                            </g>
                        </svg>
                        <br>
                         <svg id="mytree_d2" width="200" height="300">
                            <g transform="translate(0, 20)">
                                <g class="links"></g>
                                <g class="nodes"></g>
                            </g>
                        </svg>
                    </div>
                    <div style="text-align:left">
                       <div id="mylog2" style="text-align:left" class="myfont_c"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <div id="myTimeline" ref="myTimeline">
               <button ref="pre"  class="btn btn-sm btn-light" style="width: 20px;height: 20px;position: relative;float: left;top: 25px;border-radius: 50%;color: rgb(44, 62, 80);border: 2px solid rgb(44, 62, 80);" @click="previous">
                    <span style="left: -5px;font-size: 9px;position: relative;top: -8px;">&#9668;</span> 
                </button> 
                <button ref="next" disabled class="btn btn-sm btn-light"  style="width: 20px;height: 20px;position: relative;float: right;top: 25px;border-radius: 50%;color: rgb(44, 62, 80);border: 2px solid rgb(44, 62, 80);" @click="next">
                    <span style="left: -4px;font-size: 9px;position: relative;top: -8px;">&#9658;</span>
                </button>
               <div style="height:70px; overflow:hidden">
                <hr style="border: 1.5px solid #2c3e50;margin-top: 35px;">
                <div id="timeline_lis" ref="timeline_lis" style="position: relative;top:-54px;width:max-content;float:right">
                    <li v-for="order in orders.slice().reverse()" class="timeline-li" @click="clickDeployment(order.id)" tabindex="0" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="top" data-html="true" :data-content="'Name: '+ order.id.substring(0,26) + '...<br>'+ 'Description: ' + order.description">
                    <div><strong style="margin-right:5px">{{order.date}}</strong>{{order.time}}</div>
                    <div v-if="order.status">
                        <img v-if="order.status[1]==0&&order.status[0]!=0" src="../assets/done.png" style="width:22px;background-color: #fff; border-radius: 50%" >  
                        <img v-else src="../assets/error.png" style="width:22px;background-color: #fff; border-radius: 50%" >              
                    </div>
                     <!--   <div>{{order.id.substring(0,6)}}</div>  -->
                    </li> 
                </div>
            </div>
        </div> 
        <div id="notification" class="notification"> 
            <div class="mycard-title" style="color:#ffda44;" >New Discovered:
                <img src="../assets/star.png" style="width:15px"></div>
            <div class="mycard-content">
                 <button type="button" class="btn btn-light btn-sm" style="color:#ffda44; padding: 0 2px" @click="toDevices('new')">
                        {{this.newDiscover.length}} 
                </button>
                </div> 
            <div class="mycard-title" style="color:#d80027">Failed:
                <img src="../assets/error.png" style="width:15px">
            </div>
            <div class="mycard-content">
                 <button type="button" class="btn btn-light btn-sm" style="color:#d80027;padding: 0 2px" @click="toDevices('failed')">
                {{this.failed.length}}
                  </button>
                </div>
            <div class="mycard-title" style="color:#00ae31">Success:
                 <img src="../assets/done.png" style="width:15px">
            </div>
            <div class="mycard-content" >
                  <button type="button" class="btn btn-light btn-sm" style="color:#00ae31;padding: 0 2px" @click="toDevices('success')">
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
            myYaml: {
                show: false,
                y: "",
            },
            typeSource: "0",
            sourceOrder: "",
            offset: 0,
            address: "",
            map: "",
            ws: "",
            orderSearchT: "",
            deployDes: "",
            deployDebug: "",
            source: "",
            build_c: "",
            build_a: "",
            install_c: "",
            run_c: "",
            targetText: "",
            host: "",
            targetDevices: [],
            fullDevices: [],
            tags: [],
            orders: [],
            tree: [],
            markers: [],
            failed: [],
            success: [],
            newDiscover: [],
            host: "",
            targets: ""
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
        clearForm: function () {

            this.deployDes = '';
            this.typeSource = '0';
            this.sourceOrder = '';
            this.source = '';

            document.getElementById("mySourcelabel").innerHTML = "Choose File";
            document.getElementById("customFile").value = "";
            this.$refs.emptySource.style.display = 'flex';
            this.$refs.sourceOrder.style.display = 'none';
            this.$refs.custom_file.style.display = 'none';
            this.$refs.build.childNodes[0].style.display = 'none';
            this.$refs.build.childNodes[1].style.display = 'inline';

            this.deployDebug = false
            this.build_c = "";
            this.build_a = "";
            this.host = "";
            this.install_c = "";
            this.run_c = "";
            this.targetDevices = [];

        },
        refreshmap: function (list) {
            this.markers.clearLayers();
            list.forEach(el => {
                var d = this.fullDevices.find(function (de) {
                    return de.id === el
                })
                this.markers.addLayer(d.marker);
            });
            this.map.addLayer(this.markers)
            this.map.fitBounds(this.markers.getBounds());
        },
        clickCard: function (order) {
            if (order.deploy) {
                this.refreshmap(order.deploy.match.list);
            }
        },
        clickDeployment: function (id) {
            var filteredData = this.orders.find((i) => {
                return i.id === id
            });
            if (filteredData.deploy) {
                this.refreshmap(filteredData.deploy.match.list);
            }
        },
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
        },
        checkLogs: function (target) {
            var des = "target=" + target;
            return axios.get(this.address + "/logs?perPage=1000&sortOrder=desc&" + des).then(function (response) {

                if (response.data.items) {
                    let fulltask = new Set();
                    response.data.items.forEach(el => {
                        fulltask.add(el.task)
                    });
                    let task = Array.from(fulltask).slice(0, 15);
                    let lastLog = response.data.items.filter(el => el.task == task[0])
                    if (lastLog.some(el => el.error == true)) {
                        return {
                            tasks: task,
                            log: response.data.items,
                            error: true
                        };
                    } else {
                        return {
                            tasks: task,
                            log: response.data.items,
                            error: false
                        };
                    }
                } else {
                    return {
                        tasks: "",
                        log: "",
                        error: "none"
                    };
                }
            }).catch(error => {
                console.log(error);
            });
        },
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
        createBadge: function (content) {
            var badge = document.createElement("span");
            badge.innerHTML = content;
            badge.setAttribute("class", "btn btn-primary btn-sm");
            badge.setAttribute("style", "padding: 2px 5px");
            badge.onclick = function () { this.style.display = "none"; };
            return badge;
        },
        deleteOrder: function (order) {
            $('#mymodal-body').empty();
            $('#mymessage-body').empty();
            axios.delete(this.address + "/orders/" + order.id).then(
                response => {
                    let index = this.orders.indexOf(this.orders.find(el => el.id == order.id))
                    this.orders.splice(index, 1);
                    $('#myMessage').modal();
                    $('#mymessage-body').append("Delete order with " + order.id + "  " + response.statusText)
                }
            ).catch(error => {
                $('#mymodal-body').append("Delete order with " + order.id + "  " + error)
                $('#myAlert').modal();
            })
        },
        duplicateOrder: function (order) {

            $("#collapseThree").collapse("show");
            this.deployDes = order.description ? order.description : "";

            this.source = "";
            document.getElementById("mySourcelabel").innerHTML = "Choose File";
            document.getElementById("customFile").value = "";

            this.sourceOrder = order.id;
            this.typeSource = '1';
            this.chooseSource();

            this.deployDebug = order.debug;

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
                        tags: this.fullDevices.find(el => el.id == order.deploy.match.list[i]).tags,
                    });
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
        filter: function (list, key, value, word) {
            list.forEach(l => {
                if (!(l[key].toLowerCase().indexOf(word) > -1)) {
                    this.$set(l, value + 'Active', false)
                } else {
                    this.$set(l, value + 'Active', true)
                }
            })
        },
        filterTarget: function () {
            var value = this.targetText.toLowerCase();
            this.filter(this.tags, 'tag', 'is', value);
            this.filter(this.fullDevices, 'id', 'name', value);
        },
        filterHost: function () {
            var value = this.host.toLowerCase();
            this.filter(this.fullDevices, 'id', 'host', value);
        },
        filterOrder: function (source) {
            var value = source.toLowerCase();
            this.filter(this.orders, 'id', 'name', value);
        },
        generateTree: function (logs) {

            d3.select('#myTree_b').selectAll("circle").remove();
            d3.select('#myTree_b').selectAll("line").remove();

            var xCenter = [300, 300, 300, 200, 300, 400, 100, 200, 300];
            var yCenter = [50, 150, 250, 350, 350, 350, 450, 450, 450];
            var nodes = [];

            if (this.targets) {

                for (let i = 0; i < this.targets.length; i++) {
                    let oneLog = logs.filter(log => log.target == this.targets[i].name);
                    var c_d = "";
                    if (oneLog.length > 0) {

                        let install = oneLog.find(l => { return l.output == "STAGE-END" && l.stage == 'install' });
                        let run = oneLog.filter(l => { return l.stage == 'run' });

                        if (install && install.error == true) {
                            this.targets[i].stage = 4;
                            this.targets[i].class = 'node-f';
                            this.targets[i].commands = oneLog;

                        } else if (install && run.length == 0) {

                            this.targets[i].stage = 3;
                            this.targets[i].class = 'node-s';
                            this.targets[i].commands = oneLog;

                        } else if (run.some(r => { return r.output == 'STAGE-END' && r.error == true })) {
                            this.targets[i].stage = 7;
                            this.targets[i].class = 'node-f';
                            this.targets[i].commands = oneLog;

                        } else if (run.some(r => { return r.output == 'STAGE-END' && r.error != true })) {

                            this.targets[i].stage = 6;
                            this.targets[i].class = 'node-s';
                            this.targets[i].commands = oneLog;

                        } else if (run.length > 0) {

                            this.targets[i].stage = 8;
                            this.targets[i].class = 'node-i';
                            this.targets[i].commands = oneLog;
                        } else {
                            this.targets[i].stage = 5;
                            this.targets[i].class = 'node-i';
                            this.targets[i].commands = oneLog;
                        }
                        oneLog.forEach(log => {
                            let s = "";
                            log.error ? s = "f" : s = "s";
                            c_d += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.command + " " + log.output + "</div>";
                        })
                    }
                    $('#' + this.targets[i].name).append(c_d);
                    document.getElementById(this.targets[i].name).scrollTop = document.getElementById(this.targets[i].name).scrollHeight;
                }
                nodes = this.targets
            }

            //If there is a build process
            if (this.host) {
                // Get all logs for host
                let one = logs.filter(log => log.stage == "build");
                if (one.some(l => { return l.error == true && l.output == 'STAGE-END' })) {
                    this.host.stage = 1;
                    this.host.commands = one;
                    this.host.class = 'node-f';
                } else if (one.some(l => { return l.output == 'STAGE-END' })) {
                    this.host.stage = 1;
                    this.host.commands = one;
                    this.host.class = 'node-s';
                }
                let c_b = "";
                one.forEach(log => {
                    855
                    let s = "";
                    log.error ? s = "f" : s = "s";
                    c_b += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.command + "  " + log.output + "</div>";
                });
                $('#' + this.host.name).append(c_b);
                document.getElementById(this.host.name).scrollTop = document.getElementById(this.host.name).scrollHeight;
                nodes = this.targets.concat(this.host)
            }

            var size = 0;
            let r = 50 / this.targets.length;
            if (r < 1) {
                size = 1;
            } else if (r > 5) {
                size = 5;
            } else { size = r }
            //If there is a deploy process          
            var simulation = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(0))
                .force('x', d3.forceX().x(function (d) {
                    return xCenter[d.stage];
                }))
                .force('y', d3.forceY().y(function (d) {
                    return yCenter[d.stage];
                }))
                .force('collision', d3.forceCollide().radius(5))
                .on('tick', () => {
                    let u = d3.select("#myTree_b g")
                        .selectAll('circle')
                        .data(nodes);

                    u.enter().append('circle')
                        .attr('r', size)
                        .attr('class', function (d) { return d.class; })
                        .merge(u)
                        .attr('cx', function (d) { return d.x; })
                        .attr('cy', function (d) { return d.y; })
                        .on('click', function (d) {
                            $('#mylog').empty();
                            let code = "";
                            d.commands.forEach(el => {
                                code += '<div class="myfont_' + d.class[5] + '">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                            });
                            $('#mylog').prepend('<h6>Logs:</h6><div class="myCommands">' + code + '</div>')
                        })
                    u.exit().remove();
                });
        },
        generateTree2: function (logs, hostStatus, targetsStatus, host, targets) {

            d3.selectAll("circle").remove();
            d3.selectAll("line").remove();

            var code = "";
            var build = {
                value: 1,
                class: "node-n",
                children: []
            };
            var install = {
                value: 1,
                class: "node-n",
                children: [{
                    value: 0,
                    class: 'node-s'
                },
                {
                    value: 0,
                    class: 'node-f'
                },
                {
                    value: 0,
                    class: 'node-i'
                }]
            };
            var run = {
                value: 1,
                class: "node-n",
                children: [{
                    value: 0,
                    class: 'node-s'
                },
                {
                    value: 0,
                    class: 'node-f'
                },
                {
                    value: 0,
                    class: 'node-i'
                }]
            };


            //If there is a build process
            if (host) {
                // Get all logs for host
                var oneLog = logs.filter(log => log.stage == "build");
                oneLog.forEach(log => {
                    if (hostStatus.get(log.target).get('build')[0].substring(0, 9) != "STAGE-END") {
                        hostStatus.get(log.target).set('build', [log.output, oneLog])
                    }
                })
                build.class = 'node-i';
                hostStatus.forEach((value, key) => {
                    let child = { class: '', value: 0, commands: '' };
                    child.value++;
                    child.commands = value.get('build')[1];
                    if (value.get('build')[1].some(l => { return l.error == true && l.output == 'STAGE-END' })) {
                        child.class = 'node-f';
                    } else {
                        child.class = 'node-s';
                    }
                    build.children.push(child);
                })

                let c_b = "";
                oneLog.forEach(log => {
                    let s = "";
                    log.error ? s = "f" : s = "s";
                    c_b += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.command + "  " + log.output + "</div>";
                });
                $('#' + host).append(c_b);
                document.getElementById(host).scrollTop = document.getElementById(host).scrollHeight;
            } else {
                build.children.push({ class: 'node-n', value: 1 })
            }

            //If there is a deploy process
            if (targets) {

                install.value = targets.length + 1;
                install.class = 'node-s';

                for (let i = 0; i < targets.length; i++) {
                    var oneLog = logs.filter(log => log.target == targets[i] && log.stage != 'build');
                    var c_d = "";

                    if (oneLog.length > 0) {
                        oneLog.forEach(log => {
                            console.log(log.stage)
                            if (targetsStatus.get(log.target).get(log.stage)[0].substring(0, 9) != "STAGE-END") {
                                targetsStatus.get(log.target).set(log.stage, [log.output, oneLog.filter(el => el.stage == log.stage)])
                            }
                            targetsStatus.get(log.target).set('deploy', ['END', ''])
                            let s = "";
                            log.error ? s = "f" : s = "s";
                            c_d += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.command + " " + log.output + "</div>";
                        })
                    }
                    $('#' + targets[i]).append(c_d);
                    document.getElementById(targets[i]).scrollTop = document.getElementById(targets[i]).scrollHeight;
                }
                targetsStatus.forEach((value, key) => {
                    install.value--;
                    let child = { class: '', value: 0, commands: '' };
                    let i = value.get('install');
                    let i_e = i[1] ? i[1].some(l => { return l.error == true && l.stage == 'install' && l.output == 'STAGE-END' }) : '';

                    let r = value.get('run');
                    let r_e = r[1] ? r[1].some(l => { return l.error == true && l.stage == 'run' && l.output == 'STAGE-END' }) : '';

                    if (i[0] == "STAGE-END" && i_e) {

                        install.children[1].value++;
                        install.children[1].commands = i[1];

                    } else if (i[0] == "STAGE-END" && r[0] == "") {

                        install.children[0].value++;
                        install.children[0].commands = i[1];

                    } else if (i[0] == "STAGE-END" && r[0] != "STAGE-END") {

                        run.class = 'node-s';
                        run.children[2].value++;
                        run.children[2].commands = i[1];

                    } else if (r[0] == "STAGE-END" && r_e && i[0] == "") {
                        run.class = 'node-s';
                        run.children[1].value++;
                        run.children[1].commands = i[1];

                    } else if (r[0] == "STAGE-END" && !r_e && i[0] == "STAGE-END") {
                        run.class = 'node-s';
                        run.children[0].value++;
                        run.children[0].commands = i[1];

                    } else if (r[0] == "STAGE-END" && r_e && i[0] == "STAGE-END") {
                        run.class = 'node-s';
                        run.children[1].value++;
                        run.children[1].commands = i[1];

                    } else if (r[0] == "STAGE-END" && i[0] == "" && !r_e) {
                        run.class = 'node-s';
                        run.children[0].value++;
                        run.children[0].commands = i[1];

                    } else if (r[0] != "STAGE-END" && i[0] == "") {
                        run.class = 'node-s';
                        run.children[2].value++;
                        run.children[2].commands = i[1];
                    } else if (i[0] != "STAGE-END") {
                        install.children[2].value++;
                        install.children[2].commands = i[1];
                    }
                })
            }
            install.children[0] ? install.children[0] = run : install.children.push(run);

            //console.log(myTree_d)
            var tree_b = d3.tree().size([200, 30]);
            var tree_d = d3.tree().size([200, 200]);
            var root_b = d3.hierarchy(build);
            var root_d = d3.hierarchy(install);

            //Build-Tree Nodes
            d3.select("#mytree_b2 g.nodes")
                .selectAll("circle.node")
                .data(tree_b(root_b).descendants())
                .enter()
                .append("circle")
                .attr("class", function (d) { return d.data.class; })
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; })
                .attr("r", function (d) { return d.data.value * 1.5; })
                .on('click', function (d) {
                    $('#mylog2').empty();
                    code = "";
                    d.data.commands.forEach(el => {
                        code += '<div class="myfont_' + d.data.class[5] + '">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                    });
                    $('#mylog2').prepend('<h6>Logs:</h6><div class="myCommands">' + code + '</div>')
                });
            //Deploy-Tree Nodes 
            d3.select("#mytree_d2 g.nodes")
                .selectAll("circle.node")
                .data(tree_d(root_d).descendants())
                .enter()
                .append("circle")
                .attr("class", function (d) { return d.data.class; })
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; })
                .attr("r", function (d) { return d.data.value * 1.5; })
                .on('click', function (d) {
                    $('#mylog2').empty();
                    code = "";
                    d.data.commands.forEach(el => {
                        code += '<div class="myfont_' + d.data.class[5] + '">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                    });
                    $('#mylog2').prepend('<h6>Logs:</h6><div class="myCommands">' + code + '</div>')
                })

            // Build-Tree Links
            d3.select("#mytree_b2 g.links")
                .selectAll("line.link")
                .data(tree_b(root_b).links())
                .enter()
                .append("line")
                .classed("link", true)
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; })
                .style("stroke-width", function (d) {
                    if (d.target.data.value == 0) {
                        return 0;
                    } else {
                        return 1;
                    }
                })


            //Deploy-Tree Links
            d3.select("#mytree_d2 g.links")
                .selectAll("line.link")
                .data(tree_d(root_d).links())
                .enter()
                .append("line")
                .classed("link", true)
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; })
                .style("stroke-width", function (d) {
                    if (d.target.data.value == 0) {
                        return 0;
                    } else {
                        return 1;
                    }
                })
        },
        generateTree3: function (logs) {

            d3.select('#myTree_b').selectAll("circle").remove();
            d3.select('#myTree_b').selectAll("line").remove();

            var yCenter = [50, 150, 250, 350, 450];
            var nodes = [];

            if (this.targets) {
                for (let i = 0; i < this.targets.length; i++) {
                    let oneLog = logs.filter(log => log.target == this.targets[i].name);
                    var c_d = "";
                    if (oneLog.length > 0) {

                        let install = oneLog.find(l => { return l.output == "STAGE-END" && l.stage == 'install' });
                        let run = oneLog.filter(l => { return l.stage == 'run' });

                        if (install && install.error == true) {
                            this.targets[i].stage = 350;
                            this.targets[i].class = 'node-f';
                            this.targets[i].commands = oneLog;

                        } else if (install && run.length == 0) {

                            this.targets[i].stage = 450;
                            this.targets[i].class = 'node-s';
                            this.targets[i].commands = oneLog;

                        } else if (run.some(r => { return r.output == 'STAGE-END' && r.error == true })) {
                            this.targets[i].stage = 450;
                            this.targets[i].class = 'node-f';
                            this.targets[i].commands = oneLog;

                        } else if (run.some(r => { return r.output == 'STAGE-END' && r.error != true })) {

                            this.targets[i].stage = 450;
                            this.targets[i].class = 'node-s';
                            this.targets[i].commands = oneLog;

                        } else if (run.length > 0) {

                            this.targets[i].stage = 450;
                            this.targets[i].class = 'node-i';
                            this.targets[i].commands = oneLog;
                        } else {
                            this.targets[i].stage = 350;
                            this.targets[i].class = 'node-i';
                            this.targets[i].commands = oneLog;
                        }
                        oneLog.forEach(log => {
                            let s = "";
                            log.error ? s = "f" : s = "s";
                            c_d += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.command + " " + log.output + "</div>";
                        })
                    }
                    $('#' + this.targets[i].name).append(c_d);
                    document.getElementById(this.targets[i].name).scrollTop = document.getElementById(this.targets[i].name).scrollHeight;
                }
                nodes = this.targets
            }
            //If there is a build process
            if (this.host) {
                // Get all logs for host
                let one = logs.filter(log => log.stage == "build");
                if (one.some(l => { return l.error == true && l.output == 'STAGE-END' })) {
                    this.host.stage = 150;
                    this.host.commands = one;
                    this.host.class = 'node-f';
                } else if (one.some(l => { return l.output == 'STAGE-END' })) {
                    this.host.stage = 150;
                    this.host.commands = one;
                    this.host.class = 'node-s';
                }
                let c_b = "";
                one.forEach(log => {
                    855
                    let s = "";
                    log.error ? s = "f" : s = "s";
                    c_b += '<div class="myfont_' + s + '">' + new Date(log.time).toLocaleString() + "  " + log.stage + "  " + log.command + "  " + log.output + "</div>";
                });
                $('#' + this.host.name).append(c_b);
                document.getElementById(this.host.name).scrollTop = document.getElementById(this.host.name).scrollHeight;
                nodes = this.targets.concat(this.host)
            }

            var size = 0;
            let r = 50 / this.targets.length;
            if (r < 1) {
                size = 1;
            } else if (r > 5) {
                size = 5;
            } else { size = r }
            //If there is a deploy process          
            var simulation = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(5))
                .force('x', d3.forceX().x(250))
                .force('y', d3.forceY().y(function (d) {
                    return d.stage;
                }))
                .force('collision', d3.forceCollide().radius(5))
                .on('tick', () => {
                    let u = d3.select("#myTree_b g")
                        .selectAll('circle')
                        .data(nodes);

                    u.enter().append('circle')
                        .attr('r', size)
                        .attr('class', function (d) { return d.class; })
                        .merge(u)
                        .attr('cx', function (d) { return d.x; })
                        .attr('cy', function (d) { return d.y; })
                        .on('click', function (d) {
                            $('#mylog').empty();
                            let code = "";
                            d.commands.forEach(el => {
                                code += '<div class="myfont_' + d.class[5] + '">' + new Date(el.time).toLocaleString() + "  " + el.stage + "  " + el.output + "</div>";
                            });
                            $('#mylog').prepend('<h6>Logs:</h6><div class="myCommands">' + code + '</div>')
                        })

                    u.exit().remove();
                });
        },
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
        getFinishnStatus: function (id, total) {

            return axios.get(this.address + "/logs?task=" + id + "&perPage=1000&sortOrder=desc").then(response => {
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
            return axios.get(this.address + "/logs?task=" + id + "&perPage=1&sortOrder=desc").then(response => {
                return response.data.items[0].time;
            }).catch(error => {
                console.log(error);
            });
        },
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
        getTargets: function () {
            axios.get(this.address + "/targets").then(response => {

                for (let i = 0; i < response.data.total; i++) {
                    let a = response.data.items[i];
                    a.targetActive = true;
                    a.hostActive = true;
                    a.nameActive = true;

                    var tags = "";
                    if (a.tags) {
                        for (let j = 0; j < a.tags.length; j++) {
                            tags += '<div class="badge badge-pill ' + a.tags[j] + '">' + a.tags[j] + '</div>'
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
                        title: a.id,
                        alt: a.tags ? a.tags : []
                    });
                    a.marker = marker;
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
                    marker.on("click", event => {
                        marker.openPopup();
                    });
                    this.markers.addLayer(marker);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        handleFileSelect: function (event) {
            var files = event.target.files;
            // FileList object
            var archive = new jsZip().folder("archive");
            for (var i = 0, f; (f = files[i]); i++) {
                // if set webkitdirectory
                archive.file(f.webkitRelativePath, f);
                // if only set multiple
                //archive.file(f.name, f);
            }
            this.source = archive.generateAsync({ type: "base64" });
            if (files) {
                document.getElementById("mySourcelabel").innerHTML = files[0].name + "...";
            }
        },
        handleDeploy: function (taskDer) {
            var myYaml = yaml.safeDump(taskDer);
            //console.log(myYaml);
            axios.post(this.address + "/orders", myYaml).then(response => {
                //console.log(response);
                response.data.deploy ? response.data.deploy : (response.data.deploy = "");
                response.data.build ? response.data.deploy : (response.data.build = "");
                $("#collapseOne").collapse("show");
                this.clearForm();
                this.listen3(response.data.id, true, response.data.deploy.match.list, response.data.build.host);
            }).catch(error => {
                $("#mymodal-body").append(error.response.data.error);
                $("#myAlert").modal();
            });
            this.source = '';
        },
        listen: function (id, deploy, target, host) {

            $("#mylog").empty();
            $("#myTree").modal();

            d3.selectAll("circle").remove();
            d3.selectAll("line").remove();

            //If there is a build process
            if (host) {
                this.host = { name: host, stage: 0, class: 'node-i' }
                $('#mylog').append('<h6 style="margin:0">Build: </h6><div class="myCommands"><h6 style="margin:0">Device: ' + host + '</h6><div id="' + host + '" class="myCommandCard"></div></div>')
            } else {
                this.host = "";
                $('#mylog').append('<h6 style="margin:0">Build: No Build process.</h6>')
            }
            //If there is a deploy process
            if (target) {
                $('#mylog').append('<h6 style="margin:0">Deploy: </h6>');
                this.targets = target.map(t => {
                    $('#mylog').append('<div class="myCommands"><h6 style="margin:0">Device: ' + t + '</h6><div id="' + t + '" class="myCommandCard"></div></div>');
                    return { name: t, stage: 2, class: 'node-i' }
                })
            } else {
                this.targets = "";
                $('#mylog').append('<h6 style="margin:0">Deploy: No Deploy process.</h6>')
            }
            var size = 0;
            if (this.targets.length >= 50) { size = 50 }
            else if (this.targets.length < 10) { size = 5 * this.targets.length }
            else { size = 50 }

            var data = {
                name: 'build',
                value: 5,
                children: [{
                    name: 'build-E',
                    value: 5,
                    children: [{
                        name: 'install',
                        value: size,
                        children: [
                            {
                                name: 'install-s', value: size, children: [
                                    { name: 'run-s', value: size },
                                    { name: 'run-f', value: size },
                                    { name: 'run-i', value: size }]
                            },
                            { name: 'install-f', value: size },
                            { name: 'install-i', value: size }
                        ]
                    }]
                }]
            }

            //Build-Tree Nodes
            var treeLayout = d3.tree().size([500, 400])
            var root = d3.hierarchy(data)
            treeLayout(root)
            // Nodes
            var nodes = d3.select("#myTree_p g.nodes")
                .selectAll('circle.node')
                .data(root.descendants())
                .enter();

            nodes.append('circle')
                .classed('node', true)
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; })
                .attr('r', function (d) { return d.value; })
                .attr('fill', '#ececec')
                .attr('stroke', '#e4e4e4');

            nodes.append('text')
                .attr('x', function (d) { return d.x - 25; })
                .attr('y', function (d) { return d.y; })
                .text(function (d) { return d.data.name })
                .attr("font", '12px "Helvetica Neue", Arial, Helvetica, sans-serif;')
                .attr("fill", "#e4e4e4");

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
                .attr('stroke', '#e4e4e4');


            if (!deploy) {
                axios.get(this.address + "/logs?task=" + id + "&sortOrder=asc&perPage=1000")
                    .then(response => {
                        this.generateTree(response.data.items);
                    }).catch(error => {
                        console.log(error);
                    });
            }
            if (!("WebSocket" in window)) {
                alert("WebSocket is not supported by your Browser!");
                return;
            }
            if (this.ws) {
                this.ws.close();
                this.ws = "";
            } else {
                let address;
                this.address.indexOf('https') > -1 ? address = "wss://" : address = "ws://";
                this.ws = new WebSocket(address + this.address.substring(7) + "/events?order=" + id + "&topics=logs");
                this.ws.onopen = function () {
                    //console.log("Socket connected.");
                };
                this.ws.onmessage = event => {
                    //console.log(event.data);
                    var obj = JSON.parse(event.data);
                    this.generateTree(obj.payload);
                };
                this.ws.onclose = function () {
                    console.log("Socket disconnected.");
                    $("#mylog").prepend("<p>WebSocket Disconnected!</p>");
                    // If socket disconnected, try to connect again after 5s.
                    /* setTimeout(function () { listen(1, true);}, 5000); */
                };
            }
        },
        listen3: function (id, deploy, target, host) {

            $("#mylog").empty();
            $("#myTree").modal();

            d3.selectAll("circle").remove();
            d3.selectAll("line").remove();

            //If there is a build process
            if (host) {
                this.host = { name: host, stage: 50, class: 'node-i' }
                $('#mylog').append('<h6 style="margin:0">Build: </h6><div class="myCommands"><h6 style="margin:0">Device: ' + host + '</h6><div id="' + host + '" class="myCommandCard"></div></div>')
            } else {
                this.host = "";
                $('#mylog').append('<h6 style="margin:0">Build: No Build process.</h6>')
            }
            //If there is a deploy process
            if (target) {
                $('#mylog').append('<h6 style="margin:0">Deploy: </h6>');
                this.targets = target.map(t => {
                    $('#mylog').append('<div class="myCommands"><h6 style="margin:0">Device: ' + t + '</h6><div id="' + t + '" class="myCommandCard"></div></div>');
                    return { name: t, stage: 250, class: 'node-i' }
                })

            } else {
                this.targets = "";
                $('#mylog').append('<h6 style="margin:0">Deploy: No Deploy process.</h6>')
            }
            var size = 0;
            if (this.targets.length >= 50) { size = 50 }
            else if (this.targets.length < 10) { size = 5 * this.targets.length }
            else { size = 50 }

            var data = {
                name: 'BUILD',
                value: 5,
                children: [{
                    name: 'BUILD-END',
                    value: 5,
                    line: true,
                    children: [{
                        name: 'DEPLOY',
                        value: size,
                        children: [
                            {
                                name: 'INSTALL', value: size, children: [
                                    { name: 'RUN', value: size }]
                            }]
                    }]
                }]
            }

            //Build-Tree Nodes
            var treeLayout = d3.tree().size([500, 400])
            var root = d3.hierarchy(data)
            treeLayout(root)
            // Nodes
            var nodes = d3.select("#myTree_p g.nodes")
                .selectAll('circle.node')
                .data(root.descendants())
                .enter();
            nodes.append('circle')
                .classed('node', true)
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; })
                .attr('r', function (d) { return d.value; })
                .attr('fill', '#ececec')

            nodes.append('text')
                .text(function (d) { return d.data.name })
                .attr('x', function (d) {
                    return d.x - 5 * d.data.name.length;
                })
                .attr('y', function (d) { return d.y + 5; })
                .attr("font", '12px "Helvetica Neue", Arial, Helvetica, sans-serif;')
                .attr("fill", "#acacac");

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
                .style('stroke-width', function (d) {
                    return d.source.data.line ? 0 : 1;
                })


            if (!deploy) {
                axios.get(this.address + "/logs?task=" + id + "&sortOrder=asc&perPage=1000")
                    .then(response => {
                        this.generateTree3(response.data.items);
                    }).catch(error => {
                        console.log(error);
                    });
            }
            if (!("WebSocket" in window)) {
                alert("WebSocket is not supported by your Browser!");
                return;
            }
            if (this.ws) {
                this.ws.close();
                this.ws = "";
            } else {
                let address;
                this.address.indexOf('https') > -1 ? address = "wss://" : address = "ws://";
                this.ws = new WebSocket(address + this.address.substring(7) + "/events?order=" + id + "&topics=logs");
                this.ws.onopen = function () {
                    //console.log("Socket connected.");
                };
                this.ws.onmessage = event => {
                    //console.log(event.data);
                    var obj = JSON.parse(event.data);
                    this.generateTree3(obj.payload);
                };
                this.ws.onclose = function () {
                    console.log("Socket disconnected.");
                    $("#mylog").prepend("<p>WebSocket Disconnected!</p>");
                    // If socket disconnected, try to connect again after 5s.
                    /* setTimeout(function () { listen(1, true);}, 5000); */
                };
            }
        },
        listen2: function (id, deploy, target, host) {

            $("#mylog2").empty();
            $("#myTree2").modal();

            var hostStatus = new Map();
            var targetsStatus = new Map();

            //If there is a build process
            if (host) {
                let status = new Map();
                status.set('build', 'STAGE-START');
                hostStatus.set(host, status);
                $('#mylog2').append('<h6 style="margin:0">Build: </h6><div class="myCommands"><h6 style="margin:0">Device: ' + host + '</h6><div id="' + host + '" class="myCommandCard"></div></div>')
            } else {
                $('#mylog2').append('<h6 style="margin:0">Build: No Build process.</h6>')
            }
            //If there is a deploy process
            if (target) {
                target.forEach(el => {
                    let status = new Map();
                    status.set('deploy', ['STAGE-START', ""]);
                    status.set('install', ['', '']);
                    status.set('run', ['', '']);
                    targetsStatus.set(el, status);
                });
                $('#mylog2').append('<h6 style="margin:0">Deploy: </h6>');
                target.map(t => {
                    $('#mylog2').append('<div class="myCommands"><h6 style="margin:0">Device: ' + t + '</h6><div id="' + t + '" class="myCommandCard"></div></div>');
                })
            } else {
                $('#mylog2').append('<h6 style="margin:0">Deploy: No Deploy process.</h6>')
            }
            if (!deploy) {
                axios.get(this.address + "/logs?task=" + id + "&sortOrder=asc&perPage=1000")
                    .then(response => {
                        this.generateTree2(response.data.items, hostStatus, targetsStatus, host, target);
                    }).catch(error => {
                        console.log(error);
                    });
            }
            if (!("WebSocket" in window)) {
                alert("WebSocket is not supported by your Browser!");
                return;
            }
            if (this.ws) {
                this.ws.close();
                this.ws = "";
            } else {
                let address;
                this.address.indexOf('https') > -1 ? address = "wss://" : address = "ws://";
                this.ws = new WebSocket(address + this.address.substring(7) + "/events?order=" + id + "&topics=logs");
                this.ws.onopen = function () {
                    //console.log("Socket connected.");
                };
                this.ws.onmessage = event => {
                    //console.log(event.data);
                    var obj = JSON.parse(event.data);
                    this.generateTree2(obj.payload, hostStatus, targetsStatus, host, target);
                };
                this.ws.onclose = function () {
                    console.log("Socket disconnected.");
                    $("#mylog2").prepend("<p>WebSocket Disconnected!</p>");
                    // If socket disconnected, try to connect again after 5s.
                    /* setTimeout(function () { listen(1, true);}, 5000); */
                };
            }
        },
        next: function () {

            if (this.offset > 0) {
                this.$refs.pre.disabled = false;
                this.offset -= 100;
                this.$refs.timeline_lis.style.transform = 'translateX(' + this.offset + 'px)';
                this.$refs.timeline_lis.style.transition = 'all .6s';
            } else {
                if (this.offset <= 0) {
                    this.$refs.next.disabled = true;
                } else {
                    this.$refs.pre.disabled = true;
                }
            }
        },
        previous: function () {

            if (this.$refs.timeline_lis.offsetWidth - this.offset > (this.map.getSize().x - 20)) {
                this.offset += 100;
                this.$refs.timeline_lis.style.transform = 'translateX(' + this.offset + 'px)';
                this.$refs.timeline_lis.style.transition = 'all .6s';
                this.$refs.next.disabled = false
            } else {
                if (this.offset >= 0) {
                    this.$refs.pre.disabled = true;
                } else {
                    this.$refs.next.disabled = true;
                }
            }
        },
        removeDevice: function (name) {
            for (var i = 0; i < this.targetDevices.length; i++) {
                if (this.targetDevices[i].id == name) {
                    this.targetDevices.splice(i, 1);
                }
            }
        },
        refresh: function () {
            this.orders = [];
            this.getOrders();
        },
        searchOrder: function () {
            var tagsNodes = document.getElementById("searchOrder").childNodes;
            var value = this.orderSearchT.toLowerCase();
            this.orders.map(o =>{
                for (var i = 0; i < tagsNodes.length; i++) {
                    if (tagsNodes[i].style.display != "none") {
                        if (o.id == tagsNodes[i].innerHTML || (value.length >0 && o.description && o.description.toLowerCase().indexOf(value) > -1)) {
                            o.cardActive = true; 
                            break;
                        } else {
                           o.cardActive = false;
                        }
                    }
                }
            })
        },
        searchTarget: function () {
            var tagsNodes = document.getElementById("searchTarget").childNodes;
            for (var i = 0; i < tagsNodes.length; i++) {
                if (tagsNodes[i].style.display != "none") {
                    for (var j = 0; j < this.fullDevices.length; j++) {
                        if ((this.fullDevices[j].tags && this.fullDevices[j].tags.some(e => e == tagsNodes[i].innerHTML) || this.fullDevices[j].id == tagsNodes[i].innerHTML)) {
                            if (!(this.targetDevices.some(e => e.id == this.fullDevices[j].id))) {
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
        selectArtifacts: function (id) {
            this.sourceOrder = id;
        },
        selectItem: function (tag) {
            this.targetText = "";
            var badge = this.createBadge(tag);
            document.getElementById("searchTarget").appendChild(badge);
            this.searchTarget();
        },
        selectOrder: function (id) {
            this.orderSearchT = "";
            var badge = this.createBadge(id);
            document.getElementById("searchOrder").appendChild(badge);
            this.searchOrder();
        },
        showYaml: function () {

            if (this.myYaml.show) {
                console.log('show')

                var obj = yaml.safeLoad(this.myYaml.y);

                try {
                    this.deployDes = obj.description ? obj.description : "";

                    if(obj.source.order && obj.source.zip){

                        $('#mymodal-body').empty();
                        $('#mymodal-body').append("<strong>Inviald Yaml: </strong>");
                        $('#mymodal-body').append("<br><strong>You can't set source.order and source.zip at same time!</strong>")
                        $('#myAlert').modal();

                    }else {

                        if (obj.source.order) {

                        this.sourceOrder = obj.source.order;
                        this.typeSource = '1';

                        } else if (obj.source.zip) {

                        this.sourceOrder = '';
                        this.typeSource = '2';
                        /*  this.source = "";
                         document.getElementById("mySourcelabel").innerHTML = "Choose File";
                         document.getElementById("customFile").value = ""; */
                        }

                        this.chooseSource();
                        this.deployDebug = obj.debug;

                        this.build_c = obj.build.commands ? obj.build.commands.join("\n") : "";
                        this.build_a = obj.build.artifacts ? obj.build.artifacts.join("\n") : "";
                        this.host = obj.build.host ? obj.build.host : "";

                        this.install_c = obj.deploy.install.commands ? obj.deploy.install.commands.join("\n") : "";
                        this.run_c = obj.deploy.run.commands ? obj.deploy.run.commands.join("\n") : "";
                        this.targetDevices = [];

                        for (var i = 0; i < obj.deploy.target.ids.length; i++) {
                            this.targetDevices.push({
                                id: obj.deploy.target.ids[i],
                                tags: this.fullDevices.find(el => el.id == obj.deploy.target.ids[i]).tags,
                            });
                        }

                        this.myYaml.show = false;
                        event.target.innerHTML = 'View Yaml'
                        document.getElementById('newDeployment').style.display = 'grid';
                    }
                   
                } catch (error) {
                    $('#mymodal-body').empty();
                    $('#mymodal-body').append("<strong>Inviald Yaml: </strong>" + error);
                    $('#mymodal-body').append("<br><strong>Please check the syntax!</strong>")
                    $('#myAlert').modal();
                }
            } else {
                console.log('hide')
                event.target.innerHTML = 'View Form'
                this.myYaml.show = true;
                document.getElementById('newDeployment').style.display = 'none';
            }

            let taskDer = this.generateTaskDer();
            this.myYaml.y = yaml.safeDump(taskDer);
        },
        stopOrder: function (order) {

            $('#mymodal-body').empty();
            $('#mymessage-body').empty();
            axios.put(this.address + "/orders/" + order.id + "/stop").then(response => {
                $('#myMessage').modal();
                $('#mymessage-body').append("Stop order with " + order.id + "  " + response.data.message)
            }).catch(error => {
                $('#mymodal-body').append("Stop order with " + order.id + "  " + error)
                $('#myAlert').modal();
            })
        },
        submitDeploy: function () {

            $('#mymodal-body').empty();
            var taskDer = this.generateTaskDer();
            if (this.typeSource == '2') {
                if(this.source){
                    this.source.then(data => {
                    taskDer.source.zip = data;
                    this.handleDeploy(taskDer);
                });
                }
            } else {
                this.handleDeploy(taskDer);
            }

        },
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
        this.$refs.list.style.height = window.innerHeight - 34 - 27 - 32 - 15 - 32 + "px";
        this.$refs.collapseThree.style.height = window.innerHeight - 34 - 27 - 32 - 22 + "px";

        this.address = localStorage.getItem('address');

        /* this.$refs.editor_build_t.editor.setValue("commands:", 1);
           this.$refs.editor_build_t.editor.setOption("highlightActiveLine", false);
        */
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
                var childCount = cluster.getChildCount();
                var childs = cluster.getAllChildMarkers();
                var name = '';

                if (childs.some(c => { return c.options.icon.options.iconUrl == '/error.png' })) {
                    name = 'myCluster-e';
                } else {
                    name = 'myCluster';
                }
                return L.divIcon({
                    html: "<div><span>" + childCount + "</span></div>",
                    className: name,
                    iconSize: new L.Point(40, 40)
                });
            }
        });
        this.map.addLayer(this.markers);

        $('#collapseThree').on('show.bs.collapse', () => {
            this.markers.on('clusterclick', a => {
                a.layer.getAllChildMarkers().forEach(m => {
                    if (!(this.targetDevices.some(e => e.id == m.options.title))) {
                        this.targetDevices.push({
                            id: m.options.title,
                            tags: m.options.alt
                        });
                    }
                })
            })
            this.fullDevices.map(d => {
                d.marker.on('click', event => {
                    if (!this.targetDevices.some(e => e.id === event.target.options.title)) {
                        this.targetDevices.push({
                            id: event.target.options.title,
                            tags: event.target.options.alt
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
.myCommandCard{
    height: 320px;
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
#mytree-body {
  display: grid;
  grid-template-columns: 2.5fr 6fr;
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
    padding: 0px 5px;
    height: 26px;
    border: 1px solid #ced4da;
    border-radius: .25rem 0 0 .25rem;
    width: px;
    width: 110px;
}
@media (min-width: 576px){
    #myTree_dialog, #myTree_dialog2{
        max-width:110% !important;
    }
}
</style>


