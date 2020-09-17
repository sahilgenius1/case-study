import React from 'react';
import {Link} from 'react-router-dom';
function Home(props) {
    return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3">Welcome to Telstra Teams</h1>
                    <p className="lead">Here you can manage all your meetings, calendar, teams</p>
                    <hr className="my-2"/>
                    <p>More info</p>
                    <p className="lead">
                        <Link to="/calendar"><a className="btn btn-primary btn-lg" href="Jumbo action link" role="button">Calendar</a></Link>
                            &nbsp;&nbsp;
                        <Link to="/meeting"><a className="btn btn-primary btn-lg" href="Jumbo action link" role="button">Meetings</a></Link>
                        &nbsp;&nbsp;
                        <Link to="/teams"><a className="btn btn-primary btn-lg" href="Jumbo action link" role="button">Teams</a></Link>
                        &nbsp;&nbsp;
                    </p>
                </div>
                </div>
            
        );
}

export default Home;