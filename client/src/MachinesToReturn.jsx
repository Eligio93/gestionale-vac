import { useContext } from "react"
import { DataContext } from "./components/DataContext"
import { isBefore } from 'date-fns'
import { useState } from "react"
import TherapyToReturn from "./components/TherapyToReturn"




export default function MachinesToReturn() {
    const { therapiesList, loading } = useContext(DataContext)
    const [successMessage, setSuccessMessage] = useState()
    const [errorMessage, setErrorMessage] = useState()

    if (loading) {
        return <p>Loading...</p>
    }
    const today = new Date()
    const finishedTherapies = therapiesList.filter((therapy) => isBefore(therapy.endDate, today) && therapy.archived == false)
    if (successMessage) {
        return <p className="success-msg">{successMessage}</p>
    }
    if (errorMessage) {
        return <p className="error-msg">{errorMessage}</p>
    }
    return (
        <>
            {finishedTherapies.length < 1 && <p>Non ci sono macchine da ritirare</p>}
            {finishedTherapies.length > 0 && <ul className="ended-therapies-list">
                {finishedTherapies.map((therapy) =>
                    <TherapyToReturn
                        key={therapy._id}
                        therapy={therapy}
                        machine={therapy.machine}
                        patient={therapy.patient}
                        hospital={therapy.hospital}
                        setSuccessMessage={setSuccessMessage}
                        setErrorMessage={setErrorMessage}
                    />
                )}
            </ul>}

        </>

    )
}