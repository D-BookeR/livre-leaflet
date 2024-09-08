let center = [46.60622, 2.49846];
let map = L.map("map").setView(center, 4);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

fetch("data/fromages.json")
  .then((response) => response.json())
  .then((data) => {
    console.table(data[0]);
    tracePoints(data);
  });

function tracePoints(data) {
  let bounds = L.latLngBounds();
  data.forEach((value) => {
    let item = L.circle([value.lat, value.lng], {
      color: "blue",
      weight: 1,
      fillOpacity: 0.5,
      radius: 2000 * value.count,
    });
    let list = value.fromages
      .sort((a, b) => a.localeCompare(b))
      .map((fromage) => `&bullet;&nbsp;${fromage}<br>`)
      .join("");
    item.bindPopup(`
      <b>${value.departement}</b> (${value.count})<br>
      ${list}
    `);
    item.addTo(map);
    bounds.extend(item.getLatLng());
  });
  map.fitBounds(bounds);
}
