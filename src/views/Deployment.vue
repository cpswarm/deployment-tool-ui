<template>
  <div class="mappanelContainer">
    <div class="panel" style="width:400px">
      <div id="title">
        <h5 draggable="true" style="display: inline-block; margin-left:5px">Deployment Management</h5>
      </div>
      <div id="search">
        <form class="form-inline">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Time</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Type</a>
            <a class="dropdown-item" href="#">Hardware Architecture</a>
            <a class="dropdown-item" href="#">Opeartion System</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Location</a>
          </div>
          <input class="form-control" placeholder="Search">
          <a
            class="btn"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >Search</a>
        </form>
      </div>
      <div class="accordion" id="accordionExample" style="width:100%">
        <div class="card">
          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="searchDevice"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <div id="deviceList">
                <div class="mycard card-body">
                  <div class="mycard-title">Name:</div>
                  <div class="mycard-content">operation-v01</div>
                  <div class="mycard-title">Devices:</div>
                  <div class="mycard-content">tag1 tag2 tag3</div>
                  <div class="mycard-title">Created Time:</div>
                  <div class="mycard-content">2018-12-06 15:27:58</div>
                  <div class="mycard-title">Finished Time:</div>
                  <div class="mycard-content">2018-12-06 15:27:58</div>
                  <div class="mycard-title">Debug:</div>
                  <div></div>
                  <div class="mycard-title">Commands:</div>
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
          <div class="card-header" id="headingThree">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >Add New Deployment</button>
          </div>
          <div
            id="collapseThree"
            class="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <h6>
                <a href>Duplicate one exsiting deployment</a>
              </h6>
              <form id="newDeployment" action>
                <div class="mycard-title" style="text-align:right">Name:</div>
                <div class="mycard-content">
                  <input v-model="deployName" type="text" class="form-control form-control-sm">
                </div>
                <div class="mycard-title" style="text-align:right">Source:</div>
                <div>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Choose file</label>
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
                  <div style="background: #ececec;">
                    <div>
                      <editor
                        ref="editor_build_c"
                        v-model="build_c"
                        @init="editorInit"
                        lang="html"
                        theme="chrome"
                        width="250"
                        height="100"
                      ></editor>
                    </div>
                    <div>
                      <editor
                        ref="editor_build_a"
                        v-model="build_a"
                        @init="editorInit"
                        lang="html"
                        theme="chrome"
                        width="250"
                        height="100"
                      ></editor>
                    </div>
                  </div>
                  <div class="input-group" style="border: 1px solid #C4C4C4">
                    <label for>host:</label>
                    <input type="text" class="form-control form-control-sm" placeholder="-">
                  </div>
                </div>
                <div class="mycard-title" style="text-align:right">Install:(optional)</div>
                <div class="mycard-content" style="background: #ececec;text-align:left">
                  <div>
                    <editor
                      ref="editor_install_c"
                      v-model="install_c"
                      @init="editorInit"
                      lang="html"
                      theme="chrome"
                      width="250"
                      height="100"
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
                      lang="html"
                      theme="chrome"
                      width="250"
                      height="100"
                    ></editor>
                  </div>
                </div>
                <div class="mycard-title" style="text-align:right">Target:</div>
                <div class="mycard-content" style="grid-column: 1/3; border: 1px solid grey">
                  <form class="form-inline">
                    <input
                      class="dropdown-toggle"
                      v-model="searchText"
                      type="text"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      @keyup="filterDevice"
                    >
                    <div class="dropdown-menu">
                      <a v-for="tag in tags" class="dropdown-item" v-show="tag.isActive" @click="selectItem(tag.tag)">{{tag.tag}}</a>
                    </div>
                   
                    <a class="btn btn-primary" aria-expanded="true">Search</a>
                  </form>
                  <div style="height:350px">
                    <div v-for="device in devices" class="simpleDeviceCard">
                      <span class="input-group" style="padding:2.5px">Name:
                        <div style="padding:2.5px">{{device.name}}</div>
                        <button
                          type="button"
                          class="btn btn-secondary"
                          style="padding:0 2.5px"
                          @click="removeDevice(device.name)"
                        >D</button>
                      </span>
                      <span class="input-group" style="padding:2.5px">Tags:
                        <div v-for="tag in device.tags" style="padding:2.5px">{{tag}}</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div></div>
                <div style="text-align:right">
                  <button class="btn btn-primary" @click="submitDeploy" type="button">Deploy</button>
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
      tags: [
        {
          tag:"dev",
          isActive: true
        },
        {
          tag:"macOS",
          isActive: true

        },
        {
          tag:"test",
          isActive: true

        },
      ],
    };
  },
  components: {
    editor: require("vue2-ace-editor"),
  },
  methods: {
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); 
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); 
    },
    submitDeploy: function() {
      let taskDer = '';
     
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
    },
    filterDevice: function(){    
      var value = this.searchText.toLowerCase();
        this.tags.forEach(function(tag) {
        if(!(tag.tag.toLowerCase().indexOf(value) > -1)){
          tag.isActive = false
        }else{
          tag.isActive = true
        };
    });  
    },
    selectItem: function(tag){
    
      this.searchText = tag;
      console.log(this.searchText)
    }
    
  },
  mounted() {

    this.$refs.map.style.height = window.innerHeight + "px";

    const map = L.map("map").setView([50.749523, 7.20143], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.$refs.editor_build_c.editor.setValue("commands: \n-",1);
    this.$refs.editor_build_c.editor.setOption('highlightActiveLine',false);
    this.$refs.editor_build_c.editor.setOption("highlightSelectedWord", false);
    this.$refs.editor_build_a.editor.setValue("artifacts: \n-",1);
    this.$refs.editor_build_a.editor.setOption('highlightActiveLine',false);

    this.$refs.editor_install_c.editor.setValue("commands: \n-",1);
    this.$refs.editor_install_c.editor.setOption('highlightActiveLine',false);
    this.$refs.editor_run_c.editor.setValue("commands: \n-",1);
    this.$refs.editor_run_c.editor.setOption('highlightActiveLine',false);

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
            tags: ["tag1", "tag2", "tag3"]
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
  padding: 2.5px;
  margin: 2.5px;
  font-size: 14px;
  text-align: right;
}
</style>


