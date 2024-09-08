let center = [48.9068, 2.2464];

let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

// marqueur classique
const marker = L.marker(center)
  .addTo(map)
  .bindPopup("Bonjour");

// définir l'icone de notre marqueur
let icoRed = L.icon({
  iconUrl: "img/red.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});
// et la spécifier
L.marker([48.9071, 2.2404], {
  icon: icoRed,
})
  .addTo(map)
  .bindPopup("Place de Belgique");

/**
 *
 */
let MyIcon = L.Icon.extend({
  options: {
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  },
});
let greenIcon = new MyIcon({
  iconUrl: "img/green.svg",
});
let purpleIcon = new MyIcon({
  iconUrl: "img/purple.svg",
});

L.marker([48.9054, 2.2559], {
  icon: greenIcon,
}).addTo(map);

L.marker([48.9058, 2.2319], {
  icon: purpleIcon,
}).addTo(map);

/**
 * 48.90540, 2.25596 rond point de l'Europe
 * 48.90587, 2.23193 Complexe Nelson Mandela

 *
 *
 *
 */
// Utiliser des formes
L.circleMarker([48.9091, 2.2467], {
  radius: 20, // en pixels
  color: "#FF8C00",
  fillColor: "#00FF8C",
  fillOpacity: 0.5,
})
  .addTo(map)
  .bindPopup("Place du marché");

// une div
let divColonne = L.divIcon({
  html: `Place de La Colonne`,
  iconSize: [70, 40],
});
L.marker([48.90387, 2.24971], { icon: divColonne }).addTo(
  map
);
// associé à une classe
let divVallees = L.divIcon({
  className: `panel`,
  html: `Marché des Vallées`,
  iconSize: [100, 50],
});
L.marker([48.9113, 2.2566], {
  icon: divVallees,
}).addTo(map);
