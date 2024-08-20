import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DataContext } from "./components/DataContext";

export default function NewMachine() {
    const { reloadData } = useContext(DataContext)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState()
    const [message, setMessage] = useState()
    const [data, setData] = useState({
        machineMotor: 'vaculta',
        serialNumber: ''
    });
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3001/machines/newMachine', data)
            if (response.status == 200) {
                setSuccess(response.data.message)
                setTimeout(() => {
                    setSuccess()
                    reloadData()
                    navigate('/')
                }, 2000)
            }
        } catch (err) {
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
    if (success) {
        return <p className="success-msg">{success}</p>
    }

    return (
        <>
            <h2 className="title">Aggiungi Nuova Macchina</h2>
            <form onSubmit={handleSubmit} className="newMachine-form form" >
                {message && <p className="error-msg">{message}</p>} {/*this message apeears in case the machine is already in the DB*/}
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
