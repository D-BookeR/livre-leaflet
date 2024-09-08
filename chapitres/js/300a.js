let center = [48.9068, 2.2464];
let map = L.map("map").setView(center, 2);
L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `&copy; OpenStreetMap contributors`,
}).addTo(map);

fetch("data/carte-scolaire.geojson")
  .then((response) => response.json())
  .then((data) => {
    drawMap(data);
  });

function drawMap(data) {
  const geo = L.geoJson(data, {
    style: { color: "#1D2F58" },
    onEachFeature: function (feature, layer) {
      //
    },
  });
  geo.bindPopup((layer) => {
    return `
    <b>${layer.feature.properties.nomcom}</b><br>
    ${layer.feature.properties.rne}
    `;
  });
  geo.addTo(map);
  map.fitBounds(geo.getBounds());
}

/*


    {"nomcom":"MALAKOFF","num_insee":"92046","rne":"MALAKOFF - HENRI WALLON"
    */
