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
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post('http://localhost:3001/patients/newPatient', data)
            reloadData()
            navigate('/');
        } catch (err) {
            console.log(err)
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

    return (
        <>
            <h2 className="title">Aggiungi Nuovo Paziente</h2>
            <form action="" className="newPatient-form form" onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                <label htmlFor="patient-name">Nome:</label>
                <input type="text" minLength={2} required name="name" value={data.name} onChange={handleChange} />
                <label htmlFor="patient-lastName">Cognome:</label>
                <input type="text" minLength={2} required name="lastName" value={data.lastName} onChange={handleChange} />
                <label htmlFor="patient-phone">Telefono:</label>
                <input type="phone" required name="phone" value={data.phone} onChange={handleChange} />
                <label htmlFor="patient-location">Citta:</label>
                <input type="text" required name="city" value={data.city} onChange={handleChange} />
                <button type="submit" className="green-btn">Aggiungi Paziente</button>
            </form>
        </>
    )
}