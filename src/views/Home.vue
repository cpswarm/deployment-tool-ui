<template>
    <div id="container" ref="container">
            <div id="navbar" style="background-color:#52575b">              
                <div class="btn-group-vertical btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-dark active">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked>
                            <router-link class="" to="/home">
                                <img src="../assets/devices.png" width="25" height="22" title="Device Management">
                            </router-link>
                    </label>
                    <label class="btn btn-dark">
                        <input type="radio" name="options" id="option2" autocomplete="off">  
                            <router-link class="" to="/home/deployment">
                                <img src="../assets/deployment.png" width="25" height="25" title="Deployment Management">
                            </router-link>
                    </label>
                    <label class="btn btn-dark">
                        <input type="radio" name="options" id="option3" autocomplete="off">  
                            <router-link class="" to="/home/setting">
                                <img src="../assets/settings.png" width="25" height="25" title="Settings">
                            </router-link>
                    </label>
                </div>
            </div>
            <div id="mappanel">
                <router-view></router-view>
            </div>
        </div>

</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        
        data() {
            return {
                devices: "../assets/devices.png",
                deployment: "../assets/deployment.png",
                setting: "../assets/settings.png",
            }
        },
        components: {
            draggable,
        },
        mounted(){
           
        }
    }
    
</script>

<style>
#container {
display: grid;
grid-template-columns: 1fr 30fr;
}

#navbar label{
   border-radius: 0;
   padding: 10px 12px;
}


</style>
