import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookMarksContext = createContext();

function BookMarkListProvider({children}) 
{
  const [currentBookmark, setCurrrentBookmark] = useState(null);

  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
  async function fetchBookmarkList()
  {
    setIsLoading(true);

    try 
    {
      const {data} = await axios.get(`http://localhost:5000/bookmarks`);
      setBookmarks(data);
    } 
    catch (error) 
    {
      toast.error(error.message);
    }
    finally
    {
      setIsLoading(false);
    }
  }

  fetchBookmarkList();

  }, []);


  async function getBookmark(id)
  {
    setIsLoading(true);
    setCurrrentBookmark(null);

    try 
    {
      const {data} = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      setCurrrentBookmark(data);
    } 
    catch (error) 
    {
      toast.error(error.message);
    }
    finally
    {
      setIsLoading(false);
    }
  }


  async function CreateBookmark(newBookmark) 
  {
    setIsLoading(true);
    try 
    {
      const {data} = await axios.post(`http://localhost:5000/bookmarks/`, newBookmark);
      setCurrrentBookmark(data);
      setBookmarks(prev => [...prev, data]);
    } 
    catch (error) 
    {
      toast.error(error.message);
    }
    finally
    {
      setIsLoading(false);
    }
  }

  async function deleteBookmark(id) 
  {
    setIsLoading(true);

    try {
      const { data } = await axios.delete(`http://localhost:5000/bookmarks/${id}`);

      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== data.id));
    }
    catch (error)
    {
      toast.error(error.message);
    }
    finally
    {
      setIsLoading(false);
    }
  }

  return (
    <BookMarksContext.Provider value={{bookmarks, isLoading, currentBookmark, getBookmark, CreateBookmark, deleteBookmark}}>
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