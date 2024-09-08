let center = { lat: 48.9068, lng: 2.2464 };

let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

/**
 *
 *
 *
 */
// const marker = L.marker(center).addTo(map);
// marker.bindPopup("Cliquez...").openPopup();

function onMapClick(ev) {
  let p = ev.latlng;
  let content = p.lat.toFixed(5) + ", " + p.lng.toFixed(5);
  marker.setLatLng(p).setPopupContent(content).openPopup();
  navigator.clipboard.writeText(content);
}
map.on("click", onMapClick);

const marker = L.marker(center, { draggable: true });
marker
  .addTo(map)
  .bindPopup("Cliquez...<br>Et ouvrez la console")
  .openPopup();

function onDragMarker(ev) {
  const p = marker.getLatLng();
  let content = p.lat.toFixed(5) + ", " + p.lng.toFixed(5);
  marker.setPopupContent(content).openPopup();
}

marker.on("drag", onDragMarker);

function showInfos() {
  console.clear();
  console.log("getCenter", map.getCenter());
  console.log("getZoom", map.getZoom());
  console.log("getSize", map.getSize());

  let limites = map.getBounds();
  console.log("bounds", limites);
  console.log("getNorth", limites.getNorth());
  console.log("getWest", limites.getWest());
  console.log("getSouth", limites.getSouth());
  console.log("getEast", limites.getEast());

  console.log("getNorthWest", limites.getNorthWest());
  console.log("getNorthEast", limites.getNorthEast());
  console.log("getSouthWest", limites.getSouthWest());
  console.log("getSouthEast", limites.getSouthEast());

  marker.setLatLng(map.getCenter());
}
map.on("moveend", showInfos);
map.on("zoomend", showInfos);
