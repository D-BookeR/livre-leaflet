L.Control.MeasureDistance = L.Control.extend({
  options: {
    p1: [48.90675, 2.24645],
    p2: { lat: 48.9072, lng: 2.2403 },
  },

  onAdd: function (map) {
    this._map = map;
    this._container = L.DomUtil.create(
      "div",
      "leaflet-control-measure"
    );
    this._init();
    return this._container;
  },

  _init: function () {
    this._m1 = L.marker(this.options.p1, {
      draggable: true,
    }).addTo(this._map);
    this._m1.on("drag", this._update, this);
    this._m1.on("dragend", this._zoom, this);

    this._m2 = L.marker(this.options.p2, {
      draggable: true,
    }).addTo(this._map);
    this._m2.on("drag", this._update, this);
    this._m2.on("dragend", this._zoom, this);

    this._update();
    this._zoom();
  },

  _update: function () {
    let p1 = this._m1.getLatLng();
    let p2 = this._m2.getLatLng();

    if (this._line) {
      this._map.removeLayer(this._line);
    }
    this._line = L.polyline([p1, p2]).addTo(this._map);
  },

  _zoom: function () {
    let p1 = this._m1.getLatLng();
    let p2 = this._m2.getLatLng();
    let dist_km = p1.distanceTo(p2) / 1000;

    this._m1.bindPopup(`
    <div style="font-size:1.5em">
  P1: ${p1.lat.toFixed(5)}, ${p1.lng.toFixed(5)}<br>
  P2: ${p2.lat.toFixed(5)}, ${p2.lng.toFixed(5)}<br>
  Distance: ${dist_km.toFixed(2)} km<br>
  </div>
  `);
    this._m1.openPopup();

    /*
closeOnClick:false, closeButton:false, autoClose:false,
*/

    let bounds = L.latLngBounds(p1, p2);
    this._map.fitBounds(bounds);
  },
});

L.control.measureDistance = function (options) {
  return new L.Control.MeasureDistance(options);
};
