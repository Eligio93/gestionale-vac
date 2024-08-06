export default function ReturnConfirmationPopUp(props) {
    const machine = props.therapy.machine
    return (
        <div className="popup-box">
            <div className="popup-content">
                <h3 className="popup-title">{props.title}</h3>
                {/*in case the popup is to return the machine*/}
                {machine && (
                    <div className="popup-machine">
                        <p className="popup-seriale">Seriale : {machine.serialNumber}</p>
                        <p className="popup-moto">Motore: {machine.motor}</p>
                    </div>
                )}
                <div className="popup-btns">
                    <button onClick={() => props.setActivePopUp(false)}>Annulla</button>
                    <button className="green-btn">Conferma</button>
                </div>
            </div>
        </div>
    )

}