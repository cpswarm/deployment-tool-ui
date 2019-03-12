showRelationship: function(tag, location) {

    this.devices.forEach(function (target) {
        if (target.tags.some(el => el == tag)) {
            //console.log(target.location)
            var latlngs = [
                [target.location.lon, target.location.lat],
                [location.lon, location.lat]]
            var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
            map.fitBounds(polyline.getBounds());


            console.log(polyline)
        }
    })
    // zoom the map to the polyline

},