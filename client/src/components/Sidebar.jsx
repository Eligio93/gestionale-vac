import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <ul className="">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/nuovaMacchina'>Aggiungi Macchina</Link>
                </li>
                <li>
                    <Link to='/nuovoPaziente'>Aggiungi Paziente</Link>
                </li>
                <li>
                    <Link to='/nuovaTerapia'>Nuova Terapia</Link>
                </li>
            </ul>
        </aside>
    );
}
