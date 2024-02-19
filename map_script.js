// map_script.js
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

// OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

// GPS localization (example coordinates, replace with your logic)
//if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(function (position) {
//        var latlng = [position.coords.latitude, position.coords.longitude];
//        L.marker(latlng).addTo(mymap).bindPopup('You are here!');
//        mymap.setView(latlng, 13);
//    }, function (error) {
//        console.error('Error getting geolocation:', error.message);
//   });
//}

// Function to update the user's location
function updateLocation(position) {
    var latlng = [position.coords.latitude, position.coords.longitude];

    // If the marker already exists, update its position
    if (marker) {
        marker.setLatLng(latlng);
    } else {
        // If the marker doesn't exist, create it
        marker = L.marker(latlng).addTo(mymap).bindPopup('You are here!');
    }

    // Center the map on the updated location
    mymap.setView(latlng, mymap.getZoom());
}

// Function to handle errors in getting geolocation
function handleLocationError(error) {
    console.error('Error getting geolocation:', error.message);
}

// Refresh the user's location every 5 seconds (adjust as needed)
setInterval(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);
    }
}, 5000);

// WMS Layer (replace with your WMS server details)
var wmsLayer = L.tileLayer.wms('http://your-wms-server-url', {
    layers: 'your_wms_layer',
    format: 'image/png',
    transparent: true
}).addTo(mymap);
