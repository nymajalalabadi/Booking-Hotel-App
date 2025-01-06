import { HiMinus, HiPlus } from "react-icons/hi"


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

export default OptionItem