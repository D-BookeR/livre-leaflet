let center = { lat: 48.9068, lng: 2.2464 };
let map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([center.lng, center.lat]),
    zoom: 17,
  }),
});
