import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react";
import { DataContext } from "./components/DataContext";
import { useNavigate } from "react-router-dom";
import SearchResults from "./components/SearchResults";



export default function NewTherapy() {
    //use Context to import data
    const { patientsList, hospitalsList, machinesList, reloadData } = useContext(DataContext)
    const [filteredPatient, setFilteredPatient] = useState([]);
    const [filteredHospital, setFilteredHospital] = useState([]);
    const [filteredMachine, setFilteredMachine] = useState([]);
    const [patientError, setPatientError] = useState();
    const [machineError, setMachineError] = useState();
    const [success, setSuccess] = useState();
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

    //in case there s a match autofills the correct fields in the form
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
                setSuccess(response.data.message)
                setTimeout(() => {
                    setSuccess()
                    reloadData();
                    navigate('/')
                }, 2000)
            }
        } catch (err) {
            console.log(err)
            setError(err)

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
    if (loading) {
        return <p>Loading ...</p>
    }
    if (error) {
        return <p className="error-msg">{error}</p>
    }
    if (success) {
        return <p className="success-msg">{success}</p>
    }

    return (
        <>
            <h2 className="title">Inizia Nuova Terapia</h2>
            <form onSubmit={handleSubmit} className="form">
                {/*destination indicates who the machine is been assigned to (patient or hospital)*/}
                <h3>A chi e destinata la macchina?</h3>
                <fieldset >
                    <label htmlFor="destination-patient">Paziente:
                        <input id="destination-patient" type="radio" name='destination' value={'patient'} onChange={handleCheckbox} checked={destination === 'patient'} required />
                    </label>
                    <label htmlFor="destination-hospital">Ospedale:
                        <input id="destination-hospital" type="radio" name="destination" value={'hospital'} onChange={handleCheckbox} checked={destination === 'hospital'} required />
                    </label>
                </fieldset>



                {destination == 'patient' ?
                    (
                        < div className="info-tab info-paziente form">
                            {/*in case we chose to assign the machine to the patient*/}
                            <h3 className="subtitle">Info Paziente</h3>
                            {patientError && <p className="error-msg">{patientError}</p>} {/*error in case the patient is already in therapy*/}
                            <div className="search-params">
                                <label htmlFor="therapyPatientName">Nome Paziente</label>
                                <input id='therapyPatientName' type="text" name="patientName" value={data.patientName} onChange={handleSearch} required />
                                <label htmlFor="therapyPatientLastName">Cognome Paziente</label>
                                <input id="therapyPatientLastName" type="text" name='patientLastName' value={data.patientLastName} onChange={handleSearch} required />
                                <ul className={`${filteredPatient.length == 0 ? 'hidden' : 'search-results'}`}> {/*if the results of the search is 0 hide the search results*/}
                                    <SearchResults filteredPatient={filteredPatient} handleSelection={handleSelection} />
                                </ul>
                            </div>
                            <label htmlFor="therapyPatientCity">Citta Paziente</label>
                            <input id="therapyPatientCity" type="text" value={data.patientCity} disabled required />
                            <label htmlFor="therapyPatientPhone">Telefono Paziente</label>
                            <input id="therapyPatientPhone" type="text" value={data.patientPhone} disabled required />
                        </div>
                    ) : (destination == 'hospital' ?
                        (
                            <div className="info-tab info-ospedale form">
                                {/*in case we decided to assign the machine to the hospital*/}
                                <h3 className="subtitle">Informazioni Ospedale</h3>
                                <div className="search-params">
                                    <label htmlFor="therapyHospitalName">Nome Ospedale:</label>
                                    <input id="therapyHospitalName" type="text" name='hospitalName' value={data.hospitalName} onChange={handleSearch} required />
                                    <ul className={` ${filteredHospital.length == 0 ? 'hidden' : 'search-results'}`}>
                                        <SearchResults filteredHospital={filteredHospital} handleSelection={handleSelection} />
                                    </ul>
                                </div>
                                <label htmlFor="therapyHospitalCity">Citta:</label>
                                <input id="therapyHospitalCity" type="text" name='hospitaCity' value={data.hospitalCity} disabled required />
                            </div>

                        ) : (null))}
                {/*if checkbtn is been clicked show info about the referer*/}
                {destination &&
                    <>
                        <div className="form info-tab info-referer">
                            <h3 className="subtitle">Informazioni referente</h3>
                            <label htmlFor="therapyRefererName"> Nome:</label>
                            <input id="therapyRefererName" type="text" name="refererName" value={data.refererName} onChange={handleChange} />
                            <label htmlFor="therapyRefererLastName">Cognome:</label>
                            <input id='therapyRefererLastName' type="text" name="refererLastName" value={data.refererLastName} onChange={handleChange} />
                            <label htmlFor="therapyRefererPhone">Telefono:</label>
                            <input id='therapyRefererPhone' type="phone" name="refererPhone" value={data.refererPhone} onChange={handleChange} />
                        </div>

                        {/*and also shows form for machines info*/}
                        <div className="form info-tab info-machine">
                            <h3 className="subtitle">Info Macchina</h3>
                            {machineError && <p className="error-msg">{machineError}</p>}{/*if the machine is already in use*/}
                            <div className="search-params">
                                <label htmlFor="therapySerialNumber">Seriale Macchina:</label>
                                <input id="therapySerialNumber" type="text" name="machineSerial" value={data.machineSerial} onChange={handleSearch} required />
                                <ul className={`${filteredMachine.length == 0 ? 'hidden' : 'search-results'}`}>
                                    <SearchResults filteredMachine={filteredMachine} handleSelection={handleSelection} />
                                </ul>
                            </div>
                            <label htmlFor="therapyMachineMotor">Motore Macchina</label>
                            <input id="therapyMachineMotor" type="text" name="machineMotor" value={data.machineMotor} disabled required />
                        </div>


                        <div className="form info-tab info-therapy">
                            <h3 className="subtitle">Info Terapia</h3>
                            <label htmlFor="newTherapyStartDate">Data Inizio:</label>
                            <input id='newTherapyStartDate' type="date" name="therapyStartDate" value={data.therapyStartDate} onChange={handleChange} />
                            <label htmlFor="newTherapyEndDate">Data Fine:</label>
                            <input id='newTherapyEndDate' type="date" name="therapyEndDate" value={data.therapyEndDate} onChange={handleChange} />
                            <label htmlFor="newTherapyNotes">Note:</label>
                            <textarea id="newTherapyNotes" name='therapyNotes' value={data.therapyNotes} onChange={handleChange}>
                            </textarea>
                        </div>


                        <button type="submit" className="green-btn">Inizia Nuova Terapia</button>
                    </>
                }
            </form >
        </>
    )
}