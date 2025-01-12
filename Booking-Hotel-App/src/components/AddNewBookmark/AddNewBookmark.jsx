import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from '../Context/BookMarkListProvider';

const BASE_GEOCODING_URL = "https://api-bdc.net/data/reverse-geocode-client";
// const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {

  const [lat, lng] = useUrlLocation();

  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const { CreateBookmark } = useBookmarks();

  const navigate = useNavigate();

  useEffect(() => {

    if(!lat || !lng)
    {
      return;
    }

    async function fetchLocationData() 
    {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null); 

      try {
        const { data } = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`);
        if (!data.countryCode)
        {
          throw new Error(
            "this location is not a city! please click somewhere else."
          );
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode); // FR, IR ,...
      }

      catch(error) {
        setGeoCodingError(error.message);
      }

      finally {
        setIsLoadingGeoCoding(false);
      }

    }

    fetchLocationData();

  }, [lat, lng])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!cityName || !country)
    {
      return;
    }

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };

    await CreateBookmark(newBookmark);
    toast.success("New bookmark created!");
    navigate("/bookmark");
  }


  if(isLoadingGeoCoding)
  {
    return <Loader />;
  }

  if (geoCodingError)
  {
    return <storng>{geoCodingError}</storng>;
  }

  return (
    <div>
      <h2>Add Bookmark New Location</h2>
      <form className="form"  onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City Name :</label>
          <input onChange={(e) => setCityName(e.target.value)} value={cityName} type="text" name="cityName" id="cityName"/>
        </div>
        <div className="formControl">
          <label htmlFor="country">Country Name :</label>
          <input onChange={(e) => setCountry(e.target.value)} value={country} type="text" name="country" id="country"/>
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button className="btn btn--back" onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}>
            &larr; Back
          </button>
          <button className="btn btn--primary">
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewBookmark
