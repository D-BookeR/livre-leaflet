let center = [48.9068, 2.2464];
let map = L.map("map").setView(center, 2);
L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `&copy; OpenStreetMap contributors`,
}).addTo(map);

let geo = null;
function loadGeoJSON(file) {
  let reader = new FileReader();
  reader.onload = function (e) {
    let data = JSON.parse(e.target.result);
    if (geo) map.removeLayer(geo);
    geo = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        let content = "";
        let props = feature.properties;
        for (let key in props) {
          content += `<big>
          <b>${key}</b>: ${props[key]}<br>
          </big>`;
        }
        layer.bindPopup(content);
      },
    });

    geo.addTo(map);
    map.fitBounds(geo.getBounds());
  };
  reader.readAsText(file);
}

let mapDnD = document.getElementById("map");
mapDnD.addEventListener("dragover", function (e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
});
mapDnD.addEventListener("drop", function (e) {
  e.stopPropagation();
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  loadGeoJSON(file);
});
