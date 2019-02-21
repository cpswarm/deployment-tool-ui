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
                <div style="text-align:right">Name:</div>
                <div>
                  <input type="text" class="form-control form-control-sm">
                </div>
                <div style="text-align:right">Source:</div>
                <div>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                  </div>
                </div>
                <div style="text-align:right">Debug:</div>
                <div>
                  <div class="form-check input-group">
                    <input type="checkbox" class="form-check-input">
                  </div>
                </div>
                <div style="text-align:right">Build:(optional)</div>
                <div style="text-align:left">
                  <div style="background: #ececec;">
                    <div>
                      <label for>commands:</label>
                      <editor
                        v-model="build_c"
                        @init="editorInit"
                        lang="html"
                        theme="chrome"
                        width="250"
                        height="100"
                      ></editor>
                    </div>
                    <div>
                      <label for>artifacts:</label>
                      <editor
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
                <div style="text-align:right">Install:(optional)</div>
                <div style="background: #ececec;text-align:left">
                  <div>
                    <label for>commands:</label>
                    <editor
                      v-model="install_c"
                      @init="editorInit"
                      lang="html"
                      theme="chrome"
                      width="250"
                      height="100"
                    ></editor>
                  </div>
                </div>
                <div style="text-align:right">Run:</div>
                <div style="background: #ececec;text-align:left">
                  <div>
                    <label for>commands:</label>
                    <editor
                      v-model="run_c"
                      @init="editorInit"
                      lang="html"
                      theme="chrome"
                      width="250"
                      height="100"
                    ></editor>
                  </div>
                </div>
                <div style="text-align:right">Target:</div>
                <div style="grid-column: 1/3; border: 1px solid grey">
                  <form class="form-inline">
                    <button
                      class="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >Tags</button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Type</a>
                      <a class="dropdown-item" href="#">Hardware Architecture</a>
                      <a class="dropdown-item" href="#">Opeartion System</a>
                      <div role="separator" class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Location</a>
                    </div>
                    <input class="form-control" style="width:150px">
                    <a class="btn btn-primary" aria-expanded="true">Search</a>
                  </form>
                  <div style="height:350px">
                    <div v-for="device in devices" class="simpleDeviceCard">
                      <span class="input-group">Name:
                        <div>{{device.name}}</div>
                      </span>
                      <span class="input-group">Tags:
                        <div v-for="tag in device.tags">{{tag}}</div>
                      </span>
                    </div>
                  </div>
                </div>
                <div></div>
                <div style="text-align:right">
                  <button class="btn btn-primary">Deploy</button>
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
      build_c: [],
      build_a: [],
      install_c: [],
      run_c: [],
      devices: []
    };
  },
  components: {
    editor: require("vue2-ace-editor")
  },
  methods: {
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    }
  },
  mounted() {
    this.$refs.map.style.height = window.innerHeight + "px";

    const map = L.map("map").setView([50.749523, 7.20143], 16);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var markers = L.markerClusterGroup();
    for (var i = 0; i < 100; i++) {
      var marker = L.marker(L.latLng(rand(50.749523), rand(7.20143)), {
        //draggable: true,
        icon: L.icon({
          iconUrl: "/devices.png",
          iconSize: [38, 38]
        }),
        title: "my-laptop"
      });
      //marker.bindPopup(title);
      //console.log(this.build_c);
      marker.on("click", event => {
        //console.log(this.$refs.devices);
        //this.$refs.devices.placeholder = event.target.options.title;
        //console.log(this.devices);
        if (this.devices) {
          this.devices.push({
            id: this.devices.length,
            name: event.target.options.title,
            tags: ["tag1", "tag2", "tag3"]
          });
          //console.log(this.devices);
        }
      });
      markers.addLayer(marker);
    }
    map.addLayer(markers);
    //console.log(this.build_c);

    function test(e, _this) {
      //
      // event.target.options.title = 'jjjj';
    }
  }
};
</script>

<style>
</style>


