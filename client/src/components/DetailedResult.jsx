import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TherapyToReturn from "./TherapyToReturn";
import { useContext } from "react";
import { DataContext } from "./DataContext";

export default function DetailedResult() {
    const location = useLocation()
    const selectedResult = location.state
    const { patientsList, hospitalsList,machinesList, loading } = useContext(DataContext)
    const [patient, setPatient] = useState()
    const [hospital, setHospital] = useState()
    const [machine, setMachine] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        if (selectedResult.patient && patientsList) {
            const foundPatient = patientsList.find((patient) => patient._id === selectedResult.patient._id);
            setPatient(foundPatient);
            setHospital();
            setMachine()
        }
        if (selectedResult.hospital && hospitalsList) {
            const foundHospital = hospitalsList.find((hospital) => hospital._id === hospitalsList.hospital._id);
            setPatient(foundHospital);
            setHospital();
            setMachine()
        }
        if (selectedResult.machine && machinesList) {
            const foundMachine = machinesList.find((machine) => machine._id === selectedResult.machine._id);
            setPatient(foundMachine);
            setHospital();
            setMachine()
        }
    }, [selectedResult, patientsList, hospitalsList,machinesList, loading]); // Dipendenze

    if (loading) {
        return <p>Loading...</p>
    }
    if (successMessage) {
        return <p className="success-msg">{successMessage}</p>
    }
    if (errorMessage) {
        return <p className="error-msg">{errorMessage}</p>
    }
    if (patient) {
        const inTherapy = patient.inTherapy
        const activeTherapies = patient.therapies.filter((therapy) => therapy.archived == false)
        const therapyHistory = patient.therapies.filter((therapy) => therapy.archived == true)
        return (
            <div className="detailed-result">
                <h3>Scheda {patient.name + ' ' + patient.lastName}</h3>
                <h4>Terapie in corso o con macchina da ritirare</h4>
                {inTherapy && activeTherapies.length == 1 ? (
                    <ul>
                        < TherapyToReturn
                            hospital={hospital}
                            patient={patient}
                            therapy={activeTherapies[0]}
                            machine={activeTherapies[0].machine}
                            todayDate={new Date()}
                            setSuccessMessage={setSuccessMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    </ul>
                ) : (<p>Non ci sono terapie in corso</p>)}
                <h4>Storico Terapie</h4>
                {therapyHistory && therapyHistory.length > 0 ? (
                    <ul>
                    {therapyHistory.map((therapy)=>{

                    })}
                    </ul>
                ) : (<p>Non ci sono vecchie terapie da mostrare</p>)}
            </div>

        )

    }

}

