import { format, isBefore } from "date-fns"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataContext } from "./DataContext";
import Popup from "./Popup";


//This component is valid for the machines that are still running or that are ready to be archived and the machine to be returned
export default function TherapyToReturn({ therapy, machine, patient, hospital, setSuccessMessage, setErrorMessage }) {
    const { reloadData } = useContext(DataContext)
    const [therapyToEdit, setTherapyToEdit] = useState();
    const [data, setData] = useState({
        therapyStartDate: format(therapy.startDate, 'yyyy-MM-dd'),
        therapyEndDate: format(therapy.endDate, 'yyyy-MM-dd'),
        therapyNotes: therapy.notes
    })
    const today = new Date();
    const [activePopUp, setActivePopUp] = useState(false)
    //function that enables input ready for the edit
    function handleEdit(e, therapyId) {
        e.preventDefault();
        setTherapyToEdit(therapyId)

    }
    //cancel Edit Mode and reset Initial Data
    function cancelEdit() {
        setTherapyToEdit()
        setData({
            therapyStartDate: format(therapy.startDate, 'yyyy-MM-dd'),
            therapyEndDate: format(therapy.endDate, 'yyyy-MM-dd'),
            therapyNotes: therapy.notes
        })
    }
    //function to confirm the edit process
    async function handleEditSave(therapyId) {
        try {
            const response = await axios.put(`http://localhost:3001/therapies/edit/${therapyId}`, data)
            if (response.status == 200) {


                //update success message
                setSuccessMessage(response.data)
                //the message shows for 2 sec
                setTimeout(() => {
                    setSuccessMessage()
                }, 2000)
                //return to viewOnly mode
                setTherapyToEdit();
                reloadData();
            }
        } catch (err) {
            //the message displayed will be : "Errore nella modifica della terapia"
            setErrorMessage(err.response.data.message)
            //the error message will display for 2 sec
            setTimeout(() => {
                setErrorMessage()
            }, 2000)
            //return to viewOnly mode
            setTherapyToEdit();
        }
    }

    function onChange(e) {
        const { name, value } = e.target
        setData((prevData) => ({
            ...prevData, [name]: value

        }))
    }

    return (
        <>
            <li className="listed-ended-therapy">
                <div className="info-date">
                    <p>Terapia iniziata il <input type="date" name="therapyStartDate" value={data.therapyStartDate} disabled={therapyToEdit !== therapy._id} onChange={onChange} /> e terminata il <input type="date" name="therapyEndDate" value={data.therapyEndDate} disabled={therapyToEdit !== therapy._id} onChange={onChange} /></p>
                </div>
                {machine &&
                    <div className="info-macchina">
                        <p>Macchina: </p>
                        <p>{machine.motor + ' ' + machine.serialNumber}</p>
                    </div>
                }
                {patient &&
                    <div className="info-paziente">
                        <p>Assegnata a:</p>
                        <p>{patient.name + ' ' + patient.lastName + ' di ' + patient.city + ' TEL: ' + patient.phone}</p>
                    </div>}
                {hospital &&
                    <div className="info-ospedale">
                        <p>Assegnata a:</p>
                        <p>Ospedale {hospital.name + ' di ' + hospital.city}</p>
                    </div>}
                <p>Note:</p>
                <textarea value={data.therapyNotes} disabled={therapyToEdit !== therapy._id} name="therapyNotes" onChange={onChange}></textarea>
                <div className="btns-nav">
                    {therapyToEdit == therapy._id ? (
                        <>
                            <button onClick={cancelEdit}>Annulla</button>
                            <button className="green-btn" onClick={() => handleEditSave(therapy._id)}>Salva Modifiche</button>
                        </>

                    ) : (
                        <>
                            {isBefore(data.therapyEndDate, today) && <button className='red-btn' onClick={() => { setActivePopUp(true) }}>Ritira</button>}
                            <button className="teal-btn" onClick={(e) => handleEdit(e, therapy._id)}>Modifica</button>
                        </>
                    )}
                </div>
            </li>
            {activePopUp &&
                //confirmation popUp
                <Popup
                    therapy={therapy}
                    patient={patient}
                    machine={machine}
                    hospital={hospital}
                    title={'Sei sicuro/a di voler ritirare la seguente macchina?'}
                    setActivePopUp={setActivePopUp}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                />
            }
        </>

    )
}

