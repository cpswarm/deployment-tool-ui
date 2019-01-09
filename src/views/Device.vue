<template>
  <div class="row">
    <div class="col-8">
      <img src="../assets/map.png" style="width: 100%" alt=""> this is devices map
    </div>
    <div style="width: 30%; position: absolute; right: 0; background-color: #ececec">
      <div name="title" style="text-align:left; padding:5px">
        <img src="../assets/devices.png" style="width:30px" alt="">
        <h5 style="display: inline-block; margin-left:5px">Device Management</h5>
      </div>
      <div class="accordion" id="accordionExample" style="text-align: left">
        <div class="card" >
          <div class="my-card-header card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <img src="" alt=""> Add New Device
                </button>
            </h2>
          </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="my-card-body card-body">
              <form>
                <div class="form-group form-inline">
                  <div style="width:60px; text-align:right">
                    <label for="exampleInputEmail1" class="my-label">#Devices</label>
                  </div>
                
                  <input type="email" class="form-control form-inline" placeholder="Enter device number">
                </div>
                <div class="form-group form-inline">
                   <div style="width:60px; text-align:right">
                    <label for="exampleInputEmail1" class="my-label">Name Base</label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="exampleCheck1">
                    <input type="text" class="form-control form-inline">
                    <label class="form-check-label" for="exampleCheck1">- 1/2/3...</label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="exampleCheck2">
                    <input type="text" class="form-control form-inline">
                    <label class="form-check-label" for="exampleCheck1">- a/b/c...</label>
                  </div>
                  <div class="form-check">
                    <input type="radio" class="form-check-input" id="exampleCheck3">
                    <input type="text" class="form-control form-inline">
                    <input type="text" class="form-control form-inline">
                  </div>
                </div>
                <div class="form-group">
                 <div style="width:60px; text-align:right">
                    <label for="exampleInputEmail1" class="my-label">Tags</label>
                  </div>
                  <div class="form-check form-inline">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label for="">Type</label>
                    <ul>
                      <li></li>
                    </ul>
                  </div>
                  <div class="form-check form-inline">
                    <input type="checkbox" class="form-check-input" id="exampleCheck2">
                    <label for="">HW Arch</label>
                  </div>
                  <div class="form-check form-inline">
                    <input type="checkbox" class="form-check-input" id="exampleCheck3">
                    <label for="">OS</label>
                  </div>
                  <div class="form-check form-inline">
                    <input type="checkbox" class="form-check-input" id="exampleCheck3">
                    <label for="">Location</label>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="my-card-header card-header">
            <h2 class="mb-0">
              <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                 <img src="" alt=""> Batch Update Devices Tags
                </button>
            </h2>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table,
              raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
        <div class="card">
          <div class="my-card-header card-header">
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
      <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div class="card-body">
  
          <div id="deviceList" class="overflow-auto">
            <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
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
.my-card-header{
  padding: 0px
}
.my-card-body{
  padding: 5px;
  margin: 5px
}
.my-label{
  margin-right: 5px
}
</style>

