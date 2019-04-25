<template>
    <div class="mappanelContainer">
        <div class="panel">
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
                                    <button type="button" class="btn" style="padding: 0px 5px;border: 1px solid;margin: 0 5px 0 0px;" @click="refresh">
                                        <img src="../assets/refresh.svg" style="width:16px">
                                    </button>
                                    <div class="input-group" style="width:92%;">
                                        <div id="searchTarget"></div>
                                        <input class="dropdown-toggle form-control form-control-sm" type="text" v-model="searchText"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @keyup="filterDevice"
                                            style="font-size: 14px;height: 26px;padding: 5px;">
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
                            </div>                           
                            <div id="deviceList" ref="list" style="overflow:scroll">
                                <div v-for="device in devices" v-show="device.isActive" @click="clickCard(device.marker)" :key="device.id">
                                
                                    <div class="mycard my-card-body" style="padding:5px;margin-bottom:5px">
                                        <div class="mycard-title">Name:</div>
                                        <div class="mycard-content" >{{device.id}}</div>
                                        <div class="mycard-title">Tags:</div>
                                        <div class="mycard-content">
                                            <span>
                                                <button v-for="tag in device.tags" class="badge badge-pill" :class="tag"
                                                    @click="device.relations=showRelationship(tag,device)">{{tag}}
                                                </button>
                                            </span>
                                        </div>
                                        <div class="mycard-title">Latest Task:</div>
                                        <div class="mycard-content" style="font-size:12px">
                                            <span v-if="device.logs.tasks[0][1]!='none'">
                                            {{device.logs.tasks[0][0]}}</span>
                                            </div>
                                        <div class="mycard-title">Latest Logs:</div>
                                        <div v-if="device.logs.tasks[0][1]==true" style="text-align:left">
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px">
                                                <img src="../assets/error.png" style="width:14px;margin-top: -6px;" @click="showLog(device.logs.log,device.logs.tasks[0][0])">
                                            </button>
                                        </div>
                                        <div v-else-if="device.logs.tasks[0][1]==false" style="text-align:left">
                                            <button type="button" class="btn btn-light btn-sm" style="padding: 0 2px">
                                                <img src="../assets/done.png" style="width:14px;margin-top: -6px;" @click="showLog(device.logs.log,device.logs.tasks[0][0])">
                                            </button>
                                        </div>
                                        <div v-else></div>
                                        <div class="mycard-title">History Tasks:</div>
                                        <div>
                                            <div v-if="device.logs.tasks[0][1]!='none'">
                                                <hr style="border: 1px solid #2c3e50;margin:10px 0"> 
                                                <li v-for="task in device.logs.tasks" class="history_li" @click="showLog(device.logs.log, task[0])">    
                                                    {{task[0].substring(0,2)}}  
                                                    <img v-if="task[1]==false" src="../assets/done.png" style="position:relative; top:-39px;width:12px;background-color: #fff; border-radius: 50%" >  
                                                    <img v-else src="../assets/error.png" style="position:relative; top:-39px;width:12px;background-color: #fff; border-radius: 50%" >                
                                                </li>
                                            </div>
                                        </div>
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
                                                <img src="../assets/delete.png" style="width:16px;margin-right:5px" @click="deleteTarget(device.id)">
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
                                        <form class="updateDevice">
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
                                                    <p style="margin:2.5px 0">Type:</p>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                           <input type="checkbox" autocomplete="off"  value="drone"> drone
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox"  autocomplete="off" value="swarm"> swarm
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox"  autocomplete="off" value="robot"> robot
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="input-group">
                                                     <p style="margin:2.5px 0">HW Arch:</p>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox"  autocomplete="off" value="amd64"> amd64
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" autocomplete="off" value="arm32"> arm32
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox"  autocomplete="off" value="mcs51"> mcs51
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="input-group">
                                                     <p style="margin:2.5px 0">OS:</p>
                                                    <div class="btn-group-toggle" data-toggle="buttons">
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox" autocomplete="off" value="freebsd"> freebsd
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                            <input type="checkbox"  autocomplete="off" value="netbsd"> netbsd
                                                        </label>
                                                        <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
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
                <div class="card">
                    <div class="card-header" id="headingTwo">
                        <button class="btn btn-light collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo" style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500">
                            <img src="../assets/edit.png" style="width:20px">
                            Update Devices
                        </button>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body" ref="collapseTwo" style="text-align:left;padding:7.5px; overflow:scroll">
                            <p style="margin-bottom:5px;font-size:14px">Updating Targets:</p>
                            <div style="height:300px; border: 1px solid #e4e4e4; padding: 2.5px;border-radius:2px;overflow: scroll">
                                <div>
                                    <form class="form-inline">
                                        <div class="input-group" style="text-align:left;width:100%;border: 1px solid #ced4da;border-radius:.25rem;">
                                            <div id="searchTarget2"></div>
                                            <input class="dropdown-toggle form-control form-control-sm" type="text"
                                                v-model="searchText2" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false" @keyup="filterDevice" style="font-size: 14px;height: 26px;padding: 5px; border:none">
                                            <div class="input-group-append">
                                                <a class="btn btn-outline-secondary" aria-expanded="true" style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
                                                    @click="searchTarget2">
                                                    <img src="../assets/search.png" style="height:20px">
                                                </a>
                                            </div>
                                            <div class="dropdown-menu" style="padding:2.5px">
                                                    <p class="dropdown-header" style="padding:2px 5px"> <strong> Names:</strong> </p>
                                            <a v-for="device in fullDevices" class="dropdown-item" v-show="device.nameActive" @click="selectItem2(device.id)"
                                                style="font-size:14px;padding:0px 15px">{{device.id}}</a>
                                             <div class="dropdown-divider"></div>
                                             <p class="dropdown-header" style="padding:2px 5px">   <strong> Tags:</strong> </p>
                                            <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive" @click="selectItem2(tag.tag)"
                                                style="font-size:14px;padding:0px 15px">{{tag.tag}}</a>
                    
                                            </div>
                                        </div>
                                    </form>
                                </div>
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
                            <p style="margin-bottom:5px;font-size:14px">This update settings will apply to all selected
                                deivces.</p>
                            <form id="updateTags">
                                <div class="mycard-title">Name Base:</div>
                                <div class="mycard-content">
                                    <div class="form-check input-group">
                                        <input class="form-check-input" type="radio" name="radio" disabled>
                                        <input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;" disabled>
                                        <label>- 1/2/3...</label>
                                    </div>
                                    <div class="form-check input-group">
                                        <input class="form-check-input" type="radio" name="radio" disabled>
                                        <input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;" disabled>
                                        <label class="form-check-label" for="exampleCheck1">- a/b/c...</label>
                                    </div>
                                </div>
                                <div class="mycard-title">Tags:</div>
                                <div class="mycard-content">
                                    <div class="input-group">
                                        <label style="margin-top:2.5px">Type:</label>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="drone"> drone
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="swarm"> swarm
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="robot"> robot
                                            </label>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <label style="margin-top:2.5px">HW Arch:</label>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="amd64"> amd64
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="arm32"> arm32
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="mcs51"> mcs51
                                            </label>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <label style="margin-top:2.5px">OS:</label>
                                        <div class="btn-group-toggle" data-toggle="buttons">
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="freebsd"> freebsd
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="netbsd"> netbsd
                                            </label>
                                            <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                                                <input type="checkbox" autocomplete="off" value="darwin"> darwin
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mycard-title">Location:</div>
                                <div class="mycard-content"> <input type="text" class="form-control form-control-sm"
                                        style="font-size: 14px;height: 22px;padding: 5px;"></div>
                            </form>
                            <div style="text-align:right;margin-top:5px;">
                                <button type="button" class="btn btn-primary" style="font-size:14px;padding: 2.5px 5px;" @click="batchUpdate">Update</button>
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
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div ref="collapseThree" style="overflow:scroll">
                        <div style="margin:10px 12.5px 5px;">
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
        </div>
        <div id="map"  ref="map"></div>
        <div id="myAlert" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
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
         <div id="myMessage" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
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
        <div id="myLog" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div id="myLog-dialog" class="modal-dialog" role="document" style="margin: 50px 100px;">
                <div class="modal-content" style="">
                    <div class="modal-header">
                        <h5 id="logTitle" class="modal-title">Logs for Task:</h5>
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
                                <div id="collapseinstall" class="collapse show" aria-labelledby="headinginstall" style="padding: 0 0px 0px 35px;">
                                  
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
                                <div id="collapserun" class="collapse show" aria-labelledby="headingrun" style="padding: 0 0px 0px 35px;">
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="myTimeline" ref="myTimeline">
               <button ref="pre" class="btn btn-sm btn-light" style="width: 20px;height: 20px;position: relative;float: left;top: 25px;border-radius: 50%;color: rgb(44, 62, 80);border: 2px solid rgb(44, 62, 80);" @click="previous">
                    <span style="left: -5px;font-size: 9px;position: relative;top: -8px;">&#9668;</span> 
                </button> 
                <button ref="next" disabled class="btn btn-sm btn-light"  style="width: 20px;height: 20px;position: relative;float: right;top: 25px;border-radius: 50%;color: rgb(44, 62, 80);border: 2px solid rgb(44, 62, 80);" @click="next">
                    <span style="left: -4px;font-size: 9px;position: relative;top: -8px;">&#9658;</span>
                </button>
               <div style="height:70px; overflow:hidden">
                <hr style="border: 1.5px solid #2c3e50;margin-top: 35px;">
                <div ref="timeline_lis" style="position: relative;top:-54px;width:max-content;float:right">
                    <li v-for="order in orderOrders" class="timeline-li" @click="clickDeployment(order.id)" tabindex="0" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="top" data-html="true" :data-content="'Name: '+ order.id.substring(0,26) + '...<br>'+ 'Description: ' + order.description">
                    <div><strong style="margin-right:5px">{{order.date}}</strong>{{order.time}}</div>
                    <div v-if="order.status">
                        <img v-if="order.status[1]==0 && order.status[0]!=0" src="../assets/done.png" style="width:22px;background-color: #fff; border-radius: 50%" >  
                        <img v-else src="../assets/error.png" style="width:22px;background-color: #fff; border-radius: 50%" >              
                    </div>
                     <!--   <div>{{order.id.substring(0,6)}}</div>  -->
                    </li> 
                </div>
            </div>
        </div>
        <div id="notification"> 
            <div class="mycard-title" style="color:#ffda44; padding:0 5px" >New Discovered:
                <img src="../assets/star.png" style="width:15px"></div>
            <div class="mycard-content">
                 <button type="button" class="btn btn-light btn-sm" style="color:#ffda44; padding: 0 2px" @click="showNewDevices">
                        {{this.newDiscover.length}} 
                </button>
                </div> 
            <div class="mycard-title" style="color:#d80027;padding:0 5px">Failed:
                <img src="../assets/error.png" style="width:15px">
            </div>
            <div class="mycard-content">
                 <button type="button" class="btn btn-light btn-sm" style="color:#d80027;padding: 0 2px" @click="filterDevices('failed')">
                {{this.failed.length}}
                  </button>
                </div>
            <div class="mycard-title" style="color:#00ae31;padding:0 5px">Success:
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
import axios from "axios";
import "leaflet.smooth_marker_bouncing";
import $ from "jquery";
import "@/timeline.js";
import "@/timeline.css";


function rand(n) {
    let max = n + 0.001;
    let min = n - 0.001;
    return Math.random() * (max - min) + min;
}
export default {
    data() {
        return {
            address:"",
            offset:0,
            failed:[],
            success:[],
            newDiscover:[],
            orders:[],
            map: "",
            polyline: "",
            updateOneName: "",
            devices: [],
            fullDevices:[],
            tags: [],
            targetDevices: [],
            markers: [],
            searchText: "",
            searchText2: "",
            terminal: new Date().toUTCString() + ':~'
        };
    },
    components: {
        editor: require("vue2-ace-editor")
    },
    computed: {
        orderOrders: function () {
            //console.log(this.orders)
            return this.orders.sort(function (a, b) {
                return a.finishedAt - b.finishedAt
            })
        }
    },
    methods: {
        batchUpdate: function () {

            let input = document.getElementById('updateTags').getElementsByTagName('input'); 
            let myUpdate = {
                tags:[],
                location:{
                    lon: parseFloat(input[input.length-1].value.split(',')[0]),
                    lat: parseFloat(input[input.length-1].value.split(',')[1])
                }
            }
            Array.from(input).map(item =>{
                if(item.checked){
                    myUpdate.tags.push(item.value)
                }
            });
            $('#mymodal-body').empty();
            $('#mymessage-body').empty();
      
            //console.log(myUpdate);
            this.targetDevices.forEach(el=>{
                axios.put(this.address+"/targets/" + el.id, myUpdate).then(response=>{
                    //console.log(response)
                    $('#myMessage').modal();
            
                    $("#collapseOne").collapse("show");
                    $('#mymessage-body').append("Update target with "+ el.id + "  " + response.statusText + "<br>")
                    //console.log(this.devices.length)
                }
            ).catch(error => {
                $('#myAlert').modal();
                $('#mymodal-body').append("Update target with " + el.id + "  " + error);
                });
            });

            
        },
        closeModal: function () {

            this.devices = [];
            this.fullDevices = [];
            this.failed = [];
            this.success = [];
            this.markers.clearLayers();
            this.getTargets();

        },
        checkLogs: function (target) {
            var des = "target=" + target;
            return axios.get(this.address+"/logs?perPage=1000&sortOrder=desc&" + des).then(function (response) {

                if (response.data.items) { 
                    let fulltask = new Set();
                    response.data.items.forEach(el => {
                        fulltask.add(el.task)
                    });
                    let task = Array.from(fulltask).slice(0,15);

                    //console.log(task)
                    let tasks = task.map(t =>{
                         let lastLog = response.data.items.filter(el => el.task == t); 
                         if (lastLog.some(el => el.error == true)) {
                             return t = [t,true]
                        }else{
                             return t = [t,false]
                        }
                    });
                    return {
                            tasks: tasks,
                            log: response.data.items.reverse(),
                   }
                } else {
                    return {
                        tasks:[['','none']],
                        log: [],
                    };
                }
            }).catch(error => {
                console.log(error);
            });
        }, 
        clickDeployment: function (id) {

                this.map.eachLayer(layer=> {
                        if (layer instanceof L.Marker) {
                            this.map.removeLayer(layer);
                        }
                }); 
                if(this.polyline){
                    this.polyline.remove();
                }
                this.markers.clearLayers();
                this.devices = [];
                var filteredData = this.orders.find((i, n)=> { 
                    return i.id === id
                });
                //console.log(filteredData)
                if(filteredData.deploy){
                    filteredData.deploy.match.list.forEach(el=>{
                          var d = this.fullDevices.find(function (de) {
                            return de.id === el      
                          })
                    this.devices.push(d);      
                   this.markers.addLayer(d.marker);
                })
                }
                this.map.addLayer(this.markers)
                this.map.fitBounds(this.markers.getBounds());
                //console.log(filteredData);
                //markerGroup.addTo(map);
        },  
        clickCard: function (marker) {  
             this.map.panTo(marker.getLatLng());
        },
        closeSearch: function () {
            //console.log(document.getElementById("collapseTwo").className)
            if (document.getElementById("collapseTwo").className == "collapse") {
                document.getElementById("search").style.display = "none";
            } else {
                document.getElementById("search").style.display = "inline";
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
        deleteTarget: function (id) {
         
            $('#mymodal-body').empty();
            $('#mymessage-body').empty();

            axios.delete(this.address+"/targets/" + id).then(
                response => {
                    let index = this.devices.indexOf(this.devices.find(el => el.id === id));
                    this.devices.splice(index, 1);
                    this.failed = [];
                    this.success = [];
                    this.devices.forEach(el=>{
                        if(el.logs.error == true){
                            this.failed.push(el);
                        }else{
                            this.success.push(el); 
                        }
                    })
                    //console.log(response)
                    $('#myMessage').modal();
                    $('#mymessage-body').append("Delete target with " + id + "  " + response.statusText)
                    //console.log(this.devices.length)
                }
            ).catch(error => {
                $('#myAlert').modal();
                $('#mymodal-body').append("Delete target with " + id + "  " + error);
            })
            
        },
        //Search device
        filterDevice: function () {
            var value = this.searchText.toLowerCase();
            this.tags.forEach(function (tag) {
                if (!(tag.tag.toLowerCase().indexOf(value) > -1)) {
                    tag.isActive = false;
                } else {
                    tag.isActive = true;
                }
            });
            this.fullDevices.forEach(d=>{
                 if (!(d.id.toLowerCase().indexOf(value) > -1)) {
                    d.nameActive = false;
                } else {
                    d.nameActive = true;
                }
            })
        },
        //Click notification card item and filtering device
        filterDevices: function (para) {
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
            this.markers.clearLayers()
            this.devices.forEach(d=>{
                this.markers.addLayer(d.marker)
            });
            this.map.fitBounds(this.markers.getBounds())
        },
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
        getFinishTime: function (id) {
            //Request the latest logs time
            return axios.get(this.address+"/logs?task=" + id + "&perPage=1&sortOrder=desc").then(response => {
                //console.log(response.data)
                return response.data.items[0].time;
            }).catch(error => {
                console.log(error);
            })
            //return new Date(1551800395755).toLocaleString();
        },
        getOrders: function () {
            //http://"+this.address+"/orders
            // /deployment.json
            axios.get(this.address+"/orders").then(response => {
                //console.log(this.orders)
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
         
                    //a.date= day+'-'+ month + ' ' +date.getHours()+ ':'+ minute;
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
            //http://"+this.address+"/targets
            // /device.json
            //console.log(this.devices);
            axios.get(this.address+"/targets").then(response => {
                //console.log(response.data);
                for (let i = 0; i < response.data.total; i++) {

                    let a = response.data.items[i];
                    a.isActive = true;
                    a.relations = true;
                    a.nameActive = true;
                   
                    if (!a.location) {
                        a.location = {
                            lon: rand(50.749523),
                            lat: rand(7.203923),
                        }
                    }
                    let icon ="";
                    let marker = L.marker(L.latLng(a.location.lon, a.location.lat), {
                        title: a.id,
                        alt: a.tags ? a.tags : []
                    })
                    a.marker = marker;
             
                    this.checkLogs(a.id).then(data => {
                        a.logs = data;                 
                        if(data.tasks[0][1] == true){
                            this.failed.push(a);
                            marker.setIcon(L.icon({
                                iconUrl: "/error.png",
                                iconSize: [20, 20]
                            }))
                        }else{
                            this.success.push(a); 
                            marker.setIcon(L.icon({
                                iconUrl: "/done.png",
                                iconSize: [20, 20]
                            }))
                        }
                        this.devices.push(a);
                        this.fullDevices.push(a);
                    }); 
                   
                   //console.log(this.devices)
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
                    //console.log(this.tags);
                    //Markers click function
                    marker.bindPopup('<div>Name: ' + a.id + '</div><div>Tags: ' + tags + '</div>');
                    marker.on("click", event => {
                        marker.openPopup();
                        if(this.polyline){
                            this.polyline.remove();
                        }
                        this.devices.splice(0,this.devices.length, a);       
                    });
                    this.markers.addLayer(marker);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        handelNewDiscover: function (devices) {
           /*  console.log(devices)
            for (let i = 0; i < devices.length; i++) { */
                    let a = devices;
                    a.isActive = true;
                    a.relations = true;
                    //console.log(a);
                    if (!a.location) {
                        a.location = {
                            lon: rand(50.749523),
                            lat: rand(7.203923),
                        }
                    }
                    let marker = L.marker(L.latLng(a.location.lon, a.location.lat), {
                        icon: L.icon({
                            iconUrl: "/star.png",
                            iconSize: [20, 20]
                        }),
                        title: a.id,
                        alt: a.tags ? a.tags : []
                    })
                    a.marker = marker;
                    a.logs = {
                        tasks:[['','none']],
                        log:[],
                        //error: "none"
                    };
                    this.newDiscover.push(a);
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
                    marker.bindPopup('<div>Name: ' + a.id + '</div><div>Tags: ' + tags + '</div>');
                    marker.on("click", event => {
                        marker.openPopup();
                        if(this.polyline){
                            this.polyline.remove();
                        }
                        this.devices.splice(0,this.devices.length, a);
                        if (!this.targetDevices.some(
                            e => e.id === event.target.options.title
                        )) {
                            this.targetDevices.push({
                                id: event.target.options.title,
                                tags: event.target.options.alt
                            });
                        }
                    });
        },
        hideTerminal: function (e) {
            e.path[4].childNodes[0].style.display = 'grid';
            e.path[4].childNodes[1].style.display = 'none';
            //console.log(e.path)
        },
        hideEdit: function (e) {
            e.path[5].childNodes[0].style.display = 'grid';
            e.path[5].childNodes[2].style.display = 'none';
        },
        next: function () {
            if(this.offset > 0){
                this.$refs.pre.disabled=false;
                this.offset -= 100;
                this.$refs.timeline_lis.style.transform = 'translateX('+ this.offset +'px)'; 
                this.$refs.timeline_lis.style.transition = 'all .6s'; 
            }else{
                    if(this.offset <=0){
                         this.$refs.next.disabled=true;
                    }else{
                         this.$refs.pre.disabled=true;
                }           
            }   
        },
        previous: function () {
           
            if(this.$refs.timeline_lis.offsetWidth-this.offset > (this.map.getSize().x - 20)){
                this.offset += 100;
                this.$refs.timeline_lis.style.transform = 'translateX('+ this.offset +'px)';
                this.$refs.timeline_lis.style.transition = 'all .6s'; 
                this.$refs.next.disabled=false
            }else{
                if(this.offset >= 0){
                     this.$refs.pre.disabled=true;
                }else{
                     this.$refs.next.disabled=true;
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
          this.devices=[];
          this.fullDevices=[];
          this.failed=[];
          this.success=[];
          this.newDiscover=[];
          this.markers.clearLayers();
          this.getTargets();
        },
        // All device -> search devices
        searchTarget: function () {
            var tagsNodes = document.getElementById("searchTarget").childNodes;
            //console.log(tagsNodes);
            this.devices = this.fullDevices;
            this.devices.map( d=>{
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
        //Update device -> search devices
        searchTarget2: function () {

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
                                //console.log(i, j, m);
                            }
                        }
                    }
                }
            }
        },
        selectItem: function (tag) {
            this.searchText="";
            var badge = this.createBadge(tag);
            document.getElementById("searchTarget").appendChild(badge);
            this.searchTarget()
        },
        selectItem2: function (tag) {
            this.searchText2="";
            var badge = this.createBadge(tag);
            document.getElementById("searchTarget2").appendChild(badge);
            this.searchTarget2()
        },
        showEditForm: function (device) {
            event.path[3].style.display = 'none';
            event.path[4].childNodes[2].style.display = 'inline';
            //console.log(event.path[4].childNodes[2].childNodes[0].childNodes[8].childNodes[0])
            event.path[4].childNodes[2].childNodes[0].childNodes[2].childNodes[0].value= device.id;
            if(device.tags){
                 device.tags.map(item => {
                let tag = event.path[4].childNodes[2].childNodes[0].childNodes[5];
                  Array.from(tag.getElementsByTagName('label')).forEach(el => {
                    //console.log(el.childNodes[0].value, item)
                    if(el.childNodes[0].value == item){
                         el.childNodes[0].checked = "true"
                         el.setAttribute('class','btn btn-light active');
                    }
                })
            })
            }
            event.path[4].childNodes[2].childNodes[0].childNodes[8].childNodes[0].value= [device.location.lon,device.location.lat];
        }, 
        showLog: function (log,id) {

            $("#logTitle").empty();
            $("#collapsebuild").empty().collapse('show');
            $("#collapseinstall").empty().collapse('show');
            $("#collapserun").empty().collapse('show');

            $("#logTitle").append('Logs of Task: '+id);

            let logs =  log.filter(el => el.task == id)
            for(let i =1; i<logs.length;i++){
                let command = logs[i].command == logs[i-1].command? '': logs[i].command;
                if (logs[i].error == true) {
                    $("#collapse" + logs[i].stage).append('<div class="mycollapse"><div class="myfont_f">' + new Date(logs[i].time).toLocaleString() +'</div><div class="myfont_f">' + logs[i].output + '</div><div class="myfont_f">' + command + '</div> </div> ')
                } else {
                    $("#collapse" + logs[i].stage).append('<div class="mycollapse"><div class="myfont_s">' + new Date(logs[i].time).toLocaleString() + '</div><div class="myfont_s">' + logs[i].output + '</div><div class="myfont_t">' + command + '</div> </div> ')
                }
            }
            $("#myLog").modal();
        },       
        showNewDevices: function () {
            
            event.path[2].childNodes[0].style.background = '#ececec';
            event.path[2].childNodes[1].style.background = '#ececec';
            event.path[2].childNodes[2].style.background = '#fff';
            event.path[2].childNodes[3].style.background = '#fff';
            event.path[2].childNodes[4].style.background = '#fff';
            event.path[2].childNodes[5].style.background = '#fff';
          
            this.devices = this.newDiscover;
              console.log(this.devices)
            this.newDiscover = [];
            this.markers.clearLayers();
            this.devices.map(item=>{
                this.markers.addLayer(item.marker)
            })
            //console.log(this.devices);
        },
        showRelationship: function (tag, device) {
            //console.log()
            //device.marker.bounce(4);
            device.marker.openPopup()
            if (this.polyline) {
                this.polyline.remove();
                this.polyline = "";
            }
            if (device.relations == true) {

                var latlngs = [];
                this.devices.forEach(function (target) {
                 
                    if (target.tags && target.tags.some(el => el == tag)) {
                        latlngs.push([
                            [target.location.lon, target.location.lat],
                            [device.location.lon, device.location.lat]])
                    }
                });
                let color;
                switch (tag) {
                    case 'amd64':
                        color = "#376b6d";
                        break;
                    case 'swarm':
                        color = "#42602d";
                        break;
                        case 'darwin':
                        color = "#f17c67";
                        break;
                        case 'netbsd':
                        color = "#b54434";
                        break;
                        case 'freebsd':
                        color = "#cc543a";
                        break;
                        case 'mcs51':
                        color = "#58b2dc";
                        break;
                        case 'arm32':
                        color = "#0d5661";
                        break;
                        case 'robot':
                        color = "#36563c";
                        break;
                        case 'drone':
                        color = "#516E41";
                        break;
                }
                this.polyline = L.polyline(latlngs,
                    {
                        color: color,
                        weight: 2,
                    }).addTo(this.map);
                //console.log(this.polyline)
                this.map.fitBounds(this.polyline.getBounds());

                //console.log(polyline)
            }
            return device.relations ? false : true;
        }, 
        showTerminal: function (e) {
            e.path[3].style.display = 'none';
            e.path[4].childNodes[1].style.display = 'inline'
            //console.log(e.path)
        },
        submitEdit: function (id) {

            let input= event.path[2].getElementsByTagName('input'); 
            let myUpdate = {
                id: input[0].value,
                tags:[],
                location:{
                    lon: parseFloat(input[input.length-1].value.split(',')[0]),
                    lat: parseFloat(input[input.length-1].value.split(',')[1])
                }
            }
            Array.from(input).map(item =>{
                if(item.checked){
                    myUpdate.tags.push(item.value)
                }
            });
            $('#mymodal-body').empty();
            $('#mymessage-body').empty();
            //console.log(myUpdate)
            event.path[4].childNodes[0].style.display = 'grid';
            event.path[4].childNodes[2].style.display = 'none';

            axios.put(this.address+"/targets/" +id, myUpdate).then(response=>{

                    let i = this.devices.findIndex(el =>el.id == id);

                    this.devices[i].marker.setLatLng(L.latLng(myUpdate.location.lon, myUpdate.location.lat));
                    this.devices[i].marker.title = myUpdate.id;
                    this.devices[i].marker.alt = myUpdate.tags;

                    this.map.panTo(this.devices[i].marker.getLatLng())
                    
                    this.$set(this.devices[i], 'id', myUpdate.id);
                    this.$set(this.devices[i], 'tags', myUpdate.tags);
                    this.$set(this.devices[i], 'location', myUpdate.location);
                    //this.$set(this.devices[i], 'marker', marker)
                    
                    $('#myMessage').modal();
                    $('#mymessage-body').append("Update target with " + id + "  " + response.statusText)
                    //console.log(this.devices.length)
                }
            ).catch(error => {
                $('#myAlert').modal();
                $('#mymodal-body').append("Update target with " + id + "  " + error);
            });
            //console.log(event.path)
        },
        submitTerminal: function () {
            //Post one line command
            //console.log(this.terminal.split('\n'));
        },
    },
    mounted() {

        this.$refs.map.style.height = window.innerHeight + "px";
        this.$refs.list.style.height = window.innerHeight-32-32-32-27-34-15 + "px";
        this.$refs.collapseTwo.style.height = window.innerHeight-32-32-32-34-5 + "px";
        this.$refs.collapseThree.style.height = window.innerHeight-32-32-32-34-5 + "px";  

        this.address = localStorage.getItem('address');
        
        this.map = L.map("map").setView([45.749523, 18.20343],5);
        this.$refs.myTimeline.style.width = this.map.getSize().x - 20 +'px'
        //console.log(this.$refs.map.style.width)
        //Custermize the markerCluster style
        var i =0;
        this.markers = L.markerClusterGroup({
            spiderLegPolylineOptions: {
                weight: 1,
                color: "#222",
                opacity: 0.1
            },
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();
                var childs = cluster.getAllChildMarkers();
                var name='';
                
                if(childs.some(c=> {return c.options.icon.options.iconUrl =='/error.png'})){
                    name ='myCluster-e';
                }else{
                    name = 'myCluster';
                }         
                return L.divIcon({
                    html: "<div><span>" + childCount + "</span></div>",
                    className:name,
                    iconSize: new L.Point(40, 40)
                });
            }
        });
        //this.markers.refreshClusters();
        this.getTargets();
        this.getOrders();
       
        //console.log(this.devices)

        if(this.address.indexOf('https')>-1){
            var ws = new WebSocket("wss://" + this.address.substring(7) + "/events?topics=targetAdded");
        }else{
            var ws = new WebSocket("ws://" + this.address.substring(7) + "/events?topics=targetAdded");
        }
        ws.onopen = function () {
            console.log("Socket connected.");
        };
        ws.onmessage = event => {
            //console.log(event.data);
            var obj = JSON.parse(event.data);
            this.handelNewDiscover(obj.payload);
            console.log("new device!")
        };
        ws.onclose = function () {
                    console.log("Socket disconnected.");
                    $("#mylog").prepend("<p>WebSocket Disconnected!</p>");
                    // If socket disconnected, try to connect again after 5s.
                    /* setTimeout(function () { listen(1, true);}, 5000); */
        };

        L.tileLayer(
            "https://api.mapbox.com/styles/v1/jingyan/cj51kol9z1fnm2rmy82k24hqm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamluZ3lhbiIsImEiOiJjajN5dDU5bXUwMDhwMzNwanBxeGZoZDZrIn0.-5_CMLp6GDZYhe-7Ra_w_g",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(this.map);
    
        this.map.addLayer(this.markers); 

        $('#collapseTwo').on('show.bs.collapse', ()=> {
            this.markers.on('clusterclick', a =>{
                a.layer.getAllChildMarkers().forEach(m =>{
                    if (!(this.targetDevices.some(e => e.id == m.options.title))) {
                        this.targetDevices.push({
                            id: m.options.title,
                            tags: m.options.alt
                        });
                    }
                })
            })
            this.fullDevices.map(d =>{
                d.marker.on('click', event =>{
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
#myTimeline{
    position: absolute;
    bottom: 0px;
    right: 5px;
    z-index: 1000;
    overflow: hidden;
    background-color: #ffffff96;
    border-radius: 5px
}
.timeline-li{
    height: 68px;
    padding-top: 5px;
    font-size: 14px;
    list-style: none;
    width: 100px;
    position: relative;
    float: left;
    cursor: pointer;
}
.timeline-li:focus, .timeline-li:active{
    border: 1px solid #00000033;
    border-radius: 5px;
    background-color: #ffffff;
    outline: none;
}
#notification{
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1000;
    display:grid;
    grid-template-columns: 6fr 1fr;
    padding: 2.5px 5px;
    font-size: 14px;
    list-style: none;
    background-color: #fff;
    box-shadow: 0 1px 1px #8e8e8e50
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
.updateDevice {
  display: grid;
  grid-template-columns: 0.7fr 4fr 0.5fr;
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
}
.mybtn{
    font-size: 13px;
    padding: 0 5px;
    margin: 0 2.5px
}
.mycard {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
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
  font-size: 15px;
  padding-right:5px
}
.mycard-content {
  text-align: left;
  font-size: 14px;
}
.card-header {
  width: 400px;
}

#headingOne,
#headingTwo,
#headingThree {
  padding: 0;
  width: 100%
}
.amd64{
    color: #fff;
    background-color: #376b6d;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.swarm{
    color: #fff;
    background-color: #42602d;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.drone{
    color: #fff;
    background-color: #516E41;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.robot{
    color: #fff;
    background-color: #36563c;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.arm32{
    color: #fff;
    background-color: #0d5661;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.mcs51{
    color: #fff;
    background-color: #58b2dc;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.freebsd{
    color: #fff;
    background-color: #cc543a;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.netbsd{
    color: #fff;
    background-color: #b54434;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.darwin{
    color: #fff;
    background-color: #f17c67;
    border: 1px solid transparent;
    margin-right:2.5px;
}
.swarm:hover, .amd64:hover, .darwin:hover, .arm32:hover, .freebsd:hover, .netbsd:hover, .robot:hover,.drone:hover, .mcs51:hover{
    cursor: pointer;
}
.myTerminal{
  background-color: black;
  color: white;
  font: 11.5px Inconsolata, monospace;
  text-shadow: 0 0 5px #C8C8C8;
}
@media (min-width: 576px){
    #myLog-dialog{
        max-width:110% !important;
    }
}
</style>


