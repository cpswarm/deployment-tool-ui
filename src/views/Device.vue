<template>
 <div class="mappanelContainer">
    <div id="map" style="width:800px" ref="map">
    </div>
    <div class="panel" style="width:400px">
      <div id="title"> 
        <img src="../assets/devices.png" style="width:30px" alt="">
        <h5 style="display: inline-block; margin-left:5px">Device Management</h5>
      </div>
      <div class="accordion" id="accordionExample" >
        <div class="card">
          <div id="search">     
          <form class="form-inline" >
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:90px">Tags</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Type</a>
                            <a class="dropdown-item" href="#">Hardware Architecture</a>
                            <a class="dropdown-item" href="#">Opeartion System</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Location</a>
                        </div>
                    <input class="form-control">
                    <a class="btn btn-primary" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Search</a> 
            </form>
      </div>
          <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice" data-parent="#accordionExample" ref="collapseOne">
            <div class="my-card-body"> 
              <div id="deviceList">
                <div class="mycard my-card-body">   
                    <div class="mycard-title">Name:</div>
                    <div class="mycard-content">drone-1</div>
                    <div class="mycard-title">Tags:</div>
                    <div class="mycard-content">tag1 tag2 tag3</div>
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
                    <div class="mycard-content">tag1 tag2 tag3</div>
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
                    <div class="mycard-content">tag1 tag2 tag3</div>
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
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Batch Update Devices Tags</button>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample" ref="collapseTwo">
            <div class="my-card-body">
                <h6>This update settings will apply to all selected deivces.</h6>
                <form id="updateTags" action="">
                    <div style="text-align:right"> Name Base: </div>
                    <div class="">   
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
                      <div class="form-check input-group">
                        
                          <label for="">Type:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                       <div class="form-check input-group">
                          <label for="">HW Arch:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                       <div class="form-check input-group">
                          <label for="">OS:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Add New Device</button>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample" ref="collapseThree">
            <div class="my-card-body">
                <form id="newDevice" action="">
                    <div style="text-align:right">#Devices:</div>
                    <div>
                       <input type="text" class="form-control form-control-sm">
                    </div>
                    <div style="text-align:right"> Name Base: </div>
                    <div class="">   
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
                      <div class="form-check input-group">
                       
                          <label for="">Type:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                       <div class="form-check input-group">
                        
                          <label for="">HW Arch:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                       <div class="form-check input-group">
                       
                          <label for="">OS:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
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
  import draggable from 'vuedraggable'
  import axios from 'axios'

  export default {
    data() {
      return {
        devices: "../assets/devices.png",
        devicesData:[]
      }
    },
    components: {
      draggable,
    },
    mounted() {
    
    this.$refs.map.style.height = window.innerHeight + 'px';


    /**
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
    var markers = L.markerClusterGroup();
      axios.get('/data.json').then(response => {

      this.devicesData = JSON.parse(JSON.stringify(response.data));
      console.log(this.devicesData);
      for (var i = 0; i < this.devicesData.length; i++) {
			var a = response.data[i];
			var title = a['tags'];
      var marker = L.marker(L.latLng(a['tags'][3][0], a['tags'][3][1]), { title: title });
      
      console.log(marker);
			markers.addLayer(marker);
    }
      
    })
    .catch(error => {
      console.log(error);
    })
    

    const map = L.map('map').setView([50.749523,7.20143], 16)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.addLayer(markers);
   
  
    }
   

	
  }  
</script>

<style>
  .mappanelContainer{
    display: flex;
    flex-direction: row;
  }

  .my-card-body{
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    padding: 5px;
    margin-bottom: 5px
  }
  .panel{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start
  }
  #updateTags, #newDevice, #newDeployment{
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 2.5px
  }
  .mycard{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 2.5px;
    border: 1px solid rgba(0,0,0,.125);
  }
  .collapse{
     overflow: scroll;
     height: 550px;
  }
  .mycard-title{
    text-align: right;
  }
  .mycard-content{
    text-align: left;
  }
  #deviceList{
    overflow: scroll
  }

  .card-header{
    width:400px
  }
  
  
  #headingOne,
  #headingTwo,
  #headingThree {
    padding: 0
  }
 
</style>


