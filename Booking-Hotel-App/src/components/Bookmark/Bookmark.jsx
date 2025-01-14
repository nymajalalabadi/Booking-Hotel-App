import { Link } from "react-router-dom";
import { useBookmarks } from "../Context/BookMarkListProvider"
import Loader from "../Loader/Loader"
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";


function Bookmark() 
{
  const {bookmarks, isLoading, currentBookmark, deleteBookmark } = useBookmarks()

  if(isLoading)
  {
    return (<Loader/>)
  }

  const handleDelete = async (e, id) => 
  {
    e.preventDefault();
    await deleteBookmark(id);
  }
 
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.length === 0 && <p>There is no bookmarked location</p>}
        {bookmarks.map((item) => {
          return (
            <Link key={item.id} to={`/bookmark/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              <div className={`bookmarkItem  ${item.id === currentBookmark?.id ? "current-bookmark" : "" }`}>
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );

        })}
      </div>
    </div>
  )
}

export default Bookmark
