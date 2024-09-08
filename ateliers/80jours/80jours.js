const zoom = 6;
const minizoom = 13;
const center = [51.509865, -0.118092];

let pois = []; // points of interest
let index = 0;

// mini carte
let minimap = L.map("minimap");
minimap.setView(center, minizoom);
let minilayer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  {
    attribution: `&copy; OpenStreetMap contributors`,
  }
);
minilayer.addTo(minimap);

// Carte principale
let map = L.map("map", {
  zoomControl: false,
  attributionControl: false,
  minZoom: 5,
  maxZoom: 15,
});
map.setView(center, zoom);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png"
);
layer.addTo(map);

let marker = L.circleMarker(center, {
  radius: 40,
  color: "#000",
}).addTo(map);

let legend = L.control({ position: "bottomright" });
legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "storyLegend");
  div.innerHTML = `
    <button id="prev">Précédent</button>
    <button id="next">Suivant</button>
  `;
  let next = div.querySelector("#next");
  next.onclick = function (e) {
    index = (index + 1) % pois.length;
    moveMap(index);
  };
  let prev = div.querySelector("#prev");
  prev.onclick = function (e) {
    index = (index - 1 + pois.length) % pois.length;
    moveMap(index);
  };
  return div;
};
legend.addTo(map);

function moveMap(index) {
  map.flyTo(pois[index], zoom);

  map.once("moveend", function () {
    marker.setLatLng(pois[index]);
    title.innerHTML = pois[index].name;
    text.innerHTML = pois[index].text;

    minimap.setView(pois[index], minizoom);
  });
}

fetch("80jours.json")
  .then((response) => response.json())
  .then((data) => {
    pois = data;
    moveMap(index);
  });
