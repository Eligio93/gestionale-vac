import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "./components/DataContext";


export default function NewPatient() {
    const { reloadData } = useContext(DataContext)
    const [data, setData] = useState({
        name: '',
        lastName: '',
        city: '',
        phone: ''
    })
    const [success, setSuccess] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASEURL}/patients/newPatient`, data)
            if (response.status == 200) {
                setSuccess(response.data.message)
                setTimeout(() => {
                    setSuccess()
                    navigate('/');
                }, 2000)
                reloadData()
            }
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));

    }
    if (loading) {
        return <p>Loading..</p>
    }
    if (success) {
        return <p className="success-msg">{success}</p>
    }

    return (
        <>
            <h2 className="title">Aggiungi Nuovo Paziente</h2>
            <form className="newPatient-form form" onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                <label htmlFor="newPatient-name">Nome:</label>
                <input id="newPatient-name" type="text" minLength={2} name="name" value={data.name} onChange={handleChange} required />
                <label htmlFor="newPatient-lastName">Cognome:</label>
                <input id="newPatient-lastName" type="text" minLength={2} name="lastName" value={data.lastName} onChange={handleChange} required />
                <label htmlFor="newPatient-phone">Telefono:</label>
                <input id="newPatient-phone" type="phone" name="phone" value={data.phone} onChange={handleChange} required />
                <label htmlFor="newPatient-city">Citta:</label>
                <input id="newPatient-city" type="text" name="city" value={data.city} onChange={handleChange} required />
                <button type="submit" className="green-btn">Aggiungi Paziente</button>
            </form>
        </>
    )
}