import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({markerLocations}) {
  const [mapCenter, setMapCenter] = useState([20, 4]);

  //change center map:
  const [lat, lng] = useUrlLocation();

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
  }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <MapContainer className="map" center={mapCenter} zoom={6} scrollWheelZoom={true}>

      <button onClick={getPosition} className="getLocation">
        {geoLocationIsLoading ? "Loading..." : "Use Your Location"}
      </button>

      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
      
      <DetectClick />
      <ChangeCenter position={mapCenter} />

      {markerLocations.map((item) => {
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


function ChangeCenter({ position }) 
{
  const map = useMap();

  map.setView(position);

  return null;
}


function DetectClick() 
{
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}