import { Link } from "react-router-dom"

export default function Sidebar(){
    return (
       <aside className="sidebar">
        <ul>
            <Link to='/'>Home</Link>
            <Link to='/nuovaMacchina'>Aggiungi Macchina</Link>
            <Link to='/nuovoPaziente'>Aggiungi Paziente</Link>
            <Link to='/nuovaTerapia'>Nuova Terapia</Link>
        </ul>
       </aside>
    )
}