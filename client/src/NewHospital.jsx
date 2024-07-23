import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function NewHospital() {
    const [data, setData] = useState({
        name: '',
        city: ''
    })
    const [error, setError] = useState('')
    const [loading,setLoading]=useState(false)
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
            const result = await axios.post('http://localhost:3001/hospitals/newHospital', data)
            navigate('/');
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        }

    }
    if(loading){
        return <p>Loading...</p>
    }
    return (
        <form action="" className="newHospital-form form" onSubmit={handleSubmit}>
            <h2>Aggiungi Nuovo Ospedale</h2>
            {error && <p className="error-msg">{error}</p>}
            <label htmlFor="hospital-name">Nome Ospedale:</label>
            <input type="text" minLength={2} required name="name" value={data.name} onChange={handleChange} />
            <label htmlFor="hospital-location">Citta:</label>
            <input type="text" required name="city" value={data.city} onChange={handleChange} />
            <button type="submit" className="green-btn">Aggiungi Ospedale</button>
        </form>
    )
}