import {MdLocationOn} from "react-icons/md";
import {HiCalendar, HiSearch} from "react-icons/hi";
import { useState } from "react";
import GuestOptionList from "./GuestOptionList";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";

function Header() {

    const [destination, setDestination] = useState("");

    const [openOptions, setOpenOptions] = useState(false);

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openDate, setOpenDate] = useState(false);

    
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
            <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
                )}`}
            </div>
            {openDate && <DateRange onChange={item => setDate([item.selection])} ranges={date} minDate={new Date()} moveRangeOnFirstSelection={true} className="date"/>}
            <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
            <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>

                {options.adult} dult &bull; {options.children} children &bull; {options.room} room

                {openOptions && <GuestOptionList options={options}  handleOption={handleOption}  setOpenOptions={setOpenOptions} /> }
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