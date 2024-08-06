import axios from "axios"
import { useContext } from "react"
import { DataContext } from "./DataContext"



export default function ReturnConfirmationPopUp(props) {
    const { reloadData } = useContext(DataContext)
    const machine = props.therapy.machine
    const therapy = props.therapy
    const patient = props.therapy.patient

    async function handleReturn() {
        try {
            const response = await axios.put('http://localhost:3001/machines/return', therapy)
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
                {machine && (
                    <div className="popup-machine">
                        <p className="popup-seriale">Seriale : {machine.serialNumber}</p>
                        <p className="popup-moto">Motore: {machine.motor}</p>
                        <p className="popup-destination">Assegnata a: {patient.name + ' '+patient.lastName}</p>
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