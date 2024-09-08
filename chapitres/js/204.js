/*

*/
let map = L.map("map").setView([0, 0], 15);
L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `&copy; OpenStreetMap contributors`,
}).addTo(map);

let options = {
  p1: [47.65428, -2.74658],
  p2: [48.90704, 2.24347],
};
L.control.measureDistance(options).addTo(map);
