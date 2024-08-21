import axios from "axios"
import { useContext } from "react"
import { DataContext } from "./DataContext"



export default function ReturnConfirmationPopUp(props) {
    const { reloadData } = useContext(DataContext)
    //data collect datas based on the operation we want to confirm and that it will show in the confirmation message
    const data = {
        machine: props.machine,
        therapy: props.therapy,
        patient: props.patient,
        hospital: props.hospital
    }

    async function handleReturn() {
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_BASEURL}/machines/return`, data)
            console.log(response)
            if (response.status == 200) {
                reloadData();
                props.setActivePopUp(false);
                props.setSuccessMessage(response.data)
                //the message shows for 2 sec
                setTimeout(() => {
                    props.setSuccessMessage()
                }, 2000)
            }

        } catch (err) {
            console.log(err)
            //the message displayed will be : "Errore nella modifica della terapia"
            props.setErrorMessage(err.response.data.message)
            //the error message will display for 2 sec
            setTimeout(() => {
                props.setErrorMessage()
            }, 2000)
        }

    }
    return (
        <div className="popup-box">
            <div className="popup-content">
                <h3 className="popup-title">{props.title}</h3>
                {/*in case the popup is to return the machine*/}
                {data.machine && (
                    <div className="popup-machine">
                        <p className="popup-seriale">Seriale : {data.machine.serialNumber}</p>
                        <p className="popup-moto">Motore: {data.machine.motor}</p>
                        {data.patient && <p className="popup-destination">Assegnata a: {data.patient.name + ' ' + data.patient.lastName}</p>}
                        {data.hospital && <p className="popup-destination">Assegnata a: Ospedale {data.hospital.name}</p>}
                    </div>
                )}
                <div className="popup-btns">
                    <button onClick={() => props.setActivePopUp(false)}>Annulla</button>
                    <button className="green-btn" onClick={handleReturn}>Conferma</button>
                </div>
            </div>
        </div>
    )

}