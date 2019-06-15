// Define satellite map / grayscale map / outdoors map layers
var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Satellite": satellitemap,
  "Grayscale": lightmap,
  "Outdoors": outdoorsmap,
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    39, -115
  ],
  zoom: 6,
  layers: [lightmap]
});

// all earthquakes in the last 30 days
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
// queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'; // testing
// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
  // initialize the map
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);

});

function onEachFeature(feature, layer) {

  L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
    fillOpacity: 0.50,
    color: 'LightGray',
    fillColor: intensityColor(feature.properties.mag),
    radius: feature.properties.mag * 15000
  }).bindPopup("<h3>" + feature.properties.place + "</h3><hr>" +
    "<p>Magnitude: " + feature.properties.mag + "</p>" +
    "<p>Date     : " + new Date(feature.properties.time) + "</p>").addTo(myMap);

}

function createFeatures(earthquakeData) {

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

}

// adjust background color based upon magnitude
function intensityColor(magnitude) {
  var color;
  if (magnitude < 1) {
    color = "#00FF00"; // green
  }
  else if (magnitude < 2) {
    color = "#6AFF00"
  }
  else if (magnitude < 3) {
    color = "#D4FF00"
  }
  else if (magnitude < 4) {
    color = "#FFC100"
  }
  else if (magnitude < 5) {
    color = "#FF5700"
  }
  else {
    color = "#FF0000" // red
  }
  return [color]
}

