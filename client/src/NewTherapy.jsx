import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react";
import { DataContext } from "./components/DataContext";
import { useNavigate } from "react-router-dom";
import SearchResults from "./components/SearchResults";



export default function NewTherapy() {
    //use Context to import data
    const { patientsList, setPatientsList, hospitalsList, setHospitalsList, machinesList, setMachinesList, reloadData } = useContext(DataContext)
    const [filteredPatient, setFilteredPatient] = useState([]);
    const [filteredHospital, setFilteredHospital] = useState([]);
    const [filteredMachine, setFilteredMachine] = useState([]);
    const [patientError, setPatientError] = useState();
    const [machineError, setMachineError] = useState()
    const [error, setError] = useState()
    const [data, setData] = useState({
        patientId: '',
        patientName: '',
        patientLastName: '',
        patientCity: '',
        patientPhone: '',
        hospitalId: '',
        hospitalName: '',
        hospitalCity: '',
        refererName: '',
        refererLastName: '',
        refererPhone: '',
        machineSerial: '',
        machineMotor: '',
        therapyStartDate: '',
        therapyEndDate: '',
        therapyNotes: ''
    })
    const [destination, setDestination] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    //Search in patients or hospital list if there s any match with typing
    function handleSearch(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
        if (value === '') {
            setFilteredPatient([]);
            setFilteredHospital([]);
            setFilteredMachine([])
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
            if (name == 'machineSerial') {
                setFilteredMachine(machinesList.filter((machine) => {
                    if (machine.serialNumber == value) {
                        return machine
                    } else {
                        return machine.serialNumber.toLowerCase().includes(value.toLowerCase())
                    }
                }))
            }

        }

    }

    //in case there s a match fills the correct fields in the form
    function handleSelection(value) {
        if (value.patient) {
            const selectedPatient = value.patient
            if (selectedPatient.inTherapy) {
                return setPatientError('Il paziente e gia in terapia')
            } else {
                setPatientError()
                setData((prevData) => ({
                    ...prevData,
                    patientId: selectedPatient._id,
                    patientName: selectedPatient.name,
                    patientLastName: selectedPatient.lastName,
                    patientCity: selectedPatient.city,
                    patientPhone: selectedPatient.phone
                }))
            }
            setFilteredPatient([])
        }
        if (value.hospital) {
            const selectedHospital = value.hospital;
            setData((prevData) => ({
                ...prevData,
                hospitalId: selectedHospital._id,
                hospitalName: selectedHospital.name,
                hospitalCity: selectedHospital.city
            }))
            setFilteredHospital([])
        }
        if (value.machine) {
            const selectedMachine = value.machine;
            if (selectedMachine.inUse) {
                return setMachineError('La macchina e gia in uso da un altro paziente')
            } else {
                setMachineError()
                setData((prevData) => ({
                    ...prevData,
                    machineSerial: selectedMachine.serialNumber,
                    machineMotor: selectedMachine.motor
                }))
            }
            setFilteredMachine([]);
        }
    }

    //handle checkBox change (set the destination patient or hospital)
    function handleCheckbox(e) {
        setDestination(e.target.value)
    }
    //handle Submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3001/therapies/newTherapy', { data, destination })
            if (response.status == 200) {
                console.log(response)
                reloadData();
                navigate('/');
            }
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }
    //handleChange Input
    function handleChange(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))

    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Inizia Nuova Terapia</h2>

            <h3>A chi e destinata la macchina?</h3>
            <fieldset >
                <label htmlFor="">Paziente:
                    <input type="radio" name='destination' value={'patient'} onChange={handleCheckbox} checked={destination === 'patient'} required />
                </label>
                <label htmlFor="">Ospedale
                    <input type="radio" name="destination" value={'hospital'} onChange={handleCheckbox} checked={destination === 'hospital'} required />
                </label>



            </fieldset>
            {destination == 'patient' ? (
                <div className="info-tab info-paziente form">
                    <h3>Info Paziente</h3>
                    {patientError && <p className="error-msg">{patientError}</p>}
                    <div className="search-params">
                        <label htmlFor="">Nome Paziente</label>
                        <input type="text" name="patientName" value={data.patientName} onChange={handleSearch} />
                        <label htmlFor="">Cognome Paziente</label>
                        <input type="text" name='patientLastName' value={data.patientLastName} onChange={handleSearch} />
                        <ul className={`search-results ${filteredPatient.length == 0 && 'hidden'}`}>
                            <SearchResults filteredPatient={filteredPatient} handleSelection={handleSelection} />
                        </ul>
                    </div>
                    <label htmlFor="">Citta Paziente</label>
                    <input type="text" value={data.patientCity} disabled />
                    <label htmlFor="">Telefono Paziente</label>
                    <input type="text" value={data.patientPhone} disabled />
                </div>
            ) : (destination == 'hospital' ? (
                <div className="info-tab info-ospedale form">
                    <h3>Informazioni Ospedale</h3>
                    <div className="search-params">
                        <label>Nome Ospedale:</label>
                        <input type="text" name='hospitalName' value={data.hospitalName} onChange={handleSearch} />
                        <ul className={`search-results ${filteredHospital.length == 0 && 'hidden'}`}>
                            <SearchResults filteredHospital={filteredHospital} handleSelection={handleSelection} />
                        </ul>
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
                    <input type="text" name="refererName" value={data.refererName} onChange={handleChange} />
                    <label>Cognome:</label>
                    <input type="text" name="refererLastName" value={data.refererLastName} onChange={handleChange} />
                    <label>Telefono:</label>
                    <input type="phone" name="refererPhone" value={data.refererPhone} onChange={handleChange} />
                </div>
            }
            <h3>Info Macchina</h3>
            {machineError && <p className="error-msg">{machineError}</p>}
            <div className="search-params">
                <label>Seriale Macchina:</label>
                <input type="text" name="machineSerial" value={data.machineSerial} onChange={handleSearch} />
                <ul className={`search-results ${filteredMachine.length == 0 && 'hidden'}`}>
                    <SearchResults filteredMachine={filteredMachine} handleSelection={handleSelection} />
                </ul>
            </div>
            <label>Motore Macchina</label>
            <input type="text" name="machineMotor" value={data.machineMotor} disabled />


            <h3>Info Terapia</h3>
            <label>Data Inizio:</label>
            <input type="date" name="therapyStartDate" value={data.therapyStartDate} onChange={handleChange} />
            <label>Data Fine:</label>
            <input type="date" name="therapyEndDate" value={data.therapyEndDate} onChange={handleChange} />
            <label>Note:</label>
            <textarea name='therapyNotes' value={data.therapyNotes} onChange={handleChange}>
            </textarea>
            <button type="submit" className="green-btn">Inizia Nuova Terapia</button>

        </form>
    )
}