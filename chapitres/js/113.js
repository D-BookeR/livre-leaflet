// DECOUPAGE SCOLAIRE
let center = [48.9068, 2.2464];
let map = L.map("map").setView(center, 16);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

let logoImg = L.control({ position: "topright" });
logoImg.onAdd = function (map) {
  let img = L.DomUtil.create("img", "panneau");
  img.src = "img/logo.png";
  img.style.width = "100px";
  return img;
};
logoImg.addTo(map);

/**
 * Image Overlay
 */
let image = "img/92250.png";
let zone = [
  // coordonnées en haut à gauche
  [48.91032, 2.24496],
  // coordonnées en bas à droite
  [48.90979, 2.24565],
];

L.imageOverlay(image, zone, {
  opacity: 1,
}).addTo(map);

/**
 * Un marqueur personnalisé
 */
let img = L.divIcon({
  className: "",
  html: `<img width="98" height="98" src="img/92250.png">`,
  iconSize: [98, 98],
  iconAnchor: [49, 98],
});
let pos = [48.90883, 2.25147];
L.marker(pos, { icon: img, interactive: false }).addTo(map);
