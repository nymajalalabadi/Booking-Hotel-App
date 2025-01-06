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

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

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
                {options.adult} dult &bull; {options.children} children &bull; {options.room} room
                {openOptions && <GuestOptionList options={options}  handleOption={handleOption}/> }
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


function GuestOptionList({options, handleOption}) {
    return (
    <div className="guestOptions">
        <OptionItem options={options} handleOption={handleOption} type="adult" minLimit={1} />
        <OptionItem options={options} handleOption={handleOption} type="children" minLimit={0}/>
        <OptionItem options={options} handleOption={handleOption} type="room" minLimit={1}/>
    </div>
    )
}


function OptionItem({options, handleOption, type, minLimit}) {
    return(
    <div className="guestOptionItem">
        <span className="optionText">{type}</span>
        <div className="optionCounter">
            <button onClick={() => handleOption(type, "dec")} className="optionCounterBtn" disabled={options[type] <= minLimit}>
                <HiMinus className="icon"/>
            </button>
            <span className="optionCounterNumber">{options[type]}</span>
            <button onClick={() => handleOption(type, "inc")} className="optionCounterBtn">
                <HiPlus className="icon"/>
            </button>
        </div>
    </div>
    )
}