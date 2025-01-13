// UTILITY
import { BrowserRouter, Routes, Route } from "react-router-dom";


// ENV IMPORTS
const apiUrlRoot = import.meta.env.VITE_APIURL;
const apiSubPath = import.meta.env.VITE_APISUBPATH;


// IMPORT LAYOUTS
import LayoutDefault from './layouts/LayoutDefault';


// IMPORT PAGES
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";


// COMPONENT CONTENT

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* LAYOUT */}
          <Route Component={LayoutDefault}>

            {/* ROUTES */}
            <Route index Component={HomePage}></Route>
            <Route path=":id" Component={MovieDetailsPage}></Route>

            {/* 404 NOT FOUND PAGE */}
            <Route path="*" Component={NotFoundPage}></Route>
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}


// COMPONENT EXPORT
export default App
