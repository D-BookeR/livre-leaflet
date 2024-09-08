// let center = [48.9068, 2.2464];
// let map = L.map("map").setView(center, 7);
// let layer = L.tileLayer(
//   "https://tile.osm.org/{z}/{x}/{y}.png",
//   { attribution: `&copy; OpenStreetMap contributors` }
// ).addTo(map);

// L.polyline([
//   [48.86291, 2.34421], // Paris
//   [50.84649, 4.35299], // Bruxelles
//   [51.50874, -0.11948], // Londres
// ]).addTo(map);

let center = [48.9068, 2.2464];
let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

let cycles = [
  { lat: 48.90659, lng: 2.24681, txt: "Départ" },
  { lat: 48.90574, lng: 2.25341, txt: "Point 2" },
  { lat: 48.90624, lng: 2.25509, txt: "Point 3" },
  { lat: 48.91209, lng: 2.25182, txt: "Point 4" },
  { lat: 48.90969, lng: 2.24196, txt: "Point 5" },
  { lat: 48.90702, lng: 2.24347, txt: "Point 6" },
  { lat: 48.90669, lng: 2.24601, txt: "Arrivée" },
];

let polyline = L.polyline(cycles, {
  color: "red",
  weight: 10,
}).addTo(map);

cycles.forEach(function (cy) {
  L.marker(cy).addTo(map).bindPopup(cy.txt);
});
let bounds = L.latLngBounds(cycles);
map.fitBounds(bounds);

let legend = L.control({ position: "topright" });
legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "legend");
  div.innerHTML = `<h2>Course cycliste 2023<br>La Garenne-Colombes</h2>`;
  return div;
};
legend.addTo(map);
