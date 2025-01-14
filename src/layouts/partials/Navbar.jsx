// UTILITY
import { NavLink } from "react-router";


// COMPONENT EXPORT

export default function Navbar({ children }) {
    return <>
        <nav>
            <div className="container">
                <NavLink to="/" className="link">Sgnepflix</NavLink>
            </div>
        </nav>
    </>
}