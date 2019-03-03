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
                        <img src="../assets/edit.png" style="width:20px">
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
                            <div v-for="device in devices" class="mycard my-card-body" v-show="device.isActive"
                                style="padding:5px;margin-bottom:5px">
                                <div class="mycard-title">Name:</div>
                                <div class="mycard-content">{{device.name}}</div>
                                <div class="mycard-title">Tags:</div>
                                <div class="mycard-content">
                                    <span>
                                        <div v-for="tag in device.tags" class="badge badge-pill badge-primary">{{tag}}
                                        </div>
                                    </span>
                                </div>
                                <div class="mycard-title">Current Task:</div>
                                <div class="mycard-content">operationA-v01</div>

                                <div class="mycard-title">Current Logs:</div>
                                <div></div>
                                <div class="mycard-title">History Tasks:</div>
                                <div></div>
                                <div></div>
                                <div style="text-align:right">
                                    <img src="../assets/terminal.png" style="width:20px;margin-right:5px">
                                    <img src="../assets/edit.png" style="width:20px;margin-right:5px">
                                    <img src="../assets/delete.png" style="width:20px;margin-right:5px">
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
                                    <a @click="removeDevice(device.name)" style="text-align:right">
                                        <img src="../assets/close.png" style="width:20px">
                                    </a>
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
                        <div style="text-align:right;margin-top:5px">
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
</div>
</template>

<script>
import axios from "axios";

function rand(n) {
    let max = n + 0.001;
    let min = n - 0.001;
    return Math.random() * (max - min) + min;
}

export default {
    data() {
        return {
            devices: [],
            tags: [],
            targetDevices: [],
            searchText: ""
        };
    },
    components: {
        editor: require("vue2-ace-editor")
    },
    methods: {
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
                            if (
                                !this.targetDevices.some(e => e.name === this.devices[j].name)
                            ) {
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

        const map = L.map("map").setView([50.749523, 7.20343], 17);
        L.tileLayer(
            "https://api.mapbox.com/styles/v1/jingyan/cj51kol9z1fnm2rmy82k24hqm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamluZ3lhbiIsImEiOiJjajN5dDU5bXUwMDhwMzNwanBxeGZoZDZrIn0.-5_CMLp6GDZYhe-7Ra_w_g",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        ).addTo(map);
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
        axios.get("/device.json")
            .then(response => {
                //console.log(response.data);
                for (let i = 0; i < response.data.total; i++) {
                    let a = response.data.items[i];
                    //This the correct latlng
                    //let marker = L.marker(L.latLng(a.location[0], a.location[1]), {
                    //The latlng is faked
                    let marker = L.marker(L.latLng(rand(50.749523), rand(7.20343)), {
                        icon: L.icon({
                            iconUrl: "/done.png",
                            iconSize: [20, 20]
                        }),
                        title: a.id,
                        alt: a.tags
                    });
                    this.devices.push({
                        name: a.id,
                        tags: a.tags,
                        isActive: true
                    });

                    //console.log(a.tags.length);
                    for (let j = 0; j < a.tags.length; j++) {
                        if (!this.tags.some(e => e.tag === a.tags[j])) {
                            this.tags.push({
                                isActive: true,
                                tag: a.tags[j]
                            });
                        }
                    }
                    //console.log(this.tags);
                    //Markers click function
                    marker.on("click", event => {
                        if (
                            !this.targetDevices.some(
                                e => e.name === event.target.options.title
                            )
                        ) {
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
.mycard {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 2.5px;
  border: 1px solid rgba(0, 0, 0, 0.125);
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
</style>


