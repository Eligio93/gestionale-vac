import { useContext } from "react"
import { DataContext } from "./components/DataContext"
import { isBefore } from 'date-fns'
import EndedTherapy from "./components/EndedTherapy"



export default function MachinesToReturn() {
    const { therapiesList, loading } = useContext(DataContext)
    if (loading) {
        return <p>Loading...</p>
    }
    const today = new Date()
    const finishedTherapies = therapiesList.filter((therapy) => isBefore(therapy.endDate, today) && therapy.archived == false)
    console.log(finishedTherapies)

    return (
        <>
            <ul className="ended-therapies-list">
                {finishedTherapies.map((therapy) =>
                    <EndedTherapy
                        key={therapy._id}
                        therapy={therapy}
                    />)}
            </ul>
        </>

    )
}