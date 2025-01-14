// UTILITY
import { NavLink } from "react-router";


// COMPONENT EXPORT

export default function Navbar({ children }) {
    return <>
        <nav className="debug">
            <div className="container">
                <NavLink to="/" className="debug">Sgnepflix</NavLink>
                {/* <NavLink to="/movies/:id" className="debug">Detail</NavLink> */}
            </div>
        </nav>
    </>
}