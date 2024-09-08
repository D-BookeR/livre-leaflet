let center = [5.37335, -4.00658];
let map = L.map("map").setView(center, 11);
L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `&copy; OpenStreetMap contributors`,
}).addTo(map);

fetch("data/abidjan.json")
  .then((response) => response.json())
  .then((data) => {
    const coordinates = data.map((point) => [
      point.lat,
      point.lng,
    ]);
    L.heatLayer(coordinates, { radius: 25 }).addTo(map);
  });
