<template>
 <div class="mappanelContainer">
    <div id="map" style="width:1000px">
     
    </div>
    <div class="panel" style="width:500px">
      <div id="title"> 
        <img src="../assets/deployment.png" style="width:30px" alt="">
        <h5 style="display: inline-block; margin-left:5px">Deployment Management</h5>
      </div>
      <div id="search">     
          <form class="form-inline">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Time</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Type</a>
                            <a class="dropdown-item" href="#">Hardware Architecture</a>
                            <a class="dropdown-item" href="#">Opeartion System</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Location</a>
                        </div>
                    <input class="form-control" placeholder="Search" >
                    <a class="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Search</a> 
            </form>
      </div>
      <div class="accordion" id="accordionExample" style="width:100%">
        <div class="card">
          <div id="collapseOne" class="collapse show" aria-labelledby="searchDevice" data-parent="#accordionExample">
            <div class="card-body"> 
              <div id="deviceList">
                <div class="card card-body">   
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
                <div class="card card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
              </div>
              <div class="card card-body">
                  <h5 class="card-title">Card title</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
              </div>
            </div> 
          </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Add New Deployment</button>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body">
                <h6><a href="">Duplicate one exsiting deployment</a></h6>
                <form id="newDeployment" action="">
                    <div style="text-align:right">Name:</div>
                    <div>
                       <input type="text" class="form-control form-control-sm">
                    </div>
                    <div style="text-align:right"> Source:</div>
                    <div>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="customFile">
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                    </div>
                    <div style="text-align:right">Stages:</div>
                    <div style="background: #ececec">
                        <div class="input-group">
                            <label for="">transfer:</label>
                            <input type="text" class="form-control form-control-sm">
                        </div>
                         <div class="input-group">
                            <label for="">install:</label>
                            <input type="text" class="form-control form-control-sm">
                        </div>
                         <div class="input-group">
                            <label for="">run:</label>
                            <input type="text" class="form-control form-control-sm">
                        </div>
                        
                        
                    </div>
                    <div style="text-align:right">Debug:</div>
                    <div>
                      <div class="form-check input-group">
                         <input type="checkbox" class="form-check-input">   
                      </div>
                    </div>
                    <div style="text-align:right">Target:</div>
                    <div style="grid-column: 1/3; border: 1px solid grey">
                        <div style="height:500px"></div>
                        <form action="">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">Action</a>
                                            <a class="dropdown-item" href="#">Another action</a>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                            <div role="separator" class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#">Separated link</a>
                                        </div>
                                 </div>
                                <input type="text" class="form-control">
                            </div>
                        </form>
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
  
  export default {
    data() {
      return {
        devices: "../assets/devices.png",
      }
    },
    components: {
      draggable,
    },
     mounted() {
    const map = L.map('map').setView([37.4501001, -121.9107704], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    }
  }  
</script>

<style>
  
</style>


