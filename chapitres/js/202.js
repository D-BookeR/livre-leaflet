let center = { lat: 48.9068, lng: 2.2464 };

let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

const marker = L.marker(center, { draggable: true });
marker.addTo(map).bindPopup("");

/*
 */
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    geolocSuccess,
    geolocError
  );
}
function geolocError(error) {
  // TIMEOUT, PERMISSION_DENIED,
  // POSITION_UNVAILABLE, UNKNOW_ERROR
  console.log(error);
}

function geolocSuccess(position) {
  console.log(position);
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const me = L.latLng(lat, lng);
  let content = lat.toFixed(5) + ", " + lng.toFixed(5);
  marker.setPopupContent(content).openPopup();
  marker.setLatLng(me);
  map.flyTo(me, 15);
}
