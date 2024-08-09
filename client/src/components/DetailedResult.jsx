import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EndedTherapy from "./EndedTherapy";
import TherapyToReturn from "./TherapyToReturn";

export default function DetailedResult() {
    const location = useLocation()
    const [patient, setPatient] = useState()
    const [hospital, setHospital] = useState()
    const [machine, setMachine] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const selectedResult = location.state
    useEffect(() => {
        if (selectedResult.patient) {
            setPatient(selectedResult.patient)
            setHospital();
            setMachine()
        }
        if (selectedResult.machine) {
            setPatient();
            setHospital();
            setMachine(selectedResult.machine)
        }
        if (selectedResult.hospital) {
            setPatient();
            setHospital(selectedResult.hospital)
            setMachine()
        }

    }, [selectedResult])
    console.log(patient, hospital, machine)
    if (successMessage) {
        return <p className="success-msg">{successMessage}</p>
    }
    if (errorMessage) {
        return <p className="error-msg">{errorMessage}</p>
    }
    if (patient) {
        const inTherapy = patient.inTherapy
        const activeTherapy = patient.therapies.filter((therapy) => therapy.archived == false)
        const therapyHistory = patient.therapies.filter((therapy) => therapy.archived == true)
        console.log(activeTherapy)
        return (
            <div className="detailed-result">
                <h3>Scheda {patient.name + ' ' + patient.lastName}</h3>
                <h4>Terapie in corso o con macchina da ritirare</h4>
                {inTherapy && activeTherapy.length == 1 ? (
                    <>
                        < TherapyToReturn
                            key={activeTherapy[0]._id}
                            hospital={hospital}
                            patient={patient}
                            therapy={activeTherapy[0]}
                            machine={activeTherapy[0].machine}
                            todayDate={new Date()}
                            setSuccessMessage={setSuccessMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    </>
                ) : (<p>Non ci sono terapie in corso</p>)}
                <h4>Storico Terapie</h4>
                {therapyHistory.length > 0 ? (<p>Ci sono terapie da mostrare</p>) : (<p>Non ci sono vecchie terapie da mostrare</p>)}
            </div>
        )
    }
    if (hospital) {
        return <h1>{hospital.name} selezionato</h1>
    }
    if (machine) {
        return <h1>{machine.serialNumber} selezionata</h1>
    }

}