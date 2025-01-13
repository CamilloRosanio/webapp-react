// UTILITY
import { Outlet } from "react-router-dom";


// IMPORT COMPONENTS
import Navbar from "./partials/Navbar";


// COMPONENT EXPORT

export default function DefaultLayout() {
    return <>
        <div className="wrapper">
            <header>
                <Navbar />
            </header>

            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>

            <footer className="debug">
                <div className="container">
                    Footer
                </div>
            </footer>
        </div>
    </>
}