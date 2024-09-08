let center = [47.62329, -2.72598];
let map = L.map("map").setView(center, 12);
L.tileLayer(
  "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "&copy; Breton OpenStreetMap Team",
    bounds: [
      [46.2, -5.5],
      [50, 0.7],
    ],
  }
).addTo(map);
/**
 *
 *
 *
 */

function onMapClick(ev) {
  let pos = ev.latlng;

  console.log(pos);

  let content =
    pos.lat.toFixed(5) + ", " + pos.lng.toFixed(5);
  console.log("clipboard ", content);
  navigator.clipboard.writeText(content);
}
map.on("click", onMapClick);
