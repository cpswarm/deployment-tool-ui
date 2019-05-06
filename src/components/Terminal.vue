<template>
  <div>
    <div style="background-color:#dedede;height:22px">
      <div style="font-size:14px; display:inline-block">$agent:{{deviceId}}</div>
      <button type="button" class="close" aria-label="Close" style="height:20px" @click="hideTerminal">
        <span style="height:20px">&times;</span>
      </button>
    </div>
    <textarea v-model="terminal" class="myTerminal" style="width: 100%" rows="10" @input="submitTerminal(deviceId)" autofocus v-bind:id="deviceId"></textarea>
  </div>
</template>

<script>
import $ from "jquery"
import axios from "axios"
export default {
  data(){
    return{
      terminal:'$ ',
      address:localStorage.getItem('address'),
      ws:''
    }
  },
  props:['deviceId'],
  methods:{
    hideTerminal: function() {
        this.$el.style.display = 'none';
        //console.log(this.$parent)
    },
    submitTerminal: function(id){

        var commands = this.terminal.split("\n");
        //console.log(commands[commands.length - 1] == '');
            
        if (commands[commands.length - 1] == '') {
            //console.log(commands[commands.length - 2].substring(2));
            var command = {
                command: commands[commands.length - 2].substring(2)
            }
            axios.put(this.address + "/targets/" + id + "/command", command).then(response => {
                    //console.log(response)
                    if (this.address.indexOf('https') > -1) {
                        this.ws = new WebSocket("wss://" + this.address.substring(7) + "/events?topics=logs&task=terminal");
                    } else {
                        this.ws = new WebSocket("ws://" + this.address.substring(7) + "/events?topics=logs&task=terminal");
                    }
                    this.ws.onopen = function () {
                        console.log("Socket connected.");
                    };
                    this.ws.onmessage = event => {
                        console.log(this);
                        var obj = JSON.parse(event.data);
                        obj.payload.forEach(l => { this.terminal += l.output; })
                        this.terminal += '\n$ ';
                    };
                    this.ws.onclose = function () {
                        console.log("Socket disconnected.");
                    };
                }).catch(error => {
                    this.terminal += this.terminal += '\n' + error +'\n$ ';
                })
            } 
    }
  },
  mounted(){
    var ctrlDown = false,
            ctrlKey = 17,
            cmdKey = 91,
            cKey = 67;

    $('#'+this.$props.deviceId).keydown(function (e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    }).keyup(function (e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });

    // Document Ctrl + C
    $('#'+this.$props.deviceId).keydown(e => {
        if (ctrlDown && (e.keyCode == cKey)) {
            //console.log('crtl+c')
            axios.delete(this.address + "/targets/" + this.$props.deviceId + "/command").then(response => {
                //console.log(response.data)
                this.terminal += '\n'+ response.data +'\n'
            }).catch(error => {
                this.terminal += '\n' + error +'\n$ ';
            })  
        }
    }); 
  }
};
</script>
<style>
.myTerminal{
  background-color: black;
  color: white;
  font: 11.5px Inconsolata, monospace;
  text-shadow: 0 0 5px #C8C8C8;
}
</style>

