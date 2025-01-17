import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookMarksContext = createContext();


const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null
};


function bookmarkReducer(state, action)
{
  switch(action.type)
  {
    case "loading":
      return {...state, isLoading: true};

    case "bookmarks/loaded":
      return {...state, isLoading: false, bookmarks: action.payload};

    case "bookmark/loaded":
      return {...state, isLoading: false, currentBookmark: action.payload};

    case "bookmark/created":
      return {...state, isLoading: false, bookmarks: [...state.bookmarks, action.payload], currentBookmark: action.payload};

    case "bookmark/deleted":
      return {...state, isLoading: false, bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== action.payload), currentBookmark: null};

    case "rejected":
      return {...state, isLoading: false, error: action.payload};

    default:
      throw new Error("Unknown action type");
  }
}

function BookMarkListProvider({children}) 
{
  // const [currentBookmark, setCurrrentBookmark] = useState(null);

  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const [{bookmarks, isLoading, currentBookmark}, dispatch] = useReducer(bookmarkReducer, initialState)


  useEffect(() => {
  async function fetchBookmarkList()
  {
    dispatch({type: "loading"});

    try 
    {
      const {data} = await axios.get(`http://localhost:5000/bookmarks`);
      dispatch({type: "bookmarks/loaded", payload: data});
    } 
    catch (error) 
    {
      toast.error(error.message);
      dispatch({type: "rejected", payload: "an Errror occurred in loading bookmarks"});
    }
  }

  fetchBookmarkList();

  }, []);


  async function getBookmark(id)
  {
    if(Number(id) === currentBookmark?.id)
    {
      return;
    }
    
    dispatch({type: "loading"});

    try 
    {
      const {data} = await axios.get(`http://localhost:5000/bookmarks/${id}`);
      dispatch({type: "bookmark/loaded", payload: data});
    } 
    catch (error) 
    {
      toast.error(error.message);
      dispatch({type: "rejected", payload: "an Error occurred in fetching single bookmark"});
    }
  }


  async function CreateBookmark(newBookmark) 
  {
    dispatch({type: "loading"});
    try 
    {
      const {data} = await axios.post(`http://localhost:5000/bookmarks/`, newBookmark);
      dispatch({type: "bookmark/created", payload: data});
    } 
    catch (error) 
    {
      toast.error(error.message);
      dispatch({type: "rejected", payload: error});
    }
  }

  async function deleteBookmark(id) 
  {
    dispatch({type: "loading"});

    try {
      await axios.delete(`http://localhost:5000/bookmarks/${id}`);

      dispatch({type: "bookmark/deleted", payload: id});
    }
    catch (error)
    {
      toast.error(error.message);
      dispatch({type: "rejected", payload: error});
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