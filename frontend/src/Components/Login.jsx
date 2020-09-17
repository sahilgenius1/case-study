
import {Link} from 'react-router-dom';
import {Login} from "../Services/Login"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import React, { Component } from 'react';

class LoginForm extends Component {
        
        state={
            emailid:"",
            password:""
        }
        emailidinputRef = React.createRef();
        passwordinputRef = React.createRef();

    
    Login=(event)=>{
        event.preventDefault();
        console.log(this.prop);
        Login(this.state)
            .then(data=>this.props.history.push("/calendar"))
            .catch(err=>alert("Invalid Credentials"))
    }

    updateCredentials=()=>{
        console.log(this.emailidinputRef.current.value+this.passwordinputRef.current.value)
        this.setState({
            emailid:this.emailidinputRef.current.value,
            password : this.passwordinputRef.current.value
        })
    }
    render() {
        return (
            <div>
                    <div className="text-center">
                            <form  onSubmit={this.Login} className="form-signin">
                <img className="mb-4" src="https://www.logo.wine/a/logo/Telstra/Telstra-Logo.wine.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="emailid" className="sr-only">Email address</label>
                <input ref={this.emailidinputRef} type="email" name="emailid" className="form-control" placeholder="Email address" onChange={this.updateCredentials} required autofocus/>
                <label for="password" className="sr-only">Password</label>
                <input ref={this.passwordinputRef} type="password" name="password" className="form-control" placeholder="Password" onChange={this.updateCredentials} required/>
                <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <p className="mt-4 mb-3 text-muted"> New User ? <Link to="/signup">Sign Up</Link></p>
                <button className="btn btn-lg btn-primary btn-block">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                </form>
                </div>
                </div>
        );
    }
}


export default LoginForm;