let center = { lat: 48.9068, lng: 2.2464 };

let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

const marker = L.marker(center, { draggable: true });
marker.addTo(map).bindPopup("");

map.locate({ setView: true });
map.on("locationfound", onLocationFound);

function onLocationFound(e) {
  const me = e.latlng;
  let content =
    me.lat.toFixed(5) + ", " + me.lng.toFixed(5);
  marker.setPopupContent(content).openPopup();
  marker.setLatLng(me);
  map.flyTo(me, 15);
}
