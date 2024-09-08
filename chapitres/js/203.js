let center = { lat: 48.9068, lng: 2.2464 };

let map = L.map("map").setView(center, 15);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

const marker = L.marker(center).addTo(map).bindPopup("");

/**
 * Geocode
 */

let address = document.getElementById("address");

document.getElementById("geocode").onclick = () => {
  geoCode();
};

async function geoCode() {
  let add = address.value;
  let url = `https://nominatim.openstreetmap.org/`;
  url += `search?format=json&q=${add}`;
  console.log(add);
  let resp = await fetch(url);
  let data = await resp.json();
  if (data.length > 0) {
    let lat = parseFloat(data[0].lat);
    let lng = parseFloat(data[0].lon);

    const info = L.latLng(lat, lng);
    let content = lat.toFixed(5) + ", " + lng.toFixed(5);
    marker.setPopupContent(content).openPopup();
    marker.setLatLng(info);
    map.flyTo(info, 17);

    console.log(data[0]);
  } else {
    marker.setPopupContent("Non trouvé").openPopup();
  }
}
// 97424 piton saint leu

/**
 * Reverse
 */

function onMapClick(ev) {
  let p = ev.latlng;
  geoDecode(p.lat, p.lng);
}
map.on("click", onMapClick);

async function geoDecode(lat, lng) {
  let url = `https://nominatim.openstreetmap.org/`;
  url += `reverse?format=json&lat=${lat}&lon=${lng}`;
  let resp = await fetch(url);
  let data = await resp.json();
  if (data.display_name) {
    let cont = lat.toFixed(5) + ", " + lng.toFixed(5);
    cont += `<br>${data.display_name}`;
    marker.setPopupContent(cont).openPopup();
    marker.setLatLng(data);
    map.flyTo(data, 17);
    console.log(data);
  } else {
    marker.setPopupContent("Non trouvé").openPopup();
  }
}
