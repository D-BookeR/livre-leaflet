let center = [48.9068, 2.2464];

let map = L.map("map").setView(center, 17);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

const marker = L.marker(center).addTo(map);
marker.bindPopup("La Mairie").openPopup();

// let popup = L.popup()
//   .setLatLng([48.9064, 2.2483])
//   .setContent("Place de la liberté")
//   .openOn(map);

let persistent = L.popup({
  autoClose: false,
  closeOnClick: false,
  closeButton: false,
})
  .setLatLng([48.9053, 2.2437])
  .setContent("Piscine")
  .openOn(map);

const marche = L.marker([48.909, 2.2468]).addTo(map);
marche
  .bindPopup(
    `
  <p>Le <b>marché</b> du centre</p>
  <p><img src="img/marche.png" /></p>
  `,
    {
      maxWidth: 300,
      minWidth: 300,
      maxHeight: 150,
      className: "scroll-popup",
    }
  )
  .openPopup();
