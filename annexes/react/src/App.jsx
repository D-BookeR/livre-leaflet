import "./App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function App() {
  const center = [48.9068, 2.2464];
  const content = "Hello World";
  return (
    <>
      <MapContainer center={center} zoom={3}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            <h1>{content}</h1>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
$$$003$$$;
