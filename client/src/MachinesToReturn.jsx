import { useContext } from "react"
import { DataContext } from "./components/DataContext"
import { isBefore } from 'date-fns'
import ListedEndedTherapies from "./components/ListEndedTherapies"



export default function MachinesToReturn() {
    const { therapiesList } = useContext(DataContext)
    const today = new Date()
    const finishedTherapies = therapiesList.filter((therapy) => isBefore(therapy.endDate, today) && therapy.archived == false)
    console.log(finishedTherapies)
    return (
        <>
            <ListedEndedTherapies
                finishedTherapies={finishedTherapies} />
        </>

    )
}