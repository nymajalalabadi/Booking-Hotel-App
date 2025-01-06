import {MdLocationOn} from "react-icons/md";
import {HiCalendar, HiSearch} from "react-icons/hi";
import { useState } from "react";


function Header() {

    const [destination, setDestination] = useState("");

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
            <MdLocationOn  className="headerIcon locationIcon"/>
            <input value={destination} onChange={(e) => setDestination(e.target.value)} type="text" placeholder="Where are you going?" className="headerSearchInput" name="destination" id="destination"/>
            <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
            <HiCalendar className="headerIcon dateIcon" />
            <div className="dateDropDown"> 1/6/2025 </div>
            <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
            <div id="optionDropDwon">
                1 dult &bull; 2 children &bull; 1 room
            </div>
        <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
            <button className="headerSearchBtn">
                <HiSearch className="headerIcon" />
            </button>
        </div>
      </div>
    </div>
  )
}

export default Header
