import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookMarksContext = createContext();

function BookMarkListProvider({children}) 
{
  const [currentBookmark, setCurrrentBookmark] = useState(null);
  const [loadingCurrentBookmark, setLoadingCurrentBookmark] = useState(false);

  const { data : bookmarks, isLoading } = useFetch("http://localhost:5000/bookmark");

  async function getHotel(id)
  {
    setLoadingCurrentBookmark(true);
    try 
    {
      const {data} = await axios.get(`http://localhost:5000/bookmark/${id}`);
      setCurrrentBookmark(data);
      setLoadingCurrentBookmark(false);
    } 
    catch (error) 
    {
      toast.error(error.message);
      setLoadingCurrentBookmark(false);
    }
  }

  return (
    <BookMarksContext.Provider value={{bookmarks, isLoading, getHotel, currentBookmark, loadingCurrentBookmark}}>
      {children}
    </BookMarksContext.Provider>
  )
}

export default BookMarkListProvider


export function useBookmarks()
{
  const context = useContext(BookMarksContext);

  return context;
}