let center = [48.90663, 2.24645];
let map = L.map("map").setView(center, 16);
let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

const data = [
  {
    id: 1,
    title: "Belgique",
    position: [48.9071, 2.2403],
    values: [12, 24, 49],
  },
  {
    id: 2,
    title: "Souvenir Français",
    position: [48.9064, 2.2483],
    values: [45, 12, 8],
  },
];
const OSMLayer = new L.tileLayer(
  "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap contributors",
  }
);

const config = {
  labels: ["Vert", "Bleu", "Rouge"],
  colors: ["#66BB6A", "#42A5F5", "#EC407A"],
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  },
};

let bounds = L.latLngBounds();
data.forEach((item) => {
  // Créer les popups
  let popup = L.popup({
    closeOnClick: false,
    closeButton: false,
    autoClose: false,
  })
    .setLatLng(item.position)
    .setContent(
      `<canvas id="myId${item.id}" width="100" height="75">
        </canvas>
        <br>${item.title}`
    )
    .openOn(map);
  bounds.extend(popup.getLatLng());

  // Créer les charts
  const ctx = document.getElementById(`myId${item.id}`);
  new Chart(ctx, {
    type: "doughnut", // bar, doughnut, polarArea, radar,
    data: {
      labels: config.labels,
      datasets: [
        {
          data: item.values,
          backgroundColor: config.colors,
        },
      ],
    },
    options: config.options,
  });
});
map.fitBounds(bounds);
