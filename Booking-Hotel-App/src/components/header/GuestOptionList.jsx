import { useRef } from "react"
import OptionItem from "./OptionItem"
import useOutsideClick from "../../hooks/useOutSideClick";


function GuestOptionList({options, handleOption, setOpenOptions}) {

    const optionsRef = useRef();

    useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));

    return (
    <div className="guestOptions" ref={optionsRef}>
        <OptionItem options={options} handleOption={handleOption} type="adult" minLimit={1} />
        <OptionItem options={options} handleOption={handleOption} type="children" minLimit={0}/>
        <OptionItem options={options} handleOption={handleOption} type="room" minLimit={1}/>
    </div>
    )
}

export default GuestOptionList