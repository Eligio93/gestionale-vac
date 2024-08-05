import { useContext } from "react"
import { DataContext } from "./components/DataContext"
import { isBefore } from 'date-fns'
import EndedTherapy from "./components/EndedTherapy"
import { useState } from "react"



export default function MachinesToReturn() {
    const { therapiesList, loading } = useContext(DataContext)
    const [successMessage, setSuccessMessage] = useState()
    const [errorMessage,setErrorMessage]= useState()
    if (loading) {
        return <p>Loading...</p>
    }
    const today = new Date()
    const finishedTherapies = therapiesList.filter((therapy) => isBefore(therapy.endDate, today) && therapy.archived == false)
    if (successMessage) {
        return <p className="success-msg">{successMessage}</p>
    }
    if(errorMessage){
        return <p className="error-msg">{errorMessage}</p>
    }

    return (
        <>
            <ul className="ended-therapies-list">
                {finishedTherapies.map((therapy) =>
                    <EndedTherapy
                        key={therapy._id}
                        therapy={therapy}
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                        setErrorMessage = {setErrorMessage}
                    />)}
            </ul>
        </>

    )
}