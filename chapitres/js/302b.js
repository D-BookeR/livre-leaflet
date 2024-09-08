let center = [48.19905, -2.91138];
let map = L.map("map").setView(center, 9);

fetch("data/bretagne.geojson")
  .then((response) => response.json())
  .then((data) => {
    L.geoJson(data, {
      style: {
        color: "#000",
        weight: 3,
        opacity: 1,
        fillColor: "white",
        fillOpacity: 1,
      },
    }).addTo(map);
  });

let legend = L.control({ position: "bottomleft" });
legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "bretagne");
  div.innerHTML = `
  <strong>Bretagne</strong><br>
  <span class="bretagne-croix"></span>Croix<br>
  <span class="bretagne-calvaires"></span>Calvaires<br>
  <span class="bretagne-exvoto"></span>Ex-voto<br>
  `;
  return div;
};
legend.addTo(map);

fetch("data/bretagne-full.json")
  .then((response) => response.json())
  .then((data) => {
    tracePoints(data);
  });

function tracePoints(data) {
  let bounds = L.latLngBounds();
  data.forEach((value) => {
    let color = "#E42127";
    switch (value.type) {
      case "croix":
        color = "#FFD60C";
        break;
      case "calvaire":
        color = "#0054A0";
    }
    let item = L.circle(value, {
      color: color,
      weight: 0,
      fillOpacity: 0.5,
      radius: 1000,
    });
    item.addTo(map);
    bounds.extend(item.getLatLng());
  });
  map.fitBounds(bounds);
}
