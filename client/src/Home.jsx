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
    //hide list is that variables that tells us if there s any results while there s a search typing
    const hideList = filteredHospital.length == 0 && filteredMachine.length == 0 && filteredPatient.length == 0;
    const navigate = useNavigate();

    //function that navigate to the detailedResults page passing the result that has been clicked on
    function handleSelection(selectedResult) {
        navigate('/dettagliRisultato', { state: selectedResult })
    }

    function handleSearch(value) {
        //if there s no txt in the searchBar, bring back the previous results to none
        if (value == '') {
            setFilteredHospital([]);
            setFilteredPatient([])
            setFilteredMachine([])
            return;
        }
        //set the filtered patient in case the value on searchBar contains the name or the surname of the patient
        setFilteredPatient(patientsList.filter((patient) => {
            if (patient.name === value || patient.lastName === value) {
                return patient
            } else {
                return patient.name.toLowerCase().includes(value.toLowerCase()) || patient.lastName.toLowerCase().includes(value.toLowerCase())
            }
        }))
        //same thing with the hospital name
        setFilteredHospital(hospitalsList.filter((hospital) => {
            if (hospital.name == value) {
                return hospital
            } else {
                return hospital.name.toLowerCase().includes(value.toLowerCase())
            }
        }))

        //same thing with the machine serialNumber or Motor
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
            <h3>Cerca macchine, pazienti o ospedali</h3>
            <div className="searchbar search-params">
                <input type="text" placeholder="Inizia a digitare..." onChange={(e) => handleSearch(e.target.value)} />
                <ul className={`${hideList ? 'hidden' : 'search-results'}`}>
                    {/*here are putted in the same list the results we got from the search of patients, machines,hospitals*/}
                    <SearchResults filteredPatient={filteredPatient} handleSelection={handleSelection} />
                    <SearchResults filteredHospital={filteredHospital} handleSelection={handleSelection} />
                    <SearchResults filteredMachine={filteredMachine} handleSelection={handleSelection} />
                </ul>
            </div>

        </div>
    )
}