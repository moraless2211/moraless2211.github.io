// map_script.js
var mymap = L.map('mapid').setView([52.46707417807353, 16.92480901467294], 20);
var marker;
var selectedLayer;
var transparencyControl;

// Base layers
var openStreetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});

var anotherBaseLayer = L.tileLayer('https://{s}.example.com/{z}/{x}/{y}.png', {
    attribution: 'Another Attribution'
});

// Overlay layers (WMS layer as an example)
var wmsLayer = L.tileLayer.wms('http://your-wms-server-url', {
    layers: 'your_wms_layer',
    format: 'image/png',
    transparent: true
});

// Group base layers
var baseLayers = {
    'OpenStreetMap': openStreetMapLayer,
    'Another Base Layer': anotherBaseLayer
};

// Group overlay layers
var overlayLayers = {
    'WMS Layer': wmsLayer
};

// Add layers to the map
openStreetMapLayer.addTo(mymap); // Default base layer
wmsLayer.addTo(mymap); // Default overlay layer

// Layer control
L.control.layers(baseLayers, overlayLayers).addTo(mymap);

// Transparency control
transparencyControl = L.control.transparency({
    position: 'topright',
    label: 'Transparency'
}).addTo(mymap);

// Function to update the selected layer
function updateLayer(selectedLayer) {
    mymap.eachLayer(function (layer) {
        if (layer !== mymap) {
            mymap.removeLayer(layer);
        }
    });

    selectedLayer.addTo(mymap);
}

// Event listener for layer control
mymap.on('overlayadd', function (event) {
    selectedLayer = event.layer;
    updateLayer(selectedLayer);
});

// Event listener for transparency control
transparencyControl.addEventListener('change', function (event) {
    if (selectedLayer) {
        selectedLayer.setOpacity(1 - event.value);
    }
});

// Function to set the selected layer
function setSelectedLayer(layerName) {
    selectedLayer = overlayLayers[layerName];
    updateLayer(selectedLayer);
}

// Set the initial selected layer (replace 'WMS Layer' with your desired default layer name)
setSelectedLayer('WMS Layer');
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
        marker = L.marker(latlng).addTo(mymap).bindPopup('Twoja lokalizacja');
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
//var wmsLayer = L.tileLayer.wms('http://your-wms-server-url', {
//    layers: 'your_wms_layer',
//    format: 'image/png',
//    transparent: true
//}).addTo(mymap);
