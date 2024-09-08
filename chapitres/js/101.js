let map = L.map("map");
map.setView([48.9068, 2.2464], 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
);
layer.addTo(map);
