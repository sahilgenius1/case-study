import React from 'react';
import {Link} from 'react-router-dom'
function SignUp(props) {
    return (
        <div>
        <div className="text-center">
                <form   className="form-signin">
    <img className="mb-4" src="https://www.logo.wine/a/logo/Telstra/Telstra-Logo.wine.svg" alt="" width="72" height="72"/>
    <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
    <label for="emailid" className="sr-only">Name</label>
    <input  type="text" name="name" className="form-control" placeholder="Name"  required autoFocus/>
    <label for="emailid" className="sr-only">Email address</label>
    <input  type="email" name="emailid" className="form-control" placeholder="Email address"  required/>
    <label for="password" className="sr-only">Password</label>
    <input  type="password" name="password" className="form-control" placeholder="Password"  required/>
   
   
    <button className="btn btn-lg btn-primary btn-block">Sign Up</button>
    <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
    </div>
    </div>
    );
}

export default SignUp;