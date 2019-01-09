<template>
        <div class="row h-100">
            <div style="width:55px; background-color: #ececec">
                <nav id="nav" class="navbar navbar-light flex-grow-1">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <router-link class="navbar-brand" to="/home">
                                <img src="../assets/devices.png" width="30" height="30" alt="">
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="navbar-brand" to="/home/deployment">
                                <img src="../assets/deployment.png" width="30" height="30" alt="">
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="navbar-brand" to="/home/setting">
                                <img src="../assets/settings.png" width="30" height="30" alt="">
                            </router-link>
                        </li>                  
                    </ul>    
                </nav>
            </div>
    
            <div class="col-11">
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
    }
    
</script>

<style>
.navbar-brand{
    padding: 5px;
}
</style>
