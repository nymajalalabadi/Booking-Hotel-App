import OptionItem from "./OptionItem"


function GuestOptionList({options, handleOption}) {
    return (
    <div className="guestOptions">
        <OptionItem options={options} handleOption={handleOption} type="adult" minLimit={1} />
        <OptionItem options={options} handleOption={handleOption} type="children" minLimit={0}/>
        <OptionItem options={options} handleOption={handleOption} type="room" minLimit={1}/>
    </div>
    )
}

export default GuestOptionList