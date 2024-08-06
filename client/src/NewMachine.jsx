import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DataContext } from "./components/DataContext";

export default function NewMachine() {
    const {reloadData} = useContext(DataContext)
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
        }finally{
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

        
        <form onSubmit={handleSubmit} className="newMachine-form form" >
            <h2>Aggiungi Nuova Macchina</h2>
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
    );
}


{/* <label htmlFor="reg-utenteMacchina">Chi possiede la macchina</label>
            <select name="utenteMacchina" id="reg-utenteMacchina" onChange={handleChange}>
                <option value="paziente">Paziente</option>
                <option value="ospedale">Ospedale</option>
            </select>
            {utenteMacchina == 'paziente' ? (
                <>
                    <div className="input-paziente">
                        <h2>Informazioni Paziente</h2>
                        <label htmlFor="reg-nomePaziente">Nome Paziente</label>
                        <input type="text" id="reg-nomePaziente" name="nomePaziente" />
                        <label htmlFor="reg-nomePaziente">Cognome Paziente</label>
                        <input type="text" id="reg-nomePaziente" name="nomePaziente" />
                        <label htmlFor="reg-comunePaziente">Comune di Residenza:</label>
                        <input type="text" id="reg-comunePazinete" name="comunePaziente" />
                        <label htmlFor="reg-phonePaziente">Numero di Telefono</label>
                        <input type="phone" id="reg-phonePaziente" name="telefonoPaziente" />
                    </div>
                    <div className="input-referentePaziente">
                        <h2>Info Referente</h2>
                    </div>
                </>
            ) : (
                <p>Selezionato Ospedale</p>
            )} */}