let center = [48.9068, 2.2464];

let map1 = L.map("map1").setView(center, 16);
let map2 = L.map("map2").setView(center, 16);
let map3 = L.map("map3").setView(center, 16); //
let map4 = L.map("map4").setView(center, 16);

L.tileLayer("https://tile.osm.org/{z}/{x}/{y}.png", {
  attribution: `&copy; OpenStreetMap contributors`,
}).addTo(map1);

var OpenTopoMap = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 17,
    attribution: "MapData:OSM,SRTM - MapStyle:OpenTopoMap)",
  }
);
OpenTopoMap.addTo(map2);

//
L.tileLayer(
  "https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
  {
    attribution:
      '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
    bounds: [
      [-75, -180],
      [81, 180],
    ],
    minZoom: 2,
    maxZoom: 19,
    format: "image/jpeg",
    style: "normal",
  }
).addTo(map3);

//
L.tileLayer(
  "http://sgx.geodatenzentrum.de/wmts_topplus_open/tile/" +
    "1.0.0/web/default/WEBMERCATOR/{z}/{y}/{x}.png",
  {
    maxZoom: 18,
    attribution: "Map data: govdata.de",
  }
).addTo(map4);
