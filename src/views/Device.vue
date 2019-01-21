<template>
 <div class="mappanelContainer">
    <div id="map">
      <img src="../assets/map.png" style="width: 100%">
    </div>
    <div class="panel" style="width:500px">
      <div id="title"> 
        <img src="../assets/devices.png" style="width:30px" alt="">
        <h5 style="display: inline-block; margin-left:5px">Device Management</h5>
      </div>
      <div id="search">     
          <form class="form-inline">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tags</button>
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
      <div class="accordion" id="accordionExample">
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
          <div class="card-header" id="headingTwo">
            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Batch Update Devices Tags</button>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
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
                      <div class="form-check input-group">
                      <input class="form-check-input" type="radio" name="radio">
                      <input type="text" class="form-control form-control-sm">-
                      <input type="text" class="form-control form-control-sm">
                   
                      </div>
                    </div>
                    <div style="text-align:right">Tgas:</div>
                    <div>
                      <div class="form-check input-group">
                         <input type="checkbox" class="form-check-input">
                          <label for="">Type:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                       <div class="form-check input-group">
                         <input type="checkbox" class="form-check-input">
                          <label for="">HW Arch:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                       <div class="form-check input-group">
                         <input type="checkbox" class="form-check-input">
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
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            <div class="card-body">
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
                      <div class="form-check input-group">
                      <input class="form-check-input" type="radio" name="radio">
                      <input type="text" class="form-control form-control-sm">-
                      <input type="text" class="form-control form-control-sm">
                      </div>
                    </div>
                    <div style="text-align:right">Tgas:</div>
                    <div>
                      <div class="form-check input-group">
                         <input type="checkbox" class="form-check-input">
                          <label for="">Type:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                       <div class="form-check input-group">
                         <input type="checkbox" class="form-check-input">
                          <label for="">HW Arch:</label>
                          <ul style="display:inline-block">
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary">A</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">B</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary">C</button></li>
                          </ul>
                      </div>
                       <div class="form-check input-group">
                         <input type="checkbox" class="form-check-input">
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
  
  export default {
    data() {
      return {
        devices: "../assets/devices.png",
      }
    },
    components: {
      draggable,
    },
  }  
</script>

<style>
  .mappanelContainer{
    display: flex;
    flex-direction: row;
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
    grid-gap: 5px
  }
  
  .mybtn {
    float: left;
  }
  
  .min-100 {
    min-height: 100%
  }
  
  .my-card-header {
    padding: 0px
  }
  
  .my-card-body {
    padding: 5px;
    margin: 2.5px
  }
  
  .my-label {
    display: block;
    text-align: right;
  }
  
  .my-input {
    display: inline-block;
    margin: 2.5px
  }
  
  .my-row {
    margin: 2.5px 0
  }
  
  .my-li {
    list-style: none;
    margin: 2.5px
  }
  
  #headingOne,
  #headingTwo,
  #headingThree {
    padding: 0
  }
</style>


