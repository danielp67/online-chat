import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Home";

class App extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    {/*                    <Route exact path="/">
                        <Redirect to="/app" /> exact component={Home} />
                    </Route>*/}
                    <Route path="/app" element={<Home/>}/>
                   {/* <Route path="/app/sport/:sportName" exact component={SelectedSport} />
                    <Route path="/app/:roomId exact component={SelectedEvent} />
              */}  </Routes>
            </Router>
        );
    }

}


export default App;