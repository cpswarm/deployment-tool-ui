<template>
    <div id="container">
            <div id="navbar">
                    <ul id='navitems'>
                        <li class="navitem">
                            <router-link class="" to="/home">
                                <img src="../assets/devices.png" width="30" height="30" alt="">
                            </router-link>
                        </li>
                        <li class="navitem">
                            <router-link class="" to="/home/deployment">
                                <img src="../assets/deployment.png" width="30" height="30" alt="">
                            </router-link>
                        </li>
                        <li class="navitem">
                            <router-link class="" to="/home/setting">
                                <img src="../assets/settings.png" width="30" height="30" alt="">
                            </router-link>
                        </li>                  
                    </ul>      
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
    }
    
</script>

<style>
#container {
display: flex;
flex-direction: row;
}
#navbar{
flex-grow: 1
}
#mappanel{
    flex-grow: 11;
    display: flex;
}
#navitems{
    text-decoration: none;
    padding: 0
}
.navitem{
    padding: 5px;
}
.navitem:hover{
    background-color: black
}

</style>
