<template>
 <div style="width: 100%;padding:20px">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#homeSetting" role="tab" aria-controls="homeSetting"
                aria-selected="true">Project Setting</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
                aria-selected="false">User Management</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact"
                aria-selected="false">My Account</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div id="homeSetting" class="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
            <form action id="projectSetting">
                <div id="mapSetting">
                    <div style="text-align: right">
                        <h6 style="margin:15px 0px">Map Setting</h6>
                    </div>
                    <div></div>
                    <div class="mycard-title">Map Source:</div>
                    <div class="form-group form-inline mycard-content" style="margin-left:5px">
                        <div class="input-group myinput-group">
                            <input class="myInput" type="radio">
                            <label class="myLabel" for>Googple API</label>
                        </div>
                        <div class="input-group myinput-group">
                            <input class="myInput" type="radio">
                            <label class="myLabel" for>MapBox API</label>
                        </div>
                        <div class="input-group myinput-group">
                            <input class="myInput" type="radio">
                            <label class="myLabel" for>Open Street API</label>
                        </div>
                        <div class="input-group myinput-group">
                            <input class="myInput" type="radio">
                            <label class="myLabel" for>Customize</label>
                            <input type="file">
                        </div>
                    </div>
                    <div class="mycard-title">Locaiton Format:</div>
                    <div class="form-group form-inline mycard-content" style="margin-left:5px">
                        <div class="input-group myinput-group">
                            <input class="myInput" type="radio">
                            <label class="myLabel" for>GPS(latitude, logitude)</label>
                        </div>
                        <div class="input-group myinput-group">
                            <input class="myInput" type="radio">
                            <label class="myLabel" for>Point(x,y)</label>
                        </div>
                        <div class="input-group myinput-group">
                            <input class="myInput" type="radio">
                            <label class="myLabel" for>Customize</label>
                            <input type="file">
                        </div>
                    </div>
                    <div class="mycard-title">Map Preview:</div>
                    <div style="grid-column: 1/3;height:360px">
                        <img src="../assets/map.png" style="width:80%; height:100%">
                    </div>
                </div>
                <div></div>
                <div id="tagsSetting">
                    <div style="text-align: right">
                        <h6 style="margin:15px 0px">Tags Setting</h6>
                    </div>
                    <div></div>
                    <div class="mycard-title">Types:</div>
                    <div style="text-align:left">
                        <ul style="display:inline-block;padding-left:5px">
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">drone</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">sensor</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">robot</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">drone</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">sensor</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">robot</button>
                            </li>
                            <li class="my-li" style="display:inline-block;padding-left:5px">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" placeholder="customize">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary btm-sm" type="button">+</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mycard-title">Hardware Architecture:</div>
                    <div style="text-align:left">
                        <ul style="display:inline-block;padding-left:5px">
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">ARM64</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">ARM32</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">8051</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">ARM64</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">ARM32</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">8051</button>
                            </li>
                            <li class="my-li" style="display:inline-block;padding-left:5px">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" placeholder="customize">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary btm-sm" type="button">+</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="mycard-title">Operation System:</div>
                    <div style="text-align:left">
                        <ul style="display:inline-block;padding-left:5px">
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">FreeBSD</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">NetBSD</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">Darwin</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">FreeBSD</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">NetBSD</button>
                            </li>
                            <li class="my-li" style="display:inline-block">
                                <button class="btn btn-primary btn-sm" style="margin:5px;padding:0 5px">Darwin</button>
                            </li>
                            <li class="my-li" style="display:inline-block;">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" placeholder="customize">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary btm-sm" type="button">+</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div class="input-group input-group-sm">
                            <input type="text" style="text-align:right" class="form-control" placeholder="Other Tags:">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary btm-sm" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <div style="padding-left:10px">
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control" placeholder="customize">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary btm-sm" type="button">+</button>
                            </div>
                        </div>
                    </div>
                    <div style="height:300px"></div>
                </div>
            </form>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">API Keys</th>
                        <th scope="col">Read Only</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>mark.example@example.com</td>
                        <td>********</td>
                        <td></td>
                        <td>
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                <label class="custom-control-label" for="customSwitch1"></label>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="margin:0 20px">Edit</button>
                            <button class="btn btn-danger btn-sm" style="margin:0 20px">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Jacob.example@example.com</td>
                        <td>********</td>
                        <td>A!1I-aSyBN5aOLy63n1234iB4ldh#VHoyB0oe8uoRIM</td>
                        <td>
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="customSwitch2">
                                <label class="custom-control-label" for="customSwitch2"></label>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="margin:0 20px">Edit</button>
                            <button class="btn btn-danger btn-sm" style="margin:0 20px">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>Otto@example.com</td>
                        <td>********</td>
                        <td></td>
                        <td>
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="customSwitch3">
                                <label class="custom-control-label" for="customSwitch3"></label>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="margin:0 20px">Edit</button>
                            <button class="btn btn-danger btn-sm" style="margin:0 20px">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Larry</td>
                        <td>Otto@example.com</td>
                        <td>********</td>
                        <td></td>
                        <td>
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="customSwitch4">
                                <label class="custom-control-label" for="customSwitch4"></label>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="margin:0 20px">Edit</button>
                            <button class="btn btn-danger btn-sm" style="margin:0 20px">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Larry</td>
                        <td>Otto@example.com</td>
                        <td>********</td>
                        <td></td>
                        <td>
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="1">
                                <label class="custom-control-label" for="1"></label>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="margin:0 20px">Edit</button>
                            <button class="btn btn-danger btn-sm" style="margin:0 20px">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
            <div id="myAccount">
                <div style="text-align:right">Name:</div>
                <div style="text-align:left">admin</div>
                <div class="mycard-content"><img src="../assets/edit.png" style="width:20px"></div>
                <div style="text-align:right">Email:</div>
                <div style="text-align:left">admin@example.com</div>
                <div class="mycard-content"><img src="../assets/edit.png" style="width:20px"></div>
                <div style="text-align:right">Password:</div>
                <div style="text-align:left">********</div>
                <div class="mycard-content"><img src="../assets/edit.png" style="width:20px"></div>
                <div style="text-align:right">API Keys:</div>
                <div class="mycard-content"><img src="../assets/add.png" style="width:20px"></div>
                <div></div>
                <div style="text-align:right">Account Type:</div>
                <div style="text-align:left">Read Only</div>
                <div></div>
                <div style="grid-column:1/4">
                    <hr>
                </div>
                <div></div>
                <div></div>
                <div style="text-align:left"><img src="../assets/save.png" style="width:20px"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  data() {
    return {
      devices: "../assets/devices.png"
    };
  },
  components: {
    draggable
  }
};
</script>

<style>
#projectSetting {
  display: grid;
  grid-template-columns: 7fr 0.5fr 7fr;
}
#myAccount {
  margin-top:25px;
  display: grid;
  grid-template-columns: 1fr 2.5fr 7.5fr;
  grid-gap: 10px;
}
#mapSetting {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
#tagsSetting {
  display: grid;
  grid-template-columns: 2fr 5fr;
}

.myLabel {
  margin-left: 5px;
}
.myInput {
  margin-top: 2.5px;
}
.myinput-group {
  margin-right: 15px;
}
</style>


