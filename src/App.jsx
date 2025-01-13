// UTILITY
import { BrowserRouter, Routes, Route } from "react-router-dom";


// IMPORT LAYOUTS
import LayoutDefault from './layouts/LayoutDefault';


// IMPORT PAGES
import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import PostsPage from "./pages/PostsPage";
import NotFoundPage from "./pages/NotFoundPage";


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
            {/* <Route path="/about" Component={AboutPage}></Route> */}
            {/* <Route path="/posts" Component={PostsPage}></Route> */}

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
