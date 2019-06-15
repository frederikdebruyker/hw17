// all earthquakes in the last 30 days
var queryUrl ='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'; // testing
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features);

});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr>" +
    "<p>Magnitude: " + feature.properties.mag + "</p>" +
    "<p>Date     : " + new Date(feature.properties.time) + "</p>");
    // console.log(feature);
    // console.log(feature.geometry.coordinates)
    // layer.circle(feature.geometry.coordinates, {
    //   fillOpacity:0.75,
    //   color: "yellow",
    //   fillColor:"purple",
    //   radius:markerSize(feature.properties.mag)
    // })
    // Create a circle and pass in some initial options
    // L.circle([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], {
    //   color: "green",
    //   fillColor: "green",
    //   fillOpacity: 0.75,
    //   radius: 500
    // }).addTo("map");

  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

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

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      39, -115
    ],
    zoom: 6,
    layers: [lightmap, earthquakes]
  });

// Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {

//   L.circle(cities[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
//     // Setting our circle's radius equal to the output of our markerSize function
//     // This will make our marker's size proportionate to its population
//     radius: markerSize(cities[i].population)

//   }).bindPopup(`
//     <h1> ${cities[i].name} </h1> 
//     <hr> 
//     <h3>Population:  ${cities[i].population} </h3>
//   `)
//   .addTo(myMap);

// }
  // earthquakes.onEachFeature(earthquake, {
  //   console.log(earthquake)
  // }

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  // console.log(feature);
  // console.log(earthquakeData);
}

//////////////////////////////////
// // Create a red circle over Dallas
// L.circle([32.7767, -96.7979], {
//   color: "red",
//   fillColor: "red",
//   fillOpacity: 0.75,
//   radius: 10000
// }).addTo(myMap);

// // Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {

//   L.circle(cities[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
//     // Setting our circle's radius equal to the output of our markerSize function
//     // This will make our marker's size proportionate to its population
//     radius: markerSize(cities[i].population)

//   }).bindPopup(`
//     <h1> ${cities[i].name} </h1> 
//     <hr> 
//     <h3>Population:  ${cities[i].population} </h3>
//   `)
//   .addTo(myMap);

// }
