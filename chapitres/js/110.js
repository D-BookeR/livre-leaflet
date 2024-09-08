let center = [47.65845, -2.75791];
let map = L.map("map").setView(center, 10);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

// L.circle(center, { radius: 1000 }).addTo(map);

L.circle(center, {
  color: "red",
  fillColor: "transparent",
  weight: 10,
  radius: 30000,
  dashArray: "10,20",
}).addTo(map);

L.circle(center, {
  color: "white",
  fillColor: "#FFF",
  fillOpacity: 0.5,
  radius: 10000,
}).addTo(map);

let circle = L.circle(center, {
  color: "blue",
  fillColor: "#30f",
  fillOpacity: 1,
  radius: 1000,
}).addTo(map);
circle.bindPopup("1 km").openPopup();

L.circleMarker([47.86469, -3.54721], {
  radius: 10, // Rayon du cercle en pixels
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
}).addTo(map);

//
let bounds = [
  [47.6581, -3.5231],
  [47.6152, -3.4076],
];
L.rectangle(bounds, {
  color: "#ff00FF",
  weight: 3,
}).addTo(map);
