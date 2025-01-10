import { useState } from "react";

export default function useGeoLocation() 
{

 const[isloading, setIsLoading] = useState(false);
 const[position, setPosition] = useState({});
 const[error, setError] = useState(null);

 function getPosition() 
 {
    if(!navigator.geolocation)
    {
        return setError("Your browser does not support geolocation");
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            });
            setIsLoading(false);
        },
        (err) => {
            setError(err.message);
            setIsLoading(false);
        }
    );
 }

 return {isloading, position, error, getPosition}

}