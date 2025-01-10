import { createContext, useContext, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from 'react-hot-toast';

const HotelsContext = createContext();

function HotelsProvider({children}) 
{
  const [currentHotel, setCurrrentHotel] = useState(null);
  const [loadingCurrentHotel, setLoadingCurrentHotel] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const destination = searchParams.get("destination");

  const room = JSON.parse(searchParams.get("options"))?.room;

  const { data : hotels, isLoading } = useFetch("http://localhost:5000/hotels", `q=${destination || ""}&accommodates_gte=${room || 1}`);

  async function getHotel(id)
  {
    setLoadingCurrentHotel(true);
    try 
    {
      const {data} = await axios.get(`http://localhost:5000/hotels/${id}`);
      setCurrrentHotel(data);
      setLoadingCurrentHotel(false);
    } 
    catch (error) 
    {
      toast.error(error.message);
      setLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelsContext.Provider value={{hotels, isLoading, getHotel, currentHotel, loadingCurrentHotel}}>
      {children}
    </HotelsContext.Provider>
  )
}

export default HotelsProvider


export function useHotels()
{
    const context = useContext(HotelsContext);

    return context;
}