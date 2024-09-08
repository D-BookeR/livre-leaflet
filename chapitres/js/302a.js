let center = [48.19905, -2.91138];
let map = L.map("map").setView(center, 9);
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

fetch("data/bretagne.geojson")
  .then((response) => response.json())
  .then((data) => {
    L.geoJson(data, {
      style: {
        color: "#000",
        weight: 3,
        opacity: 1,
        fillColor: "transparent",
      },
    }).addTo(map);
  });

fetch("data/bretagne.json")
  .then((response) => response.json())
  .then((data) => {
    traceCharts(data);
  });

function traceCharts(data) {
  for (var i = 0; i < data.length; i++) {
    let d = data[i];
    let item = L.minichart([d.lat, d.lng], {
      data: [d.croix, d.calvaires],
      type: "pie",
      labels: "auto",
      width: 250, // radius
      colors: ["#FFD60CAA", "#0054A0AA"],
      maxValues: d.croix + d.calvaires,
    });
    map.addLayer(item);
  }
}

let legend = L.control({ position: "bottomleft" });
legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "bretagne");
  div.innerHTML = `
  <strong>Bretagne</strong><br>
  <span class="bretagne-croix"></span>3.395 croix<br>
  <span class="bretagne-calvaires"></span>284 calvaires<br>
  `;
  return div;
};
legend.addTo(map);
