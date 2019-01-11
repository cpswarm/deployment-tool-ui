<template>
  <div class="row">
    <div class="col-8">
      <img src="../assets/map.png" style="width: 100%" alt=""> this is devices map
    </div>
    <div style="width: 30%; position: absolute; right: 0; background-color: #ececec">
      <div name="title" style="text-align:left; padding:5px">
        <img src="../assets/devices.png" style="width:25px" alt="">
        <h5 style="display: inline-block; margin-left:5px">Device Management</h5>
      </div>
      <div id="panel" class="accordion" style="text-align: left">
        <div class="card">
          <div class="card-header my-card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn" type="button" data-toggle="collapse" data-target="#addNewDevice" aria-expanded="true" aria-controls="addNewDevice">Add New Device
                          </button>
            </h2>
          </div>
          <div id="addNewDevice" class="collapse" aria-labelledby="headingOne" data-parent="#panel">
            <div class="card-body my-card-body">
              <form>
                <div class="form-group row">
                  <label for="exampleInputEmail1" class="my-label col-sm-4">#Devices</label>
                  <div class="col-sm-8">
                    <input type="email" class="form-control form-control-sm" placeholder="Enter device number">
                  </div>
                </div>
  
                <div class="form-group row">
                  <label for="exampleInputEmail1" class="my-label col-sm-4">Name Base</label>
                  <div class="col-sm-8">
                    <div class="my-row">
                      <input type="radio" class="form-check-input" id="exampleCheck1">
                      <input type="text" class="form-control-sm form-control" style="width:130px; display: inline-block">
                      <label class="form-check-label" for="exampleCheck1">- 1/2/3...</label>
                    </div>
                    <div class="my-row">
                      <input type="radio" class="form-check-input" id="exampleCheck2">
                      <input type="text" class="form-control form-control-sm" style="width:130px;display: inline-block">
                      <label class="form-check-label" for="exampleCheck1">- a/b/c...</label>
                    </div>
                    <div class="my-row">
                      <input type="radio" class="form-check-input" id="exampleCheck3">
                      <input type="text" class="form-control form-control-sm" style="width:130px;display: inline-block">-
                      <input type="text" class="form-control form-control-sm" style="width:50px;display: inline-block">
                    </div>
  
                  </div>
  
                </div>
  
                <div class="form-group row">
                  <label for="Tags" class="my-label col-sm-4">Tags</label>
                  <div class="col-sm-8">
  
                    <div class="my-row">
                      <input type="checkbox" class="form-check-input">
                      <label for="">Type</label>
                      <ul class="list-group" style="display:inline-block; width:150px">
                        <li class="my-li"><button class="btn btn-primary">A</button></li>
                        <li class="my-li"><button class="btn btn-primary">B</button></li>
                        <li class="my-li"><button class="btn btn-primary">C</button></li>
                      </ul>
                    </div>
                    <div class="my-row">
                      <input type="checkbox" class="form-check-input">
                      <label for="">HW Arch</label>
                      <ul class="list-group" style="display:inline-block; width:143px">
                        <li class="my-li"><button class="btn btn-primary">A</button></li>
                        <li class="my-li"><button class="btn btn-primary">B</button></li>
                        <li class="my-li"><button class="btn btn-primary">C</button></li>
                      </ul>
                    </div>
                    <div class="my-row">
                      <input type="checkbox" class="form-check-input">
                      <label for="">OS</label>
                      <ul class="list-group" style="display:inline-block; width:150px">
                        <li class="my-li"><button class="btn btn-primary">A</button></li>
                        <li class="my-li"><button class="btn btn-primary">B</button></li>
                        <li class="my-li"><button class="btn btn-primary">C</button></li>
                      </ul>
                    </div>
                    <div class="my-row">
                      <input type="checkbox" class="form-check-input" id="exampleCheck3">
                      <label for="">Location</label>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary" style="float:right">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div class="card">
          <div id='headingTwo' class="my-card-header card-header">
            <h2 class="mb-0">
              <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Batch Update Devices Tags
                          </button>
            </h2>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#panel">
            <div class="card-body">
              <h6>This update settings will apply to all selected deivces.</h6>
              <form action="">
  
                <div class="form-group row">
                  <label for="exampleInputEmail1" class="my-label col-sm-4">Name Base</label>
                  <div class="col-sm-8">
                    <div class="my-row">
                      <input type="radio" class="form-check-input" id="exampleCheck1">
                      <input type="text" class="form-control-sm form-control" style="width:70px; display: inline-block">
                      <label class="form-check-label" for="exampleCheck1">- 1/2/3...</label>
                    </div>
                    <div class="my-row">
                      <input type="radio" class="form-check-input" id="exampleCheck2">
                      <input type="text" class="form-control form-control-sm" style="width:70px;display: inline-block">
                      <label class="form-check-label" for="exampleCheck1">- a/b/c...</label>
                    </div>
                    <div class="my-row">
                      <input type="radio" class="form-check-input" id="exampleCheck3">
                      <input type="text" class="form-control form-control-sm" style="width:70px;display: inline-block">-
                      <input type="text" class="form-control form-control-sm" style="width:50px;display: inline-block">
                    </div>
  
                  </div>
  
                </div>
                <div class="form-group row">
                  <label for="exampleInputEmail1" class="my-label col-sm-4">Tags</label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="card">
          <div id='headingThree' class="my-card-header card-header">
            <h2 class="mb-0">
              <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <form class="form-inline">
                                  <div class="input-group mb-1">
                                    <div class="input-group-prepend">
                                      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tags</button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Type</a>
                <a class="dropdown-item" href="#">Hardware Architecture</a>
                <a class="dropdown-item" href="#">Opeartion System</a>
                <div role="separator" class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Location</a>
              </div>
          </div>
          <input class="form-control" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-outline-success my-1 my-sm-0" type="submit">Search</button>
          </div>
        </div>
        </form>
        </button>
        </h2>
      </div>
      <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#panel">
        <div class="card-body" style="height: 500px; overflow:auto">
          <div id="deviceList">
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
  
            </div>
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>
            <div class="card" style="width: 18rem;">
              <div class="card-body">
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
    display: inline-block;
    list-style: none;
    margin: 2.5px
  }
  
  #headingOne,
  #headingTwo,
  #headingThree {
    padding: 0
  }
</style>


