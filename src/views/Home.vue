<template>
    <div id="container" ref="container">
            <div id="navbar">              
                <div class="btn-group-vertical btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-light active">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked>
                            <router-link class="" to="/home">
                                <img src="../assets/devices.png" width="30" height="30" alt="">
                            </router-link>
                    </label>
                    <label class="btn btn-light">
                        <input type="radio" name="options" id="option2" autocomplete="off">  
                            <router-link class="" to="/home/deployment">
                                <img src="../assets/deployment.png" width="30" height="30" alt="">
                            </router-link>
                    </label>
                    <label class="btn btn-light">
                        <input type="radio" name="options" id="option3" autocomplete="off">  
                            <router-link class="" to="/home/setting">
                                <img src="../assets/settings.png" width="30" height="30" alt="">
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
   border-radius: 0
}


</style>
