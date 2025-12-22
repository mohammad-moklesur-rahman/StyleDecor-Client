import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MyContainer from "../Shared/MyContainer";

// center (Dhaka)
const centerPosition = [23.8103, 90.4125];

const ServiceCoverageMap = () => {
  return (
    <div className="bg-base-300 py-16">
      <MyContainer>
        <div className="px-4 text-center">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-center mb-4">
            Our Service Coverage
          </h2>
          <p className="mb-8 text-base-content/70">
            We currently provide decoration and consultation services in these
            areas.
          </p>

          {/* Map Container */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg mx-auto">
            <MapContainer
              center={centerPosition}
              zoom={11}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Main Marker */}
              <Marker position={centerPosition}>
                <Popup>
                  <strong>Main Service Area</strong> <br />
                  Dhaka City
                </Popup>
              </Marker>

              {/* Coverage Radius */}
              <Circle
                center={centerPosition}
                radius={15000} // 15km
                pathOptions={{ color: "blue" }}
              />
            </MapContainer>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default ServiceCoverageMap;
