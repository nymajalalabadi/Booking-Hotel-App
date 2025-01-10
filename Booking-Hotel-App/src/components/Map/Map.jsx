import { useEffect, useState } from "react";
import { useHotels } from "../Context/HotelsProvider";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map() {
  const { hotels, isLoading } = useHotels();
  const [mapCenter, setMapCenter] = useState([20, 4]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { isloading : geoLocationIsLoading, position : geoLocationPosition, getPosition } = useGeoLocation()

  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if(geoLocationPosition?.lat && geoLocationPosition?.lng)
    {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  },[geoLocationPosition])

  return (
    <div className="mapContainer">
      <MapContainer className="map" center={mapCenter} zoom={6} scrollWheelZoom={true}>

      <button onClick={getPosition} className="getLocation">
        {geoLocationIsLoading ? "Loading..." : "Use Your Location"}
      </button>

      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

      <ChangeCenter position={mapCenter} />

        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>
                {item.name}
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map

function ChangeCenter({ position }) {
  const map = useMap();

  map.setView(position);

  return null;
}
