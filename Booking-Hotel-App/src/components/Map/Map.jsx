import { useHotels } from "../Context/HotelsProvider";

function Map() {
    const { hotels, isLoading } = useHotels();
  return (
    <div className="mapContainer">
      Map
    </div>
  )
}

export default Map
