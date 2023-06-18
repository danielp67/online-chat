import React from 'react';
import {BrowserRouter as Router, Route, Routes, useParams} from "react-router-dom";
import Home from "./Home";
import Room from "./Room";

function App(){
        return (
            <Router>
                <Routes>
                    <Route path="/app/home" element={<Home/>}/>
                    <Route path="/app/rooms/:roomId" element={<Room/>}/>

                    {/* <Route path="/app/sport/:sportName" exact component={SelectedSport} />
                    <Route path="/app/:roomId exact component={SelectedEvent} />
              */}  </Routes>
            </Router>
        );

}


export default App;