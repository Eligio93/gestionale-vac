import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TherapyToReturn from "./TherapyToReturn";
import { useContext } from "react";
import { DataContext } from "./DataContext";
import TherapyHistory from "./TherapyHistory";

export default function DetailedResult() {
    const location = useLocation()
    const selectedResult = location.state
    const { patientsList, hospitalsList, machinesList, loading } = useContext(DataContext)
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
            const foundHospital = hospitalsList.find((hospital) => hospital._id === selectedResult.hospital._id);
            setPatient();
            setHospital(foundHospital);
            setMachine()
        }
        if (selectedResult.machine && machinesList) {
            const foundMachine = machinesList.find((machine) => machine._id === selectedResult.machine._id);
            setPatient();
            setHospital();
            setMachine(foundMachine)
        }
    }, [selectedResult, patientsList, hospitalsList, machinesList, loading]); // Dipendenze

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
                <h2 className="title">
                    <span>Scheda {patient.name + ' ' + patient.lastName}</span>
                    <span>di {patient.city} TEL: {patient.phone}</span>
                </h2>
                <h3 className="subtitle">Terapie in corso o con macchina da ritirare</h3>
                {inTherapy && activeTherapies.length == 1 ? (
                    <ul>
                        < TherapyToReturn
                            patient={patient}
                            hospital={hospital}
                            therapy={activeTherapies[0]}
                            machine={activeTherapies[0].machine}
                            todayDate={new Date()}
                            setSuccessMessage={setSuccessMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    </ul>
                ) : (<p>Non ci sono terapie in corso</p>)}
                <h3 className="subtitle">Storico Terapie</h3>
                {therapyHistory && therapyHistory.length > 0 ? (
                    <ul>
                        {therapyHistory.slice().reverse().map((therapy) =>
                            <TherapyHistory
                                key={therapy._id}
                                patient={patient}
                                hospital={hospital}
                                machine={therapy.machine}
                                therapy={therapy} />
                        )}
                    </ul>
                ) : (<p>Non ci sono vecchie terapie da mostrare</p>)}
            </div>

        )

    }
    if (hospital) {
        const activeTherapies = hospital.therapies.filter((therapy) => therapy.archived == false)
        const therapyHistory = hospital.therapies.filter((therapy) => therapy.archived == true)
        return (
            <div className="detailed-result">
                <h2 className="title">Scheda {hospital.name}</h2>
                <h3 className="subtitle">Terapie in corso o con macchina da ritirare</h3>
                {activeTherapies.length > 0 ? (
                    <ul>
                        {activeTherapies.map((therapy) =>
                            < TherapyToReturn
                                key={therapy._id}
                                hospital={hospital}
                                patient={patient}
                                therapy={therapy}
                                machine={therapy.machine}
                                todayDate={new Date()}
                                setSuccessMessage={setSuccessMessage}
                                setErrorMessage={setErrorMessage}
                            />

                        )}

                    </ul>
                ) : (<p>Non ci sono terapie in corso</p>)}
                <h3 className="subtitle">Storico Terapie</h3>
                {therapyHistory && therapyHistory.length > 0 ? (
                    <ul>
                        {therapyHistory.slice().reverse().map((therapy) =>
                            <TherapyHistory
                                key={therapy._id}
                                patient={patient}
                                hospital={hospital}
                                machine={therapy.machine}
                                therapy={therapy} />
                        )}
                    </ul>
                ) : (<p>Non ci sono vecchie terapie da mostrare</p>)}
            </div>

        )

    }
    if (machine) {
        const activeTherapies = machine.therapies.filter((therapy) => therapy.archived == false)
        const therapyHistory = machine.therapies.filter((therapy) => therapy.archived == true)
        return (
            <div className="detailed-result">
                <h2 className="title">Scheda {machine.serialNumber + ' di ' + machine.motor}</h2>
                <h3 className="subtitle">Terapie in corso o con macchina da ritirare</h3>
                {activeTherapies.length > 0 ? (
                    <ul>
                        < TherapyToReturn
                            hospital={activeTherapies[0].hospital}
                            patient={activeTherapies[0].patient}
                            therapy={activeTherapies[0]}
                            machine={machine}
                            todayDate={new Date()}
                            setSuccessMessage={setSuccessMessage}
                            setErrorMessage={setErrorMessage}
                        />
                    </ul>
                ) : (<p>Non ci sono terapie in corso</p>)}
                <h3 className="subtitle">Storico Terapie</h3>
                {therapyHistory && therapyHistory.length > 0 ? (
                    <ul>
                        {therapyHistory.slice().reverse().map((therapy) =>
                            <TherapyHistory
                                key={therapy._id}
                                machine={machine}
                                patient={patient}
                                hospital={hospital}
                                therapy={therapy} />
                        )}
                    </ul>
                ) : (<p>Non ci sono vecchie terapie da mostrare</p>)}
            </div>

        )


    }

}

