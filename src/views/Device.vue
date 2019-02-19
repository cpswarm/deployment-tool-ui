<template>
  <div class="mappanelContainer">
    <div id="map" style="width:800px" ref="map">
      <v-map :zoom="10" :center="initialLocation">
        <v-icondefault></v-icondefault>
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker-cluster :options="clusterOptions">
          <v-marker v-for="l in locations" :key="l.id" :lat-lng="l.latlng" :icon="icon">
          <!--  <v-popup :content="l.text"></v-popup>   -->
          </v-marker>
        </v-marker-cluster>
      </v-map>
    </div>
    <div class="panel" style="width:400px">
      <div id="title">
        <img src="../assets/devices.png" style="width:30px" alt>
        <h5 style="display: inline-block; margin-left:5px">Device Management</h5>
      </div>
      <div class="accordion" id="accordionExample">
        <div class="card">
          <div id="search">
            <form class="form-inline">
              <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style="width:90px"
              >Tags</button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Type</a>
                <a class="dropdown-item" href="#">Hardware Architecture</a>
                <a class="dropdown-item" href="#">Opeartion System</a>
                <div role="separator" class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Location</a>
              </div>
              <input class="form-control">
              <a
                class="btn btn-primary"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >Search</a>
            </form>
          </div>
          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="searchDevice"
            data-parent="#accordionExample"
            ref="collapseOne"
          >
            <div class="my-card-body">
              <div id="deviceList">
                <div class="mycard my-card-body">
                  <div class="mycard-title">Name:</div>
                  <div class="mycard-content">drone-1</div>
                  <div class="mycard-title">Tags:</div>
                  <div class="mycard-content">
                    <span>
                      <div class="badge badge-pill badge-primary">tag1</div>
                      <div class="badge badge-pill badge-danger">tag2</div>
                      <div class="badge badge-pill badge-success">tag3</div>
                    </span>
                  </div>
                  <div class="mycard-title">Current Task:</div>
                  <div class="mycard-content">operationA-v01</div>
                  <div class="mycard-title">Status:</div>
                  <div></div>
                  <div class="mycard-title">Current Logs:</div>
                  <div></div>
                  <div class="mycard-title">Terminal:</div>
                  <div></div>
                  <div class="mycard-title">Current Logs:</div>
                  <div></div>
                  <div class="mycard-title">History Tasks:</div>
                </div>
                <div class="mycard my-card-body">
                  <div class="mycard-title">Name:</div>
                  <div class="mycard-content">drone-2</div>
                  <div class="mycard-title">Tags:</div>
                  <div class="mycard-content">
                    <span>
                      <div class="badge badge-pill badge-primary">tag1</div>
                      <div class="badge badge-pill badge-danger">tag2</div>
                      <div class="badge badge-pill badge-success">tag3</div>
                    </span>
                  </div>
                  <div class="mycard-title">Current Task:</div>
                  <div class="mycard-content">operationA-v01</div>
                  <div class="mycard-title">Status:</div>
                  <div></div>
                  <div class="mycard-title">Current Logs:</div>
                  <div></div>
                  <div class="mycard-title">Terminal:</div>
                  <div></div>
                  <div class="mycard-title">Current Logs:</div>
                  <div></div>
                  <div class="mycard-title">History Tasks:</div>
                </div>
                <div class="mycard my-card-body">
                  <div class="mycard-title">Name:</div>
                  <div class="mycard-content">drone-2</div>
                  <div class="mycard-title">Tags:</div>
                  <div class="mycard-content">
                    <span>
                      <div class="badge badge-pill badge-primary">tag1</div>
                      <div class="badge badge-pill badge-danger">tag2</div>
                      <div class="badge badge-pill badge-success">tag3</div>
                    </span>
                  </div>
                  <div class="mycard-title">Current Task:</div>
                  <div class="mycard-content">operationA-v01</div>
                  <div class="mycard-title">Status:</div>
                  <div></div>
                  <div class="mycard-title">Current Logs:</div>
                  <div></div>
                  <div class="mycard-title">Terminal:</div>
                  <div></div>
                  <div class="mycard-title">Current Logs:</div>
                  <div></div>
                  <div class="mycard-title">History Tasks:</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingTwo">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >Batch Update Devices Tags</button>
          </div>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
            ref="collapseTwo"
          >
            <div class="my-card-body">
              <h6>This update settings will apply to all selected deivces.</h6>
              <form id="updateTags" action>
                <div style="text-align:right">Name Base:</div>
                <div class>
                  <div class="form-check input-group">
                    <input class="form-check-input" type="radio" name="radio">
                    <input type="text" class="form-control form-control-sm">
                    <label>- 1/2/3...</label>
                  </div>
                  <div class="form-check input-group">
                    <input class="form-check-input" type="radio" name="radio">
                    <input type="text" class="form-control form-control-sm">
                    <label class="form-check-label" for="exampleCheck1">- a/b/c...</label>
                  </div>
                </div>
                <div style="text-align:right">Tags:</div>
                <div>
                  <div class="input-group">
                    <label for>Type:</label>
                    <ul style="display:inline-block;padding-left:5px">
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">drone</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">sensor</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">robot</button>
                      </li>
                    </ul>
                  </div>
                  <div class="input-group">
                    <label for>HW Arch:</label>
                    <ul style="display:inline-block;padding-left:5px">
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">ARM64</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">ARM32</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">8051</button>
                      </li>
                    </ul>
                  </div>
                  <div class="input-group">
                    <label for>OS:</label>
                    <ul style="display:inline-block;padding-left:5px">
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">FreeBSD</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">NetBSD</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">Darwin</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
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
            >Add New Device</button>
          </div>
          <div
            id="collapseThree"
            class="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
            ref="collapseThree"
          >
            <div class="my-card-body">
              <form id="newDevice" action>
                <div style="text-align:right">#Devices:</div>
                <div>
                  <input type="text" class="form-control form-control-sm">
                </div>
                <div style="text-align:right">Name Base:</div>
                <div class>
                  <div class="form-check input-group">
                    <input class="form-check-input" type="radio" name="radio">
                    <input type="text" class="form-control form-control-sm">
                    <label>- 1/2/3...</label>
                  </div>
                  <div class="form-check input-group">
                    <input class="form-check-input" type="radio" name="radio">
                    <input type="text" class="form-control form-control-sm">
                    <label class="form-check-label" for="exampleCheck1">- a/b/c...</label>
                  </div>
                </div>
                <div style="text-align:right">Tgas:</div>
                <div>
                  <div class="input-group">
                    <label for>Type:</label>
                    <ul style="display:inline-block;padding-left:5px">
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">drone</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">sensor</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">robot</button>
                      </li>
                    </ul>
                  </div>
                  <div class="input-group">
                    <label for>HW Arch:</label>
                    <ul style="display:inline-block;padding-left:5px">
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">ARM64</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">ARM32</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">8051</button>
                      </li>
                    </ul>
                  </div>
                  <div class="input-group">
                    <label for>OS:</label>
                    <ul style="display:inline-block;padding-left:5px">
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">FreeBSD</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">NetBSD</button>
                      </li>
                      <li class="my-li" style="display:inline-block">
                        <button class="btn btn-primary btn-sm">Darwin</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import axios from "axios";
import * as Vue2Leaflet from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster";
import iconUrl from "../assets/devices.png";
import shadowUrl from "../assets/devices.png";

function rand(n) {
  let max = n + 0.1;
  let min = n - 0.1;
  return Math.random() * (max - min) + min;
}

export default {
  data() {
    let locations = [];
    for (let i = 0; i < 100; i++) {
      locations.push({
        id: i,
        latlng: L.latLng(rand(-34.9205), rand(-57.953646)),
        text: "Hola " + i
      });
    }
    let icon = Vue2Leaflet.L.icon(
      Object.assign({}, Vue2Leaflet.L.Icon.Default.prototype.options, {
        iconUrl,
        shadowUrl
      })
    );
    return {
      locations,
      icon,
      clusterOptions: {},
      initialLocation: L.latLng(-34.9205, -57.953646)
    };
    /**
 *  var devicesData;
    fetch('/data.json').then(response => {
     
    devicesData = response.data;
    
    return {
        devices: "../assets/devices.png",
        devicesData
      }
    })
    .catch(error => {
      console.log(error);
    })
 * 
 * 
 * 
 */
  },
  components: {
    "v-map": Vue2Leaflet.LMap,
    "v-tilelayer": Vue2Leaflet.LTileLayer,
    "v-icondefault": Vue2Leaflet.LIconDefault,
    "v-marker": Vue2Leaflet.LMarker,
    "v-popup": Vue2Leaflet.LPopup,
    "v-marker-cluster": Vue2LeafletMarkercluster
  },
  mounted() {
    this.$refs.map.style.height = window.innerHeight + "px";

    /**
    *  const map = L.map('map').setView([50.749523,7.20143], 16)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    * 
    *  */

    //map.addLayer(markers);
  }
  /** get json from api
     * 
     * axios.get('https://petstore.swagger.io/v2/swagger.json')
    .then(response => {

      this.devicesData = response.data;
      var markers = L.markerClusterGroup();
      for (var i = 0; i < this.devicesData.length; i++) {
			var a = response.data[i];
			var title = a['tags'];
			var marker = L.marker(L.latLng(a['tags'][3][0], a['tags'][3][1]), { title: title });
			marker.bindPopup(title);
			markers.addLayer(marker);
    }
      
    })
    .catch(error => {
      console.log(error);
    })
     * 
     *
     *  */
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.mappanelContainer {
  display: flex;
  flex-direction: row;
}

.my-card-body {
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  padding: 5px;
  margin-bottom: 5px;
}
.panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
#updateTags,
#newDevice,
#newDeployment {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 2.5px;
}
.mycard {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 2.5px;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.collapse {
  overflow: scroll;
  height: 550px;
}
.mycard-title {
  text-align: right;
}
.mycard-content {
  text-align: left;
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


