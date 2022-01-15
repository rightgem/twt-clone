import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
// import NotFound from "../routes/NotFound";

const AppRouter = ({ isLoggedIn }) => {
    // react-router-dom 구버전(~v5)
    // return (
        // <Router>
        //     <Switch>
        //         {isLoggedIn ? (
        //             <> {/* <- fragment :: 많은 요소를 render할 때 사용, 부모요소없고 div나 span 쓰기싫고  */}
        //                 <Route exact path="/">
        //                     <Home />
        //                 </Route>
        //             </> 
        //         ) : (
        //             <>
        //                 <Route exact path="/">
        //                     <Auth />
        //                 </Route>
        //             </>
        //         )}
        //     </Switch>
        // </Router>
    // );
        
    //v6 방식
    return(
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={ <Home/> } />
                        <Route exact path="/profile" element={ <Profile/> } />
                    </>
                ) : (
                    <Route exact path="/" element={ <Auth/> } />
                )}
                {/* <Route exact path="/*" element={<NotFound/>} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;