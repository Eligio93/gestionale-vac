export default function SearchResults(props) {
    const filteredPatient = props.filteredPatient
    const filteredHospital = props.filteredHospital
    const filteredMachine = props.filteredMachine
    const handleSelection = props.handleSelection

    return (
        <ul className="search-results">
            {filteredPatient && filteredPatient.length > 0 && filteredPatient.map((patient) =>
                <li key={patient._id}>
                    <div onClick={() => handleSelection({ patient: patient })}>
                        <p>{patient.name + ' ' + patient.lastName}</p>
                        <p>{'di ' + patient.city}</p>
                    </div>

                </li>
            )}
            {filteredHospital && filteredHospital.length > 0 && filteredHospital.map((hospital) =>
                <li key={hospital._id}>
                    <div onClick={() => handleSelection({ hospital: hospital })}>
                        <p>{hospital.name}</p>
                        <p>{'di ' + hospital.city}</p>
                    </div>
                </li>
            )}
            {filteredMachine && filteredMachine.length > 0 && filteredMachine.map((machine) =>
                <li key={machine._id}>
                    <div onClick={() => handleSelection({ machine: machine })}>
                        <p>{machine.serialNumber}</p>
                        <p>{machine.motor}</p>
                    </div>
                </li>
            )}
        </ul>

    )

}