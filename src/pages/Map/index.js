import "./map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

function MyMap() {
  const position = [19.878138567119617, 99.8355366399488];

  const customIcon = new Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={position} zoom={20} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <a
            href="https://maps.app.goo.gl/rZdDtbmhGSeqEoQ17"
            target="_blank"
            rel="noopener noreferrer"
          >
            ดูแผนที่ขนาดใหญ่
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
