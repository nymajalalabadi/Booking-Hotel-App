import { useNavigate, useParams } from "react-router-dom"
import { useBookmarks } from "../Context/BookMarkListProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {

  const { id } = useParams();

  const {getBookmark, currentBookmark, isLoading} = useBookmarks();

  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
 }, [id]);

  if (isLoading || !currentBookmark) 
  {
    return <Loader />;
  }

  return (
    <div className="currentBookmark">
    <button onClick={() => navigate(-1)} className="btn btn--back">
      &larr; Back
    </button>
    <h2>{currentBookmark.cityName}</h2>
    <div className="bookmarkItem">
      <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
      &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
      <span>{currentBookmark.country}</span>
    </div>
  </div>

  )
}

export default SingleBookmark
   