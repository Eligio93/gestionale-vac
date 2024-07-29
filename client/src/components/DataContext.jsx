import { Children, createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [patientsList, setPatientsList] = useState([]);
    const [hospitalsList, setHospitalsList] = useState([]);
    const [machinesList, setMachinesList] = useState([]);

    const apiEndpoints = [
        { url: 'http://localhost:3001/patients', setter: setPatientsList,name:'patients' },
        { url: 'http://localhost:3001/hospitals', setter: setHospitalsList,name:'hospitals'},
        { url: 'http://localhost:3001/machines', setter: setMachinesList, name:'machines'},
    ]

    const fetchData = async () => {
        try {
            const response = await Promise.all(apiEndpoints.map((endpoint) => axios.get(endpoint.url)))
            response.forEach((response, index) => {
                const target = apiEndpoints[index].name
                apiEndpoints[index].setter(response.data[target])
            })

        } catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    async function reloadData(){
        await fetchData();
    }


    return (
        <DataContext.Provider value={{
            patientsList, setPatientsList,
            hospitalsList, setHospitalsList,
            machinesList, setMachinesList,
            reloadData
        }}>
            {children}
        </DataContext.Provider>
    )




}