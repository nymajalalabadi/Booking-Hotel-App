import {MdLocationOn} from "react-icons/md";
import {HiCalendar, HiSearch} from "react-icons/hi";
import { useState } from "react";
import GuestOptionList from "./GuestOptionList";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { createSearchParams, NavLink, useNavigate, useSearchParams } from "react-router-dom";

function Header() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [destination, setDestination] = useState(searchParams.get("destination") || "");

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

    const navigate = useNavigate();

    const handleSearch = () => {
        const encodedParams =  createSearchParams({
            destination,
            date: JSON.stringify(date),
            options: JSON.stringify(options),
        });

         //note : =>  setSearchParams(encodedParams);

        navigate({
            pathname: "/hotels",
            search: encodedParams.toString(),
        });
    }

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
            <button className="headerSearchBtn" onClick={handleSearch}>
                <HiSearch className="headerIcon" />
            </button>
        </div>
      </div>
      <div>
        <NavLink to="/login">login</NavLink>
      </div>
    </div>
  )
}

export default Header