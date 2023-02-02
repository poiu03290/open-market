export const PhoneDropDown = ({ value, setPhoneIdentify, setOpen, isOpen }) => {
    const ValueClick = () => {
        setPhoneIdentify(value)
        setOpen(!isOpen)
    }
    return(
        <li onClick={ValueClick}>{value}</li>
    )
}
