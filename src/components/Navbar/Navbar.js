import {Component, useState} from "react";
import {navigation} from "./navigation";
import "./Navbar.css"
import useAuth from "../../hooks/useAuth";
import {Link} from "react-router-dom";

const Navbar = () => {

    const [clicked, setClicked] = useState(false);

    const { isAuthenticated } = useAuth();

    const handleClick = () => {
        setClicked(() => !clicked);
    }


    return (
        <nav className={"navbar-items"}>
            <p className={"logo"}>
                <i className="fa-regular fa-copyright"/> Micoshop
            </p>
            <div onClick={handleClick} className={"menu-icons"}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}/>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                <li>
                    <a className="nav-link" href={"#"}>
                        Home
                    </a>
                </li>
                {isAuthenticated && <>
                    <li>
                    <a className="nav-link" href={"#"}>
                        Profile
                    </a>
                </li>
                    <li>
                        <a className="nav-link" href={"#"}>
                            Orders
                        </a>
                    </li></>}
                <li>
                    <Link className="nav-link" to={"cart"}>
                        My Cart
                    </Link>
                </li>
                {!isAuthenticated && <li><Link className={"nav-link-mobile"} to={"login"}>Sign Up</Link></li>}
            </ul>
        </nav>
    )

}

export default Navbar;