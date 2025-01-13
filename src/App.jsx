// UTILITY
import { BrowserRouter, Routes, Route } from "react-router-dom";


// IMPORT LAYOUTS
import LayoutDefault from './layouts/LayoutDefault';


// IMPORT PAGES
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
// import HomePage from "./pages/BookDetailsPage";


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
            {/* <Route path=":id" Component={BookDetailsPage}></Route> */}

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
