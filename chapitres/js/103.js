let center = [48.9068, 2.2464];

let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

const marker = L.marker(center).addTo(map);
marker
  .bindPopup("Cliquez pour obtenir des coords.")
  .openPopup();

function onMapClick(ev) {
  let pos = ev.latlng;
  let content =
    pos.lat.toFixed(5) + ", " + pos.lng.toFixed(5);
  marker
    .setLatLng(pos)
    .setPopupContent(content)
    .openPopup();
  navigator.clipboard.writeText(content);
}
map.on("click", onMapClick);
