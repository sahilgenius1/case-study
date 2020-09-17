import React from 'react';
import LoginForm from './Login'
import Home from './Home'
import NavBar from './NavBar'
import Calendar from './Calendar'
import Meeting from './Meeting'
import Teams from './Teams'
import SignUp from './SignUp'
import {Route,withRouter} from 'react-router-dom'
import AddMeeting from './AddMeeting'

function App(props) {
    return (
        <div>
                <NavBar/>
                <Route path="/login" component={LoginForm}>
                    
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/signup" exact>
                    <SignUp/>
                </Route>
                <Route path="/calendar" component={Calendar}>
                  
                </Route>
                <Route path="/meeting" component={Meeting}>
               
                </Route>
                <Route path="/teams" component={Teams}>
                   
                </Route>
               
        </div>
    );
}

export default App;