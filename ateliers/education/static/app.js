const api = "http://127.0.0.1:5000/education";

let center = { lat: 48.9068, lng: 2.2464 };
let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  {
    attribution: `&copy; OpenStreetMap contributors`,
  }
).addTo(map);

/*
 */
let markerGroup = L.layerGroup().addTo(map);
let radius = 2000;
let center_circle = L.circle(center, {
  radius: radius,
  fillColor: "transparent",
  color: "#F00",
}).addTo(map);

//
function onLocationFound(e) {
  getData(e.latlng.lat, e.latlng.lng);
}
function onLocationError(e) {
  console.log(e.message);
}
map.on("locationfound", onLocationFound);
map.on("locationerror", onLocationError);
map.locate({ setView: true, maxZoom: 14 });

function onMapMove() {
  center = map.getCenter();
  getData(center.lat, center.lng);
}
map.on("moveend", onMapMove);
map.on("zoomend", onMapMove);

async function getData(lat, lng) {
  let url = api + `?lat=${lat}&lng=${lng}&radius=${radius}`;
  let resp = await fetch(url);
  let data = await resp.json();
  center = { lat: lat, lng: lng };
  center_circle.setLatLng(center);
  markerGroup.clearLayers();
  data.forEach((point) => {
    console.log(point);
    let marker = L.marker([
      parseFloat(point.lat),
      parseFloat(point.lng),
    ]).addTo(map).bindPopup(`
      <strong>${point.nom}</strong><br>
      ${point.cp} ${point.ville}
    `);
    markerGroup.addLayer(marker);
  });
  markerGroup.addTo(map);
}
