export default function SearchResults(props) {
    const filteredPatient = props.filteredPatient
    const filteredHospital = props.filteredHospital
    const filteredMachine = props.filteredMachine
    const handleSelection = props.handleSelection

    return (
        <>
            {filteredPatient && filteredPatient.length > 0 && filteredPatient.map((patient) =>
                <li key={patient._id} className="listed-result">
                    <div className="object-info" onClick={() => handleSelection({ patient: patient })}>
                        <p>{patient.name + ' ' + patient.lastName + ' di ' + patient.city}</p>
                    </div>
                    <div className="category-info">
                        <p>in Pazienti</p>
                    </div>

                </li>
            )}
            {filteredHospital && filteredHospital.length > 0 && filteredHospital.map((hospital) =>
                <li key={hospital._id} className="listed-result">
                    <div className="object-info" onClick={() => handleSelection({ hospital: hospital })}>
                        <p>{hospital.name + ' di ' + hospital.city}</p>
                    </div>
                    <div className="category-info">
                        <p>in Ospedali</p>
                    </div>
                </li>
            )}
            {filteredMachine && filteredMachine.length > 0 && filteredMachine.map((machine) =>
                <li key={machine._id} className="listed-result">
                    <div className='object-info' onClick={() => handleSelection({ machine: machine })}>
                        <p>{machine.serialNumber + ' ' + machine.motor}</p>
                    </div>
                    <div className="category-info">
                        <p>in Macchine</p>
                    </div>
                </li>
            )}
        </>

    )

}