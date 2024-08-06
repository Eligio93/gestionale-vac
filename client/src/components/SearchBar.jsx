import { useContext, useState } from "react"
import { DataContext } from "./DataContext";
import SearchResults from "./SearchResults";

export default function SearchBar() {
    const { patientsList, hospitalsList, machinesList } = useContext(DataContext)
    const [filteredPatient, setFilteredPatient] = useState([]);
    const [filteredHospital, setFilteredHospital] = useState([]);
    const [filteredMachine, setFilteredMachine] = useState([]);
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
        <>
            <div className="searchbar">
                <input type="text" placeholder="Inizia a digitare..." onChange={(e) => handleSearch(e.target.value)} />
            </div>
            <div>
                <SearchResults filteredPatient={filteredPatient} />
                <SearchResults filteredHospital={filteredHospital} />
                <SearchResults filteredMachine={filteredMachine} />
            </div>
        </>

    )
}