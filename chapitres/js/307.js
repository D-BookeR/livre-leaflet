let center = [46.8383, 4.7279];
let map = L.map("map").setView(center, 7);
L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `&copy; OpenStreetMap contributors`,
}).addTo(map);

fetch("data/viticole.json")
  .then((response) => response.json())
  .then((data) => {
    drawClusters(data);
  });

function drawClusters(data) {
  let bounds = L.latLngBounds();
  const markers = L.markerClusterGroup();
  data.forEach((point) => {
    const marker = L.marker([point.lat, point.lng]);
    marker.bindPopup(`
      <b>${point.commune}</b><br>
      ${point.count} producteur(s)<br>
      `);
    markers.addLayer(marker);
    bounds.extend(marker.getLatLng());
  });
  map.addLayer(markers);
  map.fitBounds(bounds);
}
