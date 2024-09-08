let map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: ["https://tile.osm.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: `&copy; OpenStreetMap contributors`,
      },
    },
    layers: [
      {
        id: "simple-tiles",
        type: "raster",
        source: "raster-tiles",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  },
  center: [2.2464, 48.9068], // [lng, lat]
  zoom: 14,
});
