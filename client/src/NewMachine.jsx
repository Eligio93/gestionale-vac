import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DataContext } from "./components/DataContext";

export default function NewMachine() {
    const { reloadData } = useContext(DataContext)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [data, setData] = useState({
        machineMotor: 'vaculta',
        serialNumber: ''
    });
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const result = await axios.post('http://localhost:3001/machines/newMachine', data)
            reloadData()
            navigate('/');

        } catch (err) {
            console.log(err)
            setMessage(err.response.data.message)
        } finally {
            setLoading(false)
        }

    }

    function handleDataChange(e) {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h2 className="title">Aggiungi Nuova Macchina</h2>
            <form onSubmit={handleSubmit} className="newMachine-form form" >
                {message && <p className="error-msg">{message}</p>}
                <label htmlFor="reg-motoreMacchina">Motore Macchina</label>
                <select
                    name="machineMotor"
                    id="reg-motoreMacchina"
                    value={data.machineMotor}
                    onChange={handleDataChange}
                >
                    <option value="vaculta">Vaculta</option>
                    <option value="activac">Activac</option>
                </select>
                <label htmlFor="reg-serialeMacchina">Seriale Macchina:</label>
                <input
                    type="text"
                    id="reg-serialeMacchina"
                    name="serialNumber"
                    value={data.serialNumber}
                    onChange={handleDataChange}
                />
                <button type="submit" className="green-btn">Registra Macchina</button>
            </form>
        </>
    );
}
