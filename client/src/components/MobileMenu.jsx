import { Link } from "react-router-dom"
import { useRef } from "react"
import { useEffect } from "react"

export default function MobileMenu({openMenu,setOpenMenu}){
    const menuRef = useRef()

    return (
        <nav ref= {menuRef}className={openMenu ? 'mobileMenu': 'hidden'}>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/nuovaMacchina'><li>Aggiungi Macchina</li></Link>
                <Link to='/nuovoPaziente'><li>Aggiungi Paziente</li></Link>
                <Link to='/nuovoOspedale'><li>Aggiungi Ospedale</li></Link>
                <Link to='/nuovaTerapia'><li>Nuova Terapia</li></Link>
                <Link to='/ritiro'><li>Macchine da ritirare</li></Link>
            </ul>
        </nav>
    )
}