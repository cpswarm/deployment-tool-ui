<template>
 <div style="width: 100%;padding:20px">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Project Setting</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">User Management</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">My Account</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      <form action="" id="projectSetting">
          <div id="mapSetting">
              <div> <h6>Map Setting</h6></div>
              <div></div>
              <div>Map Source</div>
              <div class="form-group">
                  <div class="input-group">
                      <input type="radio">
                      <label for="">Googple API</label>
                  </div>
                  <div class="input-group">
                      <input type="radio">
                      <label for="">MapBox API</label>
                  </div>
                  <div class="input-group">
                      <input type="radio">
                      <label for="">Open Street API</label>
                  </div>
                  <div class="input-group">
                      <input type="radio">
                      <label for="">Customize</label>
                      <input type="file">
                  </div>
              </div>
              <div>Locaiton Format:</div>
              <div>  
                 <div class="input-group">
                      <input type="radio">
                      <label for="">GPS(latitude, logitude)</label>
                  </div>
                  <div class="input-group">
                      <input type="radio">
                      <label for="">Point(x,y)</label>
                  </div>
                  <div class="input-group">
                      <input type="radio">
                      <label for="">Customize</label>
                      <input type="file">
                  </div>
              </div>
              <div>Map Preview</div>
              <div style="grid-column: 1/3">
              <img src="../assets/map.png" alt="" width="100%"></div>
             

          </div>
          <div id="tagsSetting">
              <div> <h6>Tags Setting</h6>
              </div>
              <div></div>
             <div>Types:</div>
             <div style="text-align:left">
               <ul style="display:inline-block;padding-left:5px">
                        <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">drone</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">sensor</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">robot</button></li>
                           <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">drone</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">sensor</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">robot</button></li>
                      
                          </ul>
                          <div class="input-group">
                        <input type="checkbox" name="" id="">
                          <input type="file" name="" id="">
                          <input type="text" name="" id="" placeholder="customize">
                          </div>
                        
             </div>
             <div>Hardware Architecture:</div>
                <div style="text-align:left">
                 <ul style="display:inline-block;padding-left:5px">
                         <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">ARM64</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">ARM32</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">8051</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">ARM64</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">ARM32</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">8051</button></li>
                          </ul>
                          <div class="input-group">
                                <input type="checkbox" name="" id="">
                          <input type="text" name="" id="" placeholder="customize">
                          </div>
                        
             </div>
              <div>Operation System:</div>
                <div style="text-align:left">
                <ul style="display:inline-block;padding-left:5px">
                        <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">FreeBSD</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">NetBSD</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">Darwin</button></li>
                            <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">FreeBSD</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">NetBSD</button></li>
                          <li class="my-li" style="display:inline-block"><button class="btn btn-primary btn-sm">Darwin</button></li>
                          </ul>
                          <div class="input-group">
                                <input type="checkbox" name="" id="">
                          <input type="text" name="" id="" placeholder="customize">
                          </div>
             </div>
            <div>
                <input type="text" name="" id="" placeholder="Other Tags">:
            </div>
            <div style="text-align:left"><input type="text" name="" id=""></div>
            <div style="height:500px"></div>
          </div>

      </form>
  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
      <table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
       <th scope="col">API Keys</th>
      <th scope="col">Read Only</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto@example.com</td>
      <td>********</td>
      <td></td>
      <td>
        <div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitch1">
  <label class="custom-control-label" for="customSwitch1"></label>
</div>
      </td>
      <td><button class="btn btn-primary">Edit</button>
      <button class="btn btn-primary">Delete</button>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Otto@example.com</td>
      <td>********</td>
      <td></td>
      <td><div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitch2">
  <label class="custom-control-label" for="customSwitch2"></label>
</div></td>
      <td><button class="btn btn-primary">Edit</button>
      <button class="btn btn-primary">Delete</button>
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>Otto@example.com</td>
      <td>********</td>
      <td></td>
      <td><div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitch3">
  <label class="custom-control-label" for="customSwitch3"></label>
</div></td>
      <td><button class="btn btn-primary">Edit</button>
      <button class="btn btn-primary">Delete</button>
      </td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Larry</td>
      <td>Otto@example.com</td>
      <td>********</td>
      <td></td>
      <td><div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitch4">
  <label class="custom-control-label" for="customSwitch4"></label>
</div></td>
      <td><button class="btn btn-primary">Edit</button>
      <button class="btn btn-primary">Delete</button>
      </td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Larry</td>
      <td>Otto@example.com</td>
      <td>********</td>
      <td></td>
      <td><div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="1">
  <label class="custom-control-label" for="1"></label>
</div></td>
      <td><button class="btn btn-primary">Edit</button>
      <button class="btn btn-primary">Delete</button>
      </td>
    </tr>
  </tbody>
</table>


  </div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
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
  #projectSetting{
      display: grid;
      grid-template-columns: 1fr 1fr;
  }
  #mapSetting{
      display: grid;
      grid-template-columns: 1fr 5fr;
  }
  #tagsSetting{
       display: grid;
      grid-template-columns: 2fr 5fr;
  }

</style>


