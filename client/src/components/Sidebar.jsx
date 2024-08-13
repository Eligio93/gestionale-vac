import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/nuovaMacchina'><li>Aggiungi Macchina</li></Link>
                <Link to='/nuovoPaziente'><li>Aggiungi Paziente</li></Link>
                <Link to='/nuovoOspedale'><li>Aggiungi Ospedale</li></Link>
                <Link to='/nuovaTerapia'><li>Nuova Terapia</li></Link>
                <Link to='/ritiro'><li>Macchine da ritirare</li></Link>
            </ul>
        </aside>
    );
}
