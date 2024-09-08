// prettier-ignore
const colors = ['#eceff1', '#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a']
// prettier-ignore
const bins_val = [0, 3, 8, 40, 143, 206, 355, 525, 760,1671, "et +"];

let center = [48.9068, 2.2464];
let map = L.map("map").setView(center, 4);
L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `&copy; OpenStreetMap contributors`,
}).addTo(map);

function style(feature) {
  return {
    fillColor: colors[feature.properties.bins],
    weight: 1,
    opacity: 1,
    color: "#000",
    fillOpacity: 0.75,
  };
}

/*
Infos
*/
let info = L.control();
info.onAdd = function (map) {
  this.div = L.DomUtil.create("div", "europe");
  this.update();
  return this.div;
};
info.update = function (props) {
  if (!props) {
    this.div.innerHTML = `Survolez un pays`;
    return;
  }
  this.div.innerHTML = `
      <b>${props.name}</b><br>
      Pop: ${props.pop_est}
      `;
};
info.addTo(map);

/*
Légende
*/
let legend = L.control({ position: "bottomleft" });
legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "europe");
  div.innerHTML = "<b>Population<br>Européenne</b><br>";
  for (let i = 0; i < colors.length; i++) {
    div.innerHTML += `
    <span style="background:${colors[i]}"></span>
    ${bins_val[i]} - 
    ${bins_val[i + 1]}
    <br>`;
  }
  div.innerHTML += `<small>* 10.000</small>`;
  return div;
};
legend.addTo(map);

fetch("data/europe.geojson")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    drawMap(data);
  });

function drawMap(data) {
  let geo = L.geoJSON(data, {
    style: style,
    onEachFeature: (feature, layer) => {
      layer.on("mouseover", (e) => {
        let layer = e.target;
        layer.setStyle({
          fillColor: colors[layer.feature.properties.bins],
          weight: 3,
          opacity: 1,
          color: "white",
          fillOpacity: 0.75,
        });
        layer.bringToFront();
        info.update(layer.feature.properties);
      });
      layer.on("mouseout", function () {
        // geo.resetStyle(this);
        // info.update();
      });
      layer.on("click", (e) => {
        map.fitBounds(e.target.getBounds());
      });
    },
  }).addTo(map);
}
