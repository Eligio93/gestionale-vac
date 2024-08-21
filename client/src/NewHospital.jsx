import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "./components/DataContext";


export default function NewHospital() {
    const { reloadData } = useContext(DataContext)
    const [data, setData] = useState({
        name: '',
        city: ''
    })
    const [success, setSuccess] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));

    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/hospitals/newHospital`, data)
            if (response.status == 200) {
                setSuccess(response.data.message)
                setTimeout(() => {
                    setSuccess()
                    reloadData()
                    navigate('/')
                })
            }
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        }

    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (success) {
        return <p className="success-msg">{success}</p>
    }
    return (
        <>
            <h2 className="title">Aggiungi Nuovo Ospedale</h2>
            <form action="" className="newHospital-form form" onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                <label htmlFor="newHospital-name">Nome Ospedale:</label>
                <input id="newHospitalName" type="text" minLength={2} name="name" value={data.name} onChange={handleChange} required />
                <label htmlFor="newHospital-city">Citta:</label>
                <input id="newHospital-city" type="text" name="city" value={data.city} onChange={handleChange} required />
                <button type="submit" className="green-btn">Aggiungi Ospedale</button>
            </form>
        </>
    )
}