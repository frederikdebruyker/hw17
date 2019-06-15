// set map
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


// get data
// all earthquakes in the last 30 days
var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'; // testing
// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
  // process each line of data and call function above
  var earthquakes = L.geoJSON(data.features, {
    onEachFeature: onEachFeature
  });
  // create overlay object to hold overlay layer with earthquakes
  var overlayMaps = {
    Earthquakes: earthquakes
  };
  // Create our map, giving it the grayscale map and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      39, -115
    ],
    zoom: 6,
    layers: [lightmap, earthquakes]
  });

});

// add features based upon the data
function onEachFeature(feature, layer) {
  console.log(feature);
  // bind a popup
  layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr>" +
    "<p>Magnitude: " + feature.properties.mag + "</p>" +
    "<p>Date     : " + new Date(feature.properties.time) + "</p>");
}


