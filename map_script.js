// map_script.js
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

// GPS localization (example coordinates, replace with your logic)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latlng = [position.coords.latitude, position.coords.longitude];
        L.marker(latlng).addTo(mymap).bindPopup('You are here!');
        mymap.setView(latlng, 13);
    }, function (error) {
        console.error('Error getting geolocation:', error.message);
    });
}

// WMS Layer (replace with your WMS server details)
var wmsLayer = L.tileLayer.wms('http://your-wms-server-url', {
    layers: 'your_wms_layer',
    format: 'image/png',
    transparent: true
}).addTo(mymap);
