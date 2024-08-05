import { format } from "date-fns"
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";


export default function EndedTherapy({ therapy, setSuccessMessage, setErrorMessage }) {
    const navigate = useNavigate()
    const { reloadData } = useContext(DataContext)
    const [therapyToEdit, setTherapyToEdit] = useState();
    const [data, setData] = useState({
        therapyStartDate: format(therapy.startDate, 'yyyy-MM-dd'),
        therapyEndDate: format(therapy.endDate, 'yyyy-MM-dd'),
        therapyNotes: therapy.notes
    })
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
                //reload Data
                reloadData();
                //update success message
                setSuccessMessage(response.data)
                //the message shows for 2 sec
                setTimeout(() => {
                    setSuccessMessage()
                }, 2000)
                //return to viewOnly mode
                setTherapyToEdit();
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
        <li className="listed-ended-therapy">
            <div className="info-date">
                <p>Terapia iniziata il <input type="date" name="therapyStartDate" value={data.therapyStartDate} disabled={therapyToEdit !== therapy._id} onChange={onChange} /> e terminata il <input type="date" name="therapyEndDate" value={data.therapyEndDate} disabled={therapyToEdit !== therapy._id} onChange={onChange} /></p>
            </div>
            <div className="info-macchina">
                <p>Macchina: {therapy.machine.motor + ' ' + therapy.machine.serialNumber}</p>
            </div>
            <p>Assegnata a:</p>
            {therapy.patient ? (
                <div className="info-paziente">
                    <p>{therapy.patient.name + ' ' + therapy.patient.lastName + ' di ' + therapy.patient.city + ' TEL: ' + therapy.patient.phone}</p>
                </div>
            ) : (
                <div className="info-ospedale">
                    <p>Ospedale:</p>
                    <p>{therapy.hospital.name}</p>
                </div>

            )}
            <p>Note:</p>
            <textarea value={data.therapyNotes} disabled={therapyToEdit !== therapy._id} name="therapyNotes" onChange={onChange}></textarea>
            <div className="btns-nav">
                {therapyToEdit == therapy._id ? (
                    <>
                        <button onClick={cancelEdit}>Annulla</button>
                        <button onClick={() => handleEditSave(therapy._id)}>Salva Modifiche</button>
                    </>

                ) : (
                    <>
                        <button>Ritira</button>
                        <button onClick={(e) => handleEdit(e, therapy._id)}>Modifica</button>
                    </>
                )}
            </div>
        </li>
    )
}

