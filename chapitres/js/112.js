// PARIS-BRUXELLES-LONDRES
// let center = [48.9068, 2.2464];
// let map = L.map("map").setView(center, 7);
// let layer = L.tileLayer(
//   "https://tile.osm.org/{z}/{x}/{y}.png",
//   { attribution: `&copy; OpenStreetMap contributors` }
// ).addTo(map);

// L.polygon([
//   [48.86291, 2.34421], // Paris
//   [50.84649, 4.35299], // Bruxelles
//   [51.50874, -0.11948], // Londres
// ]).addTo(map);

// LA TOUR EIFFEL
// let center = [48.85846, 2.2944];
// let map = L.map("map").setView(center, 17);
// let layer = L.tileLayer(
//   "https://tile.osm.org/{z}/{x}/{y}.png",
//   { attribution: `&copy; OpenStreetMap contributors` }
// ).addTo(map);

// L.polygon(
//   [
//     // contour extérieur
//     [
//       [48.86001, 2.29516],
//       [48.85898, 2.29685],
//       [48.85669, 2.29358],
//       [48.8578, 2.29188],
//     ],
//     // contour intérieur
//     [
//       [48.85903, 2.29449],
//       [48.85829, 2.2957],
//       [48.85749, 2.29453],
//       [48.85824, 2.29331],
//     ],
//   ],
//   {
//     color: "#E27000",
//     fillOpacity: 0.5,
//   }
// ).addTo(map);

// DECOUPAGE SCOLAIRE
let center = [48.9068, 2.2464];
let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

let guest = [
  [48.90087, 2.23267],
  [48.90479, 2.22653],
  [48.90857, 2.23728],
  [48.90692, 2.23896],
  [48.90226, 2.23967],
];
L.polygon(guest, {
  color: "#7CC02D",
  fillOpacity: 0.25,
}).addTo(map);

let renan = [
  [48.90857, 2.23728],
  [48.90692, 2.23896],
  [48.90226, 2.23967],
  [48.90278, 2.24264],
  [48.90235, 2.24301],
  [48.90299, 2.2457],
  [48.90702, 2.24351],
  [48.90916, 2.24602],
  [48.90982, 2.24576],
  [48.90982, 2.24576],
  [48.91046, 2.24824],
  [48.91193, 2.24744],
];
L.polygon(renan, {
  color: "#65D4F7",
  fillOpacity: 0.25,
}).addTo(map);

let voltaire = [
  [48.91193, 2.24746],
  [48.91046, 2.24825],
  [48.90982, 2.24576],
  [48.90918, 2.24602],
  [48.90704, 2.24351],
  [48.90225, 2.24614],
  [48.90205, 2.24651],
  [48.90341, 2.25226],
  [48.90403, 2.25417],
  [48.90575, 2.25326],
  [48.90626, 2.25513],
  [48.90785, 2.25419],
  [48.90814, 2.2555],
  [48.91119, 2.25463],
  [48.91334, 2.25328],
];
L.polygon(voltaire, {
  color: "#FDE81D",
  fillOpacity: 0.25,
}).addTo(map);

let marsault = [
  [48.90403, 2.25417],
  [48.90575, 2.25326],
  [48.90626, 2.25513],
  [48.90785, 2.25419],
  [48.90814, 2.2555],
  [48.91119, 2.25463],
  [48.91334, 2.25328],
  [48.91358, 2.25598],
  [48.91337, 2.2579],
  [48.91088, 2.25766],
  [48.91096, 2.25707],
  [48.90611, 2.25819],
  [48.9054, 2.25583],
];
L.polygon(marsault, {
  color: "#F585C0",
  fillOpacity: 0.25,
}).addTo(map);

let schools = [
  ...guest,
  ...renan,
  ...voltaire,
  ...marsault,
];

let bounds = L.latLngBounds(schools);
map.fitBounds(bounds);
