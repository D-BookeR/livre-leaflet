let center = [48.9068, 2.2464];

let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

// 92250-interactif.js https://boxicons.com/

function boxIcon(icon) {
  return L.divIcon({
    html: `<i class='bx bxs-${icon}'></i>`,
    iconSize: [30, 30],
    iconAnchor: [0, 30],
    popupAnchor: [15, -30],
    className: `boxiconsMarker`,
  });
}

// L.marker([48.90704, 2.24651], {
//   icon: boxIcon("institution"),
// }).addTo(map);

// L.marker([48.90688, 2.24565], {
//   icon: boxIcon("leaf"),
// }).addTo(map);

// L.marker([48.90651, 2.24653], {
//   icon: boxIcon("trophy"),
// }).addTo(map);

fetch("data/92250-interactif.json")
  .then((response) => response.json())
  .then((data) => {
    let layers = traceMarkers(data);
    traceControl(layers);
  });

let catToBoxicon = {
  jardin: "leaf",
  autre: "invader",
  sport: "trophy",
  ecole: "institution",
};

function traceMarkers(data) {
  let layers = {};
  let group = L.featureGroup().addTo(map);

  data.forEach((point) => {
    let pos = [point.lat, point.lng];
    let ico = catToBoxicon[point.cat];
    let marker = L.marker(pos, {
      icon: boxIcon(ico),
    });
    marker.bindPopup(point.nom);
    if (!layers[point.cat]) {
      layers[point.cat] = L.layerGroup().addTo(map);
    }
    marker.addTo(layers[point.cat]);
    group.addLayer(marker);
  });
  map.fitBounds(group.getBounds());
  return layers;
}

function traceControl(layers) {
  // Mise en place des filtres
  let controls = {
    "<i class='bx bxs-leaf'></i> Parcs, jardins":
      layers.jardin,
    "<i class='bx bxs-trophy'></i> Sport": layers.sport,
    "<i class='bx bxs-institution'></i> Éducation":
      layers.ecole,
    "<i class='bx bxs-invader'></i> Autre": layers.autre,
  };

  let ctrl = L.control
    .layers(null, controls, {
      collapsed: false,
      position: "bottomright",
    })
    .addTo(map);
  L.DomUtil.addClass(ctrl.getContainer(), "biglegend");
}
