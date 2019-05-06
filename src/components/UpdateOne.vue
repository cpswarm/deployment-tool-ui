<template>
    <form class="updateDevice">
        <div style="grid-column: 1/4;">
            <button type="button" class="close" aria-label="Close" style="height:20px" @click="hideEdit">
                <span style="height:20px">&times;</span>
            </button>
        </div>
        <div class="mycard-title">Name:</div>
        <div class="mycard-content">
            <input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;" v-model="id">
        </div>
        <div></div>
        <div class="mycard-title">Tags:</div>
        <div class="mycard-content">
            <div class="input-group">
                <p style="margin:2.5px 0">Type:</p>
                <div class="btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="drone"> drone
                    </label>
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="swarm"> swarm
                    </label>
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="robot"> robot
                    </label>
                </div>
            </div>
            <div class="input-group">
                <p style="margin:2.5px 0">HW Arch:</p>
                <div class="btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="amd64"> amd64
                    </label>
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="arm32"> arm32
                    </label>
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="mcs51"> mcs51
                    </label>
                </div>
            </div>
            <div class="input-group">
                <p style="margin:2.5px 0">OS:</p>
                <div class="btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="freebsd"> freebsd
                    </label>
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="netbsd"> netbsd
                    </label>
                    <label class="btn btn-light" style=" font-size: 13px; padding: 0 5px;margin:2.5px">
                        <input type="checkbox" autocomplete="off" value="darwin"> darwin
                    </label>
                </div>
            </div>
        </div>
        <div></div>
        <div class="mycard-title">Location:</div>
        <div><input type="text" class="form-control form-control-sm" style="font-size: 14px;height: 22px;padding: 5px;" v-model='location'>
        </div>
        <div></div>
        <div style="text-align:right;margin-top:5px;grid-column:1/4">
            <button type="button" class="btn btn-primary btn-sm" style="font-size:13px;padding: 2.5px 5px;"
                @click="submitEdit(device.id)">Update</button>
        </div>
    </form>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  data(){
      return{
          id:'',
          location: [0,0],
          address: localStorage.getItem('address'),
      }
  },
  props:['device'],
  methods:{
      hideEdit: function (){
          this.$el.style.display ='none';
          // this.$parent.
      },
      submitEdit: function (id) {

            let input = this.$el.childNodes[5].getElementsByTagName('input');
            let myUpdate = {
                tags: [],
                location: {
                    lon: parseFloat(this.location.split(',')[0]),
                    lat: parseFloat(this.location.split(',')[1])
                }
            }
            Array.from(input).map(item => {
                if (item.checked) {
                    myUpdate.tags.push(item.value)
                }
            });
            $('#mymodal-body').empty();
            $('#mymessage-body').empty();
            //console.log(myUpdate)

            //event.path[4].childNodes[0].style.display = 'grid';
            //event.path[4].childNodes[2].style.display = 'none';

            axios.put(this.address + "/targets/" + id, myUpdate).then(response => {

                let i = this.$root.devices.findIndex(el => el.id == id);

                this.devices[i].marker.setLatLng(L.latLng(myUpdate.location.lon, myUpdate.location.lat));
                this.devices[i].marker.title = myUpdate.id;
                this.devices[i].marker.alt = myUpdate.tags;

                this.map.panTo(this.devices[i].marker.getLatLng())

                this.$set(this.devices[i], 'id', myUpdate.id);
                this.$set(this.devices[i], 'tags', myUpdate.tags);
                this.$set(this.devices[i], 'location', myUpdate.location);
                //this.$set(this.devices[i], 'marker', marker)

                $('#myMessage').modal();
                $('#mymessage-body').append("Update target with " + id + "  " + response.statusText)
                //console.log(this.devices.length)
            }
            ).catch(error => {
                $('#myAlert').modal();
                $('#mymodal-body').append("Update target with " + id + "  " + error);
            });
            //console.log(event.path)
      }
  },
  mounted(){
    this.id = this.$props.device.id;

    this.location[0] = this.$props.device.location.lon;
    this.location[1] = this.$props.device.location.lat;

    if (this.$props.device.tags) {
        this.$props.device.tags.map(item => {
            let tag = this.$el.childNodes[5];
            Array.from(tag.getElementsByTagName('label')).forEach(el => {               
                if (el.childNodes[0].value == item) {
                    el.childNodes[0].checked = "true"
                    el.setAttribute('class', 'btn btn-light active');
                }
            })
        })
    }
  }
}
</script>
<style>
.updateDevice {
  display: grid;
  grid-template-columns: 0.7fr 4fr 0.5fr;
  grid-gap: 2.5px;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding: 5px 2.5px;
  margin-bottom: 5px;
}

</style>


