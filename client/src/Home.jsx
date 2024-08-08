import { useContext } from "react"
import { DataContext } from "./components/DataContext"
import { useState } from "react"
import SearchResults from "./components/SearchResults"
import { useNavigate } from "react-router-dom";



export default function Home() {
    const { patientsList, hospitalsList, machinesList } = useContext(DataContext)
    const [filteredPatient, setFilteredPatient] = useState([]);
    const [filteredHospital, setFilteredHospital] = useState([]);
    const [filteredMachine, setFilteredMachine] = useState([]);
    const hideList = filteredHospital.length == 0 && filteredMachine.length == 0 && filteredPatient.length == 0;
    const navigate = useNavigate();


    function handleSelection(selectedResult) {
        navigate('/dettagliRisultato', { state: selectedResult })
    }

    function handleSearch(value) {
        if (value == '') {
            setFilteredHospital([]);
            setFilteredPatient([])
            setFilteredMachine([])
            return;
        }

        setFilteredPatient(patientsList.filter((patient) => {
            if (patient.name === value || patient.lastName === value) {
                return patient
            } else {
                return patient.name.toLowerCase().includes(value.toLowerCase()) || patient.lastName.toLowerCase().includes(value.toLowerCase())
            }
        }))
        setFilteredHospital(hospitalsList.filter((hospital) => {
            if (hospital.name == value) {
                return hospital
            } else {
                return hospital.name.toLowerCase().includes(value.toLowerCase())
            }
        }))
        setFilteredMachine(machinesList.filter((machine) => {
            if (machine.serialNumber == value || machine.motor == value) {
                return machine
            } else {
                return machine.serialNumber.toLowerCase().includes(value.toLowerCase()) || machine.motor.toLowerCase().includes(value.toLowerCase())
            }
        }))
    }

    return (
        <div className="home">
            <h3>Cerca macchine,pazienti o ospedali</h3>
            <div className="searchbar search-params">
                <input type="text" placeholder="Inizia a digitare..." onChange={(e) => handleSearch(e.target.value)} />
                <ul className={`search-results ${hideList ? 'hidden' : ''}`}>
                    <SearchResults filteredPatient={filteredPatient} handleSelection={handleSelection} />
                    <SearchResults filteredHospital={filteredHospital} handleSelection={handleSelection} />
                    <SearchResults filteredMachine={filteredMachine} handleSelection={handleSelection} />
                </ul>
            </div>

        </div>
    )
}