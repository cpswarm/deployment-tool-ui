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
                <input
                  class="dropdown-toggle form-control form-control-sm"
                  v-model="deployText"
                  type="text"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  @keyup="filterDevice"
                  style="font-size: 14px;height: 26px;padding: 5px;"
                >
                <div class="input-group-append">
                  <a
                    class="btn btn-outline-secondary"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
                  >
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
          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="searchDevice"
            data-parent="#accordionExample"
          >
            <div style="padding:5px">
              <div id="deviceList">
                <div
                  v-for="order in orders"
                  class="mycard card-body"
                  style="padding:5px;margin-bottom:5px"
                >
                  <div class="mycard-title">Name:</div>
                  <div class="mycard-content">{{order.name}}</div>
                  <div class="mycard-title">Devices:</div>
                  <div class="mycard-content">
                    <img src="../assets/search.png" style="width:16px">
                  </div>
                  <div class="mycard-title">Created Time:</div>
                  <div class="mycard-content">{{Date(order.createdAt)}}</div>
                  <div class="mycard-title">Finished Time:</div>
                  <div class="mycard-content"></div>
                  <div class="mycard-title">Commands:</div>
                  <div class="mycard-content">
                    <button
                      type="button"
                      class="btn btn-light btn-sm"
                      style="padding: 0 2px;"
                      @click="order.commands.isAcitve ? order.commands.isAcitve= false: order.commands.isAcitve=true"
                    >
                      <img src="../assets/search.png" style="width:16px">
                    </button>
                  </div>
                  <div class="myCommand" v-show="order.commands.isAcitve">
                    <div class="mycom-title">Build:</div>
                    <div class="mycom-content" style="color:#00AE31">commands:</div>
                    <div></div>
                    <div>
                      <div v-if="order.commands.b.commands">
                        <div
                          v-for="c in order.commands.b.commands"
                          class="mycom-content"
                          style="color:#2E51AB"
                        >-{{c}}</div>
                      </div>
                    </div>
                    <div class="mycom-title">Install:</div>
                    <div class="mycom-content" style="color:#00AE31">commands:</div>
                    <div></div>
                    <div v-if="order.commands.c.install.commands">
                      <div
                        v-for="c in order.commands.c.install.commands"
                        class="mycom-content"
                        style="color:#2E51AB"
                      >-{{c}}</div>
                    </div>

                    <div class="mycom-title">Run:</div>
                    <div class="mycom-content" style="color:#00AE31">commands:</div>
                    <div></div>
                    <div v-if="order.commands.c.run.commands">
                      <div
                        v-for="c in order.commands.c.run.commands"
                        class="mycom-content"
                        style="color:#2E51AB"
                      >-{{c}}</div>
                    </div>
                    <div class="mycom-title">Target:</div>
                    <div class="mycom-content" style="color:#00AE31">ids:</div>
                    <div></div>
                    <div>
                      <div
                        v-for="t in order.commands.c.target.ids"
                        class="mycom-content"
                        style="color:#2E51AB"
                      >{{t}}</div>
                    </div>

                    <div></div>
                    <div class="mycom-content" style="color:#00AE31">tags:</div>
                    <div></div>
                    <div>
                      <div
                        v-for="t in order.commands.c.target.tags"
                        class="mycom-content"
                        style="color:#2E51AB"
                      >{{t}}</div>
                    </div>
                  </div>
                  <div></div>
                  <div style="text-align: right">
                    <img src="../assets/duplicate.png" style="width:20px">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree" style="text-align:left">
            <button
              class="btn btn-light collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style="padding:2.5px 7.5px;width:100%;text-align:left;font-weight:500"
            >
              <img src="../assets/add.png" style="height:20px">
              Add New Deployment
            </button>
          </div>
          <div
            id="collapseThree"
            class="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div class="card-body" style="padding:7.5px">
              <h6 style="text-align:left">
                <img src="../assets/duplicate.png" style="width:20px;margin-right:5px">
                <a style="font-size:15px">Duplicate one exsiting deployment</a>
              </h6>
              <form id="newDeployment">
                <div class="mycard-title" style="text-align:right">Name:</div>
                <div class="mycard-content">
                  <input
                    v-model="deployName"
                    type="text"
                    class="form-control form-control-sm"
                    style="font-size: 14px;height: 22px;padding: 5px;"
                  >
                </div>
                <div class="mycard-title" style="text-align:right">Source:</div>
                <div>
                  <div class="custom-file" style="height:22px">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      multiple
                      webkitdirectory
                      @change="handleFileSelect"
                    >
                    <label
                      id="mySourcelabel"
                      class="custom-file-label"
                      for="customFile"
                      style="text-align: left;height: 22px;padding: 0px; font-size: 14px;"
                    >Choose file</label>
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
                      <editor
                        ref="editor_build_c"
                        v-model="build_c"
                        @init="editorInit"
                        lang="golang"
                        theme="github"
                        width="100%"
                        height="70"
                      ></editor>
                    </div>
                    <div>
                      <editor
                        ref="editor_build_a"
                        v-model="build_a"
                        @init="editorInit"
                        lang="golang"
                        theme="github"
                        width="100%"
                        height="70"
                      ></editor>
                    </div>
                  </div>
                  <div class="input-group">
                    <label
                      style="padding: 5px;margin-left: 41px;margin-bottom: 0px;font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;color: black;"
                    >host:</label>
                    <input
                      type="text"
                      v-model="host"
                      class="dropdown-toggle form-control form-control-sm"
                      style="border-radius: .2rem; height:22px"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      @keyup="filterHost"
                    >
                    <div class="dropdown-menu" style="padding:2.5px">
                      <a
                        v-for="device in devices"
                        class="dropdown-item"
                        v-show="device.hostActive"
                        @click=" host = device.name "
                        style="font-size:14px;padding:0px 15px"
                      >{{device.name}}</a>
                    </div>
                  </div>
                </div>
                <div class="mycard-title" style="text-align:right">Install:(optional)</div>
                <div class="mycard-content" style="background: #ececec;text-align:left">
                  <div>
                    <editor
                      ref="editor_install_c"
                      v-model="install_c"
                      @init="editorInit"
                      lang="golang"
                      theme="github"
                      width="100%"
                      height="70"
                    ></editor>
                  </div>
                </div>
                <div class="mycard-title" style="text-align:right">Run:</div>
                <div class="mycard-content" style="background: #ececec;text-align:left">
                  <div>
                    <editor
                      ref="editor_run_c"
                      v-model="run_c"
                      @init="editorInit"
                      lang="golang"
                      theme="github"
                      width="100%"
                      height="70"
                    ></editor>
                  </div>
                </div>
                <div class="mycard-title" style="text-align:right">Target:</div>
                <div
                  class="mycard-content"
                  style="grid-column: 1/3; border: 1px solid grey;border-style:dashed"
                >
                  <form class="form-inline">
                    <div
                      class="input-group"
                      style="width:100%;border: 1px solid #ced4da;border-radius:.25rem;"
                    >
                      <div id="searchTarget"></div>
                      <input
                        class="dropdown-toggle form-control form-control-sm"
                        type="text"
                        v-model="searchText"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        @keyup="filterDevice"
                        style="font-size: 14px;height: 26px;padding: 5px; border:none"
                      >
                      <div class="input-group-append">
                        <a
                          class="btn btn-outline-secondary"
                          aria-expanded="true"
                          style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
                          @click="searchTarget"
                        >
                          <img src="../assets/search.png" style="height:20px">
                        </a>
                      </div>

                      <div class="dropdown-menu" style="padding:2.5px">
                        <a
                          v-for="tag in tags"
                          class="dropdown-item"
                          v-show="tag.isActive"
                          @click="selectItem(tag.tag)"
                          style="font-size:14px;padding:0px 15px"
                        >{{tag.tag}}</a>
                      </div>
                    </div>
                  </form>
                  <div style="height:350px;overflow: scroll">
                    <div v-for="device in targetDevices" class="simpleDeviceCard">
                      <div class="input-group" style="padding:2.5px;">Name:
                        <div style="padding:0 2.5px;display:inline-block;width:80%">{{device.name}}</div>
                        <a @click="removeDevice(device.name)" style="text-align:right">
                          <img src="../assets/close.png" style="width:20px">
                        </a>
                      </div>
                      <div class="input-group" style="padding:2.5px">Tags:
                        <div
                          v-for="tag in device.tags"
                          style="padding: 2.5px; margin: 0 2.5px;line-height: 1.5;"
                          class="badge badge-secondary"
                        >{{tag}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
                <div style="text-align:right">
                  <button
                    class="btn btn-primary"
                    @click="submitDeploy"
                    type="button"
                    style="font-size:14px;padding: 2.5px 5px;"
                  >Deploy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="map" style="width:800px" ref="map"></div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import JSZip from "jszip";
import Axios from "axios";
import yaml from "js-yaml";
import editor from "vue2-ace-editor";
function rand(n) {
  let max = n + 0.001;
  let min = n - 0.001;
  return Math.random() * (max - min) + min;
}
function setCommands(arr) {
  var newarr = arr.split("\n");

  return newarr;
}

export default {
  data() {
    return {
      deployText: "",
      deployName: "",
      deployDebug: "",
      source: "",
      build_c: "",
      build_a: "",
      install_c: "",
      run_c: "",
      searchText: "",
      host: "",
      devices: [],
      targetDevices: [],
      tags: [],
      orders: []
    };
  },
  components: {
    editor: require("vue2-ace-editor")
  },
  methods: {
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/golang");
      require("brace/mode/javascript");
      require("brace/mode/less");
      require("brace/theme/github");
      require("brace/snippets/javascript");
    },
    submitDeploy: function() {
      let ids = [];
      let tags = [];
      for (let i = 0; i < this.targetDevices.length; i++) {
        ids.push(this.targetDevices[i].name);
        this.targetDevices[i].tags.forEach(function(el) {
          if (!tags.some(e => e == el)) {
            tags.push(el);
          }
        });
      }
      var myYaml;
      var taskDer = {
        source: {
          zip:
            "UEsDBAoAAAAAAOp8WU4AAAAAAAAAAAAAAAAIAAAAcGFja2FnZS9QSwMECgAAAAAA6nxZTsMMtIOLAAAAiwAAABkAAABwYWNrYWdlL2NvdW50X3RvX3RocmVlLmdvcGFja2FnZSBtYWluCgppbXBvcnQgKAoJImZtdCIKCSJ0aW1lIgopCgpmdW5jIG1haW4oKSB7Cglmb3IgaSA6PSAxOyBpIDw9IDM7IGkrKyB7CgkJZm10LlByaW50bG4oImhlbGxvIiwgaSkKCQl0aW1lLlNsZWVwKHRpbWUuU2Vjb25kKQoJfQp9ClBLAQIUAAoAAAAAAOp8WU4AAAAAAAAAAAAAAAAIAAAAAAAAAAAAEAAAAAAAAABwYWNrYWdlL1BLAQIUAAoAAAAAAOp8WU7DDLSDiwAAAIsAAAAZAAAAAAAAAAAAAAAAACYAAABwYWNrYWdlL2NvdW50X3RvX3RocmVlLmdvUEsFBgAAAAACAAIAfQAAAOgAAAAAAA=="
        },
        build: {
          commands: setCommands(this.build_c.substring(12)),
          artifacts: setCommands(this.build_a.substring(13)),
          host: this.host
        },
        deploy: {
          install: {
            commands: setCommands(this.install_c.substring(12))
          },
          run: {
            commands: setCommands(this.run_c.substring(12))
          },
          target: {
            ids: ids,
            tags: tags
          }
        },
        debug: this.deployDebug
      };
      /*  if (this.source) {
        this.source.then(function(data) {
          taskDer.source.zip = data;
          myYaml = yaml.safeDump(taskDer);
          //console.log(myYaml);
          //http://reely.fit.fraunhofer.de:8080/targets
          //Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
          Axios.post("/deployment.json", myYaml)
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      } */
      myYaml = yaml.safeDump(taskDer);
      console.log(myYaml);
      Axios.post("http://reely.fit.fraunhofer.de:8080/orders", myYaml)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

      myYaml = yaml.safeDump(taskDer);
      //console.log(myYaml);

      //"source:\nzip:"+ this.source.value + "\n"this.deployDebug.value + this.build_c + this.build_a + this.host+ this.install_c+this.run_c +ids;
    },
    removeDevice: function(name) {
      for (var i = 0; i < this.targetDevices.length; i++) {
        //console.log(this.targetDevices[i].name, name);
        if (this.targetDevices[i].name == name) {
          this.targetDevices.splice(i, 1);
        }
      }
      //console.log(this.targetDevices);
    },
    filterHost: function() {
      var value = this.host.toLowerCase();
      this.devices.forEach(function(device) {
        if (!(device.name.toLowerCase().indexOf(value) > -1)) {
          device.hostActive = false;
        } else {
          device.hostActive = true;
        }
      });
    },
    filterDevice: function() {
      var value = this.searchText.toLowerCase();
      this.tags.forEach(function(tag) {
        if (!(tag.tag.toLowerCase().indexOf(value) > -1)) {
          tag.isActive = false;
        } else {
          tag.isActive = true;
        }
      });
    },
    searchTarget: function() {
      var tagsNodes = document.getElementById("searchTarget").childNodes;

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
            /* for (var m = 0; m < this.devices[j].tags.length; m++) {
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
    selectItem: function(tag) {
      var badge = document.createElement("span");
      badge.innerHTML = tag;
      badge.setAttribute("class", "btn btn-primary btn-sm");
      badge.onclick = function() {
        this.style.display = "none";
      };
      document.getElementById("searchTarget").appendChild(badge);
    },
    handleFileSelect: function(event) {
      var files = event.target.files;
      // FileList object
      var archive = new JSZip().folder("archive");
      for (var i = 0, f; (f = files[i]); i++) {
        //console.log(f)
        // if set webkitdirectory
        archive.file(f.webkitRelativePath, f);
        // if only set multiple
        //archive.file(f.name, f);
      }
      //console.log(archive);
      this.source = archive.generateAsync({ type: "base64" });
      document.getElementById("mySourcelabel").innerHTML =
        files[0].name + "...";
      //console.log(this.source)
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

    this.$refs.editor_build_c.editor.setValue("commands: \n-", 1);
    this.$refs.editor_build_c.editor.setOption("highlightActiveLine", false);
    this.$refs.editor_build_c.editor.setOption("highlightSelectedWord", false);
    this.$refs.editor_build_a.editor.setValue("artifacts: \n-", 1);
    this.$refs.editor_build_a.editor.setOption("highlightActiveLine", false);

    this.$refs.editor_install_c.editor.setValue("commands: \n-", 1);
    this.$refs.editor_install_c.editor.setOption("highlightActiveLine", false);
    this.$refs.editor_run_c.editor.setValue("commands: \n-", 1);
    this.$refs.editor_run_c.editor.setOption("highlightActiveLine", false);

    var markers = L.markerClusterGroup({
      spiderLegPolylineOptions: {
        weight: 1,
        color: "#222",
        opacity: 0.1
      },
      iconCreateFunction: function(cluster) {
        //var markers = cluster.getAllChildMarkers();
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
    //Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
    //http://reely.fit.fraunhofer.de:8080/orders
    // /deployment.json
    Axios.get("http://reely.fit.fraunhofer.de:8080/orders").then(response => {
      // console.log(response.data)
      for (let i = 0; i < response.data.total; i++) {
        let a = response.data.items[i];
        //console.log(typeof a.deploy);
        this.orders.push({
          name: a.id,
          // devices: a.deploy.target,
          createdAt: a.createdAt,
          debug: a.debug,
          commands: {
            b: a.build ? a.build : "",
            c: a.deploy ? a.deploy : "",
            isAcitve: false
          }
        });
      }
    });
    //http://reely.fit.fraunhofer.de:8080/targets
    // /device.json
    Axios.get("http://reely.fit.fraunhofer.de:8080/targets")
      .then(response => {
        // console.log(response.data);
        for (let i = 0; i < response.data.total; i++) {
          let a = response.data.items[i];

          //let marker = L.marker(L.latLng(a.location[0], a.location[1]), {
          // the latlng is faked
          let marker = L.marker(L.latLng(rand(50.749523), rand(7.20343)), {
            icon: L.icon({
              iconUrl: "/done.png",
              iconSize: [20, 20]
            }),
            title: a.id,
            alt: a.tags
          });
          //console.log(this.devices)
          this.devices.push({
            name: a.id,
            tags: a.tags,
            targetActive: true,
            hostActive: true
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

    /**
    * for (var i = 0; i < 100; i++) {
      marker.on("click", event => {
        if (this.devices) {
          this.devices.push({
            id: this.devices.length,
            name: event.target.options.title + this.devices.length,
            tags: ["macOS", "dev", "test"],
            isActive: true
          });
        }
      });
      markers.addLayer(marker);
    }
    *  */
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
.simpleDeviceCard {
  border: 1px solid #999999;
  border-radius: 1px;
  padding: 2.5px;
  margin: 2.5px;
  font-size: 14px;
}

#mySourcelabel::after {
  height: 20px;
  padding: 0;
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
</style>


