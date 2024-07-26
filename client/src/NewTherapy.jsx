import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react";
import { DataContext } from "./components/DataContext";



export default function NewTherapy() {
    //use Context to import data
    const { patientsList, setPatientsList, hospitalsList, setHospitalsList } = useContext(DataContext)
    const [filteredPatient, setFilteredPatient] = useState([]);
    const [filteredHospital, setFilteredHospital] = useState()
    const [data, setData] = useState({
        patientName: '',
        patientLastName: '',
        patientCity: '',
        patientPhone: '',
        hospitalName: '',
        hospitalCity: '',
        refererName:'',
        refererLastName:'',
        refererPhone:'',
        therapyStartDate:'',
        therapyEndDate:'',
        therapyNotes:''
    })
    const [destination, setDestination] = useState()
    const [loading,setLoading]=useState(false)


    //Search in patients or hospital list if there s any match with typing
    function handleSearch(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
        if (value === '') {
            setFilteredPatient([]);
            setFilteredHospital([]);
        } else {
            if (name == 'patientName' || name == 'patientLastName') {
                setFilteredPatient(patientsList.filter((patient) => {
                    if (patient.name === value || patient.lastName === value) {
                        return patient
                    } else {
                        return patient.name.toLowerCase().includes(value.toLowerCase()) || patient.lastName.toLowerCase().includes(value.toLowerCase())
                    }
                }))
            }
            if (name == 'hospitalName') {
                setFilteredHospital(hospitalsList.filter((hospital) => {
                    if (hospital.name == value) {
                        return hospital
                    } else {
                        return hospital.name.toLowerCase().includes(value.toLowerCase())
                    }
                }))
            }

        }

    }

    //in case there s a match fills the correct fields in the form
    function handleSelection(value) {
        if (destination == 'patient') {
            setData((prevData) => ({
                ...prevData,
                patientName: value.name,
                patientLastName: value.lastName,
                patientCity: value.city,
                patientPhone: value.phone
            }))
            setFilteredPatient([])
        }
        if (destination == 'hospital') {
            setData((prevData) => ({
                ...prevData,
                hospitalName: value.name,
                hospitalCity: value.city
            }))
            setFilteredHospital([])
        }
    }

    //handle checkBox change (set the destination patient or hospital)
    function handleCheckbox(e) {
        setDestination(e.target.value)
    }
    //handle Submit
    function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        try{
            const response = axios.post('http://localhost:3001/therapies/newTherapy',{data,destination})

        }catch(err){

        }finally{
            setLoading(false)
        }
    }
    //handleChange Input
    function handleChange(e){
        const {name, value} = e.target;
        setData((prevData)=>({
            ...prevData, [name]:value
        }))

    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Inizia Nuova Terapia</h2>

            <h3>A chi e destinata la macchina?</h3>
            <fieldset>
                <label htmlFor="">Paziente:
                    <input type="radio" name='destination' value={'patient'} onChange={handleCheckbox} checked={destination === 'patient'} />
                </label>
                <label htmlFor="">Ospedale
                    <input type="radio" name="destination" value={'hospital'} onChange={handleCheckbox} checked={destination === 'hospital'} />
                </label>



            </fieldset>
            {destination == 'patient' ? (
                <div className="info-tab info-paziente form">
                    <h3>Info Paziente</h3>
                    <label htmlFor="">Nome Paziente</label>
                    <input type="text" name="patientName" value={data.patientName} onChange={handleSearch} />
                    <label htmlFor="">Cognome Paziente</label>
                    <input type="text" name='patientLastName' value={data.patientLastName} onChange={handleSearch} />
                    <div>
                        {filteredPatient && filteredPatient.length > 0 ? (
                            <ul>
                                {filteredPatient.map((patient) =>
                                    <li key={patient._id}>
                                        <div onClick={() => handleSelection(patient)}>
                                            <p>{patient.name + ' ' + patient.lastName}</p>
                                            <p>{'di ' + patient.city}</p>
                                        </div>

                                    </li>

                                )}

                            </ul>


                        ) : (null)}
                    </div>
                    <label htmlFor="">Citta Paziente</label>
                    <input type="text" value={data.patientCity} disabled />
                    <label htmlFor="">Telefono Paziente</label>
                    <input type="text" value={data.patientPhone} disabled />
                </div>
            ) : (destination == 'hospital' ? (
                <div className="info-tab info-ospedale form">
                    <h3>Informazioni Ospedale</h3>
                    <label>Nome Ospedale:</label>
                    <input type="text" name='hospitalName' value={data.hospitalName} onChange={handleSearch} />
                    <div>
                        {filteredHospital && filteredHospital.length > 0 ? (
                            <ul>
                                {filteredHospital.map((hospital) =>
                                    <li key={hospital._id}>
                                        <div onClick={() => handleSelection(hospital)}>
                                            <p>{hospital.name}</p>
                                            <p>{'di ' + hospital.city}</p>
                                        </div>

                                    </li>

                                )}

                            </ul>


                        ) : (null)}

                    </div>
                    <label>Citta:</label>
                    <input type="text" name='hospitaCity' value={data.hospitalCity} disabled />

                </div>

            ) : (null))}
            {/*if checkbtn is been clicked show info about the referer*/}
            {destination &&
                <div className="form info-tab info-referer">
                    <h3>Informazioni referente</h3>
                    <label> Nome:</label>
                    <input type="text" name="refererName" value={data.refererName} onChange={handleChange}/>
                    <label>Cognome:</label>
                    <input type="text" name="refererLastName" value={data.refererLastName}  onChange={handleChange}/>
                    <label>Telefono:</label>
                    <input type="phone" name="refererPhone" value={data.refererPhone} onChange={handleChange}/>
                </div>
            }

            <h3>Info Terapia</h3>
            <label>Data Inizio:</label>
            <input type="date" name="therapyStartDate" value={data.therapyStartDate} onChange={handleChange}/>
            <label>Data Fine:</label>
            <input type="date" name="therapyEndDate" value={data.therapyEndDate} onChange={handleChange} />
            <label>Note:</label>
            <textarea name='therapyNotes' value={data.therapyNotes} onChange={handleChange}>
            </textarea>
            <button type="submit" className="green-btn">Inizia Nuova Terapia</button>

        </form>
    )
}