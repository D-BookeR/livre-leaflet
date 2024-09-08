let map = L.map("map", {
  // cacher les boutons de zoom
  zoomControl: false,
  // cacher l'attribution
  attributionControl: false,
  // régler les zooms
  minZoom: 5,
  maxZoom: 15,
});
map.setView([48.9068, 2.2464], 18);

let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  {
    attribution: `&copy; OpenStreetMap contributors`,
  }
);
layer.addTo(map);

L.control.scale().addTo(map);

/**
 * Control : DomUtil pour créer une div et remplir son innerHTML
 */
let logoDiv = L.control({ position: "topright" });
logoDiv.onAdd = function (map) {
  let div = L.DomUtil.create("div", "panel");
  div.innerHTML = `<div>
  <img width=100 src="img/92250.png" alt=""><br>
  Coucou
  </div>`;
  return div;
};
logoDiv.addTo(map);

/**
 * Control : DomUtil pour créer une img et modifier ses attributs
 */
let logoImg = L.control({ position: "bottomright" });
logoImg.onAdd = function (map) {
  let img = L.DomUtil.create("img");
  img.src = "img/logo.png";
  img.style.width = "100px";
  return img;
};
logoImg.addTo(map);

/**
 * Image Overlay
 */
// let image1 = {
//   url: "img/92250.png",
//   zone: [
//     [48.9083, 2.2427],
//     [48.9093, 2.2442],
//   ], // haut / bas
// };
// L.imageOverlay(image1.url, image1.zone, {
//   opacity: 0.6,
//   interactive: true,
// })
//   .bindPopup("Coucou")
//   .addTo(map);
