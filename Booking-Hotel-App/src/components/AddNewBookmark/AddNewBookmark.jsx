import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";

function AddNewBookmark() {

  const [lat, lng] = useUrlLocation();

  const navigate = useNavigate();

  return (
    <div>
      <h2>Add Bookmark New Location</h2>
      <form action="" className="form">
        <div className="fromControl">
          <label htmlFor="cityName">City Name</label>
          <input type="text" name="cityName" id="cityName"/>
        </div>
        <div className="fromControl">
          <label htmlFor="country">Country Name</label>
          <input type="text" name="country" id="country"/>
        </div>
        <div className="fromControl">
          <label htmlFor="countryCode">Country Code</label>
          <input type="text" />
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
