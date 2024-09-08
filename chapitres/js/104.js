let center = [48.9068, 2.2464];

let map = L.map("map").setView(center, 11);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

let markerGroup = L.layerGroup().addTo(map);
let markerPositions = [];

lgc_school.forEach((school) => {
  let marker = L.marker([school.lat, school.lng]);
  marker.bindPopup(
    `<strong>${school.nom}</strong><br>
    ${school.adresse}<br>
    ${school.cp} ${school.ville}`
  );
  markerGroup.addLayer(marker);
  markerPositions.push([school.lat, school.lng]);
});

markerGroup.addTo(map);
let bounds = L.latLngBounds(markerPositions);
map.fitBounds(bounds);
