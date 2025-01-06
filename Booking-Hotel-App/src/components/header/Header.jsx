import {MdLocationOn} from "react-icons/md";
import {HiCalendar, HiMinus, HiPlus, HiSearch} from "react-icons/hi";
import { useState } from "react";


function Header() {

    const [destination, setDestination] = useState("");

    const [openOptions, setOpenOptions] = useState(false);

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

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
            <div id="optionDropDwon" onClick={() => setOpenOptions(!openOptions)}>
                1 dult &bull; 2 children &bull; 1 room
                {openOptions && <GuestOptionList options={options} /> }
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


function GuestOptionList({options}) {
    return (
    <div className="guestOptions">
        <OptionItem options={options}/>
        <OptionItem />
        <OptionItem />
    </div>
    )
}


function OptionItem({options}) {
    return(
    <div className="guestOptionItem">
        <span className="optionText">Adult</span>
        <div className="optionCounter">
            <button className="optionCounterBtn">
                <HiMinus className="icon"/>
            </button>
            <span className="optionCounterNumber">{options.adult}</span>
            <button className="optionCounterBtn">
                <HiPlus className="icon"/>
            </button>
        </div>
    </div>
    )
}