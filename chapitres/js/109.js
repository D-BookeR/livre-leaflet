let image = { w: 2900, h: 1500, src: "img/karkane.png" };
let bounds = [
  [0, 0],
  [image.h, image.w],
];
let map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 20,
  attributionControl: false,
  maxBounds: bounds,
});
L.imageOverlay(image.src, bounds).addTo(map);

let center = [image.h / 2, image.w / 2];
map.setView(center, 0);
L.control
  .attribution({ prefix: "Karkane, by R. Carlier" })
  .addTo(map);

// pensez à afficher la console de votre navigateur...
map.on("click", function (e) {
  let y = parseFloat(e.latlng.lat);
  let x = parseFloat(e.latlng.lng);
  let content = y.toFixed(2) + ", " + x.toFixed(2);
  navigator.clipboard.writeText(content);
  console.log(`Marker : ${y},${x}`);
});

const teleporters = [
  { pos: [1358.74, 302.75], name: "Marrac" },
  { pos: [1251.43, 1210.0], name: "Ksat" },
  { pos: [1104.95, 1771.75], name: "Famye" },
  { pos: [1021.7, 2566.25], name: "Pua" },
  { pos: [825.45, 1107.5], name: "Chogr" },
  { pos: [108.08, 1975.25], name: "Trab" },
  { pos: [199.08, 2779.63], name: "Agb" },
  { pos: [200.4, 274.25], name: "Archipel perdu" },
];
for (let tel of teleporters) {
  const marker = L.marker(tel.pos).addTo(map);
  marker.bindPopup(`Téléporteur <br>${tel.name}`);
}
