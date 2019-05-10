<template>
  <div id="mappanel">
    <div id="panel">
      <router-view></router-view>
    </div>
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        map:"",
        address: localStorage.getItem('address')
    };
  },
  components: {

  },
  mounted() {
    this.$refs.map.style.height = window.innerHeight + "px";
    this.map = L.map("map").setView([45.749523, 18.20343], 5);
   
    L.tileLayer(
            "https://api.mapbox.com/styles/v1/jingyan/cj51kol9z1fnm2rmy82k24hqm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamluZ3lhbiIsImEiOiJjajN5dDU5bXUwMDhwMzNwanBxeGZoZDZrIn0.-5_CMLp6GDZYhe-7Ra_w_g",
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
    ).addTo(this.map);
  }
};
</script>

<style>
#mappanel {
  display: grid;
  grid-template-columns: 1fr 2.5fr;
}
</style>