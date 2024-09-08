let center = [48.90663, 2.24645];
// let map = L.map("map").setView(center, 16);

let map = L.map("map", {
  minZoom: 10,
  maxZoom: 14,
}).setView(center, 14);

let layer = L.tileLayer(
  "https://tile.osm.org/{z}/{x}/{y}.png",
  { attribution: `&copy; OpenStreetMap contributors` }
).addTo(map);

config = {
  labels: ["🔨", "💻", "📊", "🎮", "📱", "🌐"],
  texts: [
    "<strong>Atelier</strong>: suivi de projets",
    "<strong>Code</strong>: algorithmique, python...",
    "<strong>Data</strong>: analyse, SQL, pandas",
    "<strong>Jeu</strong>: Unity, C#",
    "<strong>Mobile</strong>: Flutter",
    "<strong>Web</strong>: python, js, php, html,css...",
  ],
  // colors: ["#66BB6A", "#42A5F5", "#EC407A"],
  options: {
    plugins: { legend: { display: false } },
    scales: {
      // x: { display: false },
      y: { display: false },
    },
  },
};

fetch("data/ecoles.json")
  .then((response) => response.json())
  .then((data) => {
    tracePoints(data);
  });

function tracePoints(data) {
  let bounds = L.latLngBounds();
  data.forEach((item) => {
    L.circle([item.lat, item.lng], {
      color: "black",
      weight: 13,
      opacity: 1,
    }).addTo(map);

    let classe = "";
    if (item.nom == "ESGI") {
      // ,
      item.lat = item.lat - 0.0095; // + 0.001;
      item.lng = item.lng + 0.001; // lng réeele

      classe = "popup-esgi";
    }

    // Créer les popups
    let popup = L.popup({
      closeOnClick: false,
      closeButton: false,
      autoClose: false,
      className: classe,
    })
      .setLatLng([item.lat, item.lng])
      .setContent(
        `<canvas id="myId${item.nom}" width="150" height="75">
        </canvas>
        <br>${item.nom}`
      )
      .openOn(map);
    bounds.extend(popup.getLatLng());

    let values = [
      item.stats["Atelier"],
      item.stats["Code"],
      item.stats["Data"],
      item.stats["Jeu"],
      item.stats["Mobile"],
      item.stats["Web"],
    ];
    // Créer les charts
    const ctx = document.getElementById(`myId${item.nom}`);
    new Chart(ctx, {
      type: "bar", // bar, doughnut, polarArea, radar,
      title: item.nom,
      data: {
        labels: config.labels,
        datasets: [
          {
            data: values,
            backgroundColor: config.colors,
          },
        ],
      },
      options: config.options,
    });
  });
  map.fitBounds(bounds);
}

let legendText = ``;
for (let i = 0; i < config.labels.length; i++) {
  legendText += `<div>
  ${config.labels[i]} ${config.texts[i]}
  </div>`;
}

let legend = L.control({ position: "bottomleft" });
legend.onAdd = function (map) {
  let div = L.DomUtil.create("div", "ecoles");
  // @todo : mettre dans le fichier JSON ?
  div.innerHTML = `
  <table><tr><td valign=top>
  <strong>Répartition des cours (2023)</strong><br>
  ${legendText}
  </td><td valign=top>
  &nbsp;
  </td><td valign=top>
  <strong>Liste des écoles</strong><br><small>
<code>DCP&nbsp;&nbsp;</code> : Digital Campus Paris<br>
<code>ECVD&nbsp;</code> : Ecole de Création Visuelle Digital<br>
<code>ESD&nbsp;&nbsp;</code> : École Supérieure du Digital<br>
<code>ESGI&nbsp;</code> : École Supérieure de Génie Informatique<br>
<code>ESIEA</code> : Ecole Supérieure d'Informatique Électronique Automatique<br>
<code>ESP&nbsp;&nbsp;</code> : École supérieure de publicité<br>
<code>MDSP&nbsp;</code> : My Digital School Paris<br>
<code>SDW&nbsp;&nbsp;</code> : Sup de Web Paris<br>
</small></td></tr></table>
  `;
  return div;
};
legend.addTo(map);
