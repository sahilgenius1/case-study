import React from 'react';
import {Link} from 'react-router-dom';
import {Logout} from '../Services/Login'
function NavBar(props) {
    return (
        <div>
              <nav className="navbar navbar-expand navbar-dark bg-dark">
            <ul className="nav navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/calendar">Calendar</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/meeting">Meetings</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={Logout}>SignOut</Link>
                </li>
            </ul>
    
        </nav>
        </div>
    );
}

export default NavBar;