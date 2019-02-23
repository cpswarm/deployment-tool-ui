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
                  v-model="searchText"
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
                  <a
                    v-for="order in orders"
                    class="dropdown-item"
                    v-show="order.isActive"
                    @click="selectItem(order.order)"
                    style="font-size:14px;padding:0px 15px"
                  >{{order.order}}</a>
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
                <div class="mycard card-body" style="padding:5px;margin-bottom:5px">
                  <div class="mycard-title">Name:</div>
                  <div class="mycard-content">operation-v01</div>
                  <div class="mycard-title">Devices:</div>
                  <div class="mycard-content"> <img src="../assets/search.png" style="width:16px">
                 </div>
                  <div class="mycard-title">Created Time:</div>
                  <div class="mycard-content">2018-12-06 15:27:58</div>
                  <div class="mycard-title">Finished Time:</div>
                  <div class="mycard-content">2018-12-06 15:27:58</div>
                  <div class="mycard-title">Debug:</div>
                  <div class="mycard-content">
                    <input type="checkbox">
                  </div>
                  <div class="mycard-title">Commands:</div>
                  <div class="mycard-content">
                    <img src="../assets/search.png" style="width:16px">
                  </div>
                  <div></div>
                  <div style="text-align: right">
                    <img src="../assets/duplicate.png" style="width:20px">
                  </div>
                </div>
                <div class="mycard card-body">
                  <div class="mycard-title">Name:</div>
                  <div class="mycard-content">operation-v01</div>
                  <div class="mycard-title">Devices:</div>
                  <div class="mycard-content">tag1 tag2 tag3</div>
                  <div class="mycard-title">Created Time:</div>
                  <div class="mycard-content">2018-12-06 15:27:58</div>
                  <div class="mycard-title">Finished Time:</div>
                  <div class="mycard-content">2018-12-06 15:27:58</div>
                  <div class="mycard-title">Commands:</div>
                  <div></div>
                  <div class="mycard-title">Debug:</div>
                  <div></div>
                </div>

                <div class="mycard card-body">
                  <div class="mycard-title">Name:</div>
                  <div class="mycard-content">operation-v01</div>
                  <div class="mycard-title">Devices:</div>
                  <div class="mycard-content">tag1 tag2 tag3</div>
                  <div class="mycard-title">Created Time:</div>
                  <div class="mycard-content">2018-12-06 15:27:58</div>
                  <div class="mycard-title">Finished Time:</div>
                  <div class="mycard-content">2018-12-06 15:27:58</div>
                  <div class="mycard-title">Commands:</div>
                  <div></div>
                  <div class="mycard-title">Debug:</div>
                  <div></div>
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
                    <input type="file" class="custom-file-input" id="customFile">
                    <label
                      id="mySourcelabel"
                      class="custom-file-label"
                      for="customFile"
                      style="text-align: left;height: 22px;padding: 0px; font-size: 14px;"
                    >Choose file</label>
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
                      class="form-control form-control-sm"
                      style="border-radius: .2rem; height:22px"
                      placeholder="-"
                    >
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
                    <div id="searchTarget" class="input-group" style="width:100%">
                      <input
                        class="dropdown-toggle form-control form-control-sm"
                        v-model="searchText"
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
                          aria-expanded="true"
                          style="padding:0px 5px;border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;"
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
                    <div v-for="device in devices" class="simpleDeviceCard">
                      <div class="input-group" style="padding:2.5px;">Name:
                        <div style="padding:0 2.5px;display:inline-block;width:83%">{{device.name}}</div>
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
                    style="padding: 2.5px 5px;"
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

function rand(n) {
  let max = n + 0.001;
  let min = n - 0.001;
  return Math.random() * (max - min) + min;
}

export default {
  data() {
    return {
      devices: [],
      orders: [
        {
          tag: "dev",
          isActive: true
        },
        {
          tag: "darwin",
          isActive: true
        },
        {
          tag: "linux",
          isActive: true
        },
        {
          tag: "drone",
          isActive: true
        },
        {
          tag: "hover",
          isActive: true
        },
        {
          tag: "test",
          isActive: true
        }
      ],
      tags: [
        {
          tag: "dev",
          isActive: true
        },
        {
          tag: "darwin",
          isActive: true
        },
        {
          tag: "linux",
          isActive: true
        },
        {
          tag: "drone",
          isActive: true
        },
        {
          tag: "hover",
          isActive: true
        },
        {
          tag: "test",
          isActive: true
        }
      ]
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
      let taskDer = "";

      taskDer =
        this.deployName.value +
        this.deployDebug.value +
        this.$refs.editor_build_c.editor.getValue().toString();
      console.log(taskDer);
    },
    removeDevice: function(name) {
      for (var i = 0; i < this.devices.length - 1; i++) {
        if (this.devices[i].name === name) {
          this.devices.splice(i, 1);
        }
      }
      console.log(this.devices);
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
    selectItem: function(tag) {
      var badge = document.createElement("span");
      badge.innerHTML = tag;
      badge.setAttribute("class", "my-badge badge badge-primary");
      document.getElementById("searchTarget").appendChild(badge);
    }
  },
  mounted() {
    this.$refs.map.style.height = window.innerHeight + "px";
    this.$refs.panel.style.height = window.innerHeight + "px";

    const map = L.map("map").setView([50.749523, 7.20143], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.$refs.editor_build_c.editor.setValue("commands: \n-", 1);
    this.$refs.editor_build_c.editor.setOption("highlightActiveLine", false);
    this.$refs.editor_build_c.editor.setOption("highlightSelectedWord", false);
    this.$refs.editor_build_a.editor.setValue("artifacts: \n-", 1);
    this.$refs.editor_build_a.editor.setOption("highlightActiveLine", false);

    this.$refs.editor_install_c.editor.setValue("commands: \n-", 1);
    this.$refs.editor_install_c.editor.setOption("highlightActiveLine", false);
    this.$refs.editor_run_c.editor.setValue("commands: \n-", 1);
    this.$refs.editor_run_c.editor.setOption("highlightActiveLine", false);

    var markers = L.markerClusterGroup();
    for (var i = 0; i < 100; i++) {
      var marker = L.marker(L.latLng(rand(50.749523), rand(7.20143)), {
        icon: L.icon({
          iconUrl: "/devices.png",
          iconSize: [28, 28]
        }),
        title: "my-laptop"
      });
      marker.on("click", event => {
        if (this.devices) {
          this.devices.push({
            id: this.devices.length,
            name: event.target.options.title + this.devices.length,
            tags: ["macOS", "dev", "test"]
          });
        }
      });
      markers.addLayer(marker);
    }
    map.addLayer(markers);
  }
};
</script>

<style>
.simpleDeviceCard {
  border: 1px solid #999999;
  border-radius: 1px;
  padding: 2.5px;
  margin: 2.5px;
  font-size: 14px;
}
.my-badge {
  z-index: 100;
  position: relative;
}

#mySourcelabel::after {
  height: 20px;
  padding: 0;
}
</style>


