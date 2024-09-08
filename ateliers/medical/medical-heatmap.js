let map = L.map("mapMetropole").setView([46.493, 2.602], 6);
L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `Métropole`,
}).addTo(map);

// prettier-ignore
let outremers = [
  {id:"971",name:"Guadeloupe",lat:16.25,lng:-61.56,z:8},
  {id:"972",name:"Martinique",lat:14.65,lng:-61.01,z:8},
  {id:"973",name:"Guyane",lat:3.99,lng:-52.99,z:5},
  {id:"974",name:"La Réunion",lat:-21.11,lng:55.53,z:9},
  {id:"975",name:"Mayotte",lat:-12.84,lng:45.14,z:9},
];

let maps = [];
for (let r of outremers) {
  let m = L.map(`map${r.id}`).setView([r.lat, r.lng], r.z);
  L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
    attribution: r.name,
  }).addTo(m);
  r["map"] = m;
  r["bounds"] = m.getBounds();
  r["coords"] = []; // Ajoute d'un tableau
}

fetch("finess.json")
  .then((response) => response.json())
  .then((data) => {
    drawMap(data);
  });

function drawMap(data) {
  let metropole = [];
  data.forEach((item) => {
    let c = L.latLng(item.lat, item.lng);
    let outremer = outremers.find((outremer) =>
      outremer.bounds.contains(c)
    );
    if (outremer) {
      outremer.coords.push(c);
    } else {
      metropole.push(c);
    }
  });
  L.heatLayer(metropole, { radius: 50 }).addTo(map);
  for (let r of outremers) {
    L.heatLayer(r.coords, { radius: 70 }).addTo(r.map);
  }
}
