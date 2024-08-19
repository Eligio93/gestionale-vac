import { Link, useLocation } from "react-router-dom"
import hamburgerIcon from '../assets/hamburgerIcon.svg'
import { useEffect, useRef, useState } from "react"

export default function MobileMenu() {
    const menuRef = useRef();
    const iconRef = useRef()
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false)
    //This useEffect closes the menu when there s a click or a tap out of the menu itself
    useEffect(() => {
        let handler = (e) => {
            //if the click doesnt include the image or the menu, closes the menu
            if (!menuRef.current.contains(e.target) && !iconRef.current.contains(e.target)) {
                setOpenMenu(false)
            }
        }
        document.addEventListener('mousedown', handler)
        //cleaning function of the use effect
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    })

    useEffect(() => {
        setOpenMenu(false)
    }, [location.pathname])

    return (
        <div className="mobileMenu">
            <div className="mobile-header">
                <img ref={iconRef} src={hamburgerIcon} alt="" onClick={() => setOpenMenu(!openMenu)} />
            </div>
            <nav className={openMenu ? 'mobileNav' : 'hidden'} ref={menuRef}>
                <ul>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/nuovaMacchina'><li>Aggiungi Macchina</li></Link>
                    <Link to='/nuovoPaziente'><li>Aggiungi Paziente</li></Link>
                    <Link to='/nuovoOspedale'><li>Aggiungi Ospedale</li></Link>
                    <Link to='/nuovaTerapia'><li>Nuova Terapia</li></Link>
                    <Link to='/ritiro'><li>Macchine da ritirare</li></Link>
                </ul>
            </nav>
        </div>

    )
}