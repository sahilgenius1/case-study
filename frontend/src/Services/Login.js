import axios from 'axios';

let isLoggedIn=false;
const Logout = ()=>{
    localStorage.clear();
    return;
}
const Login = (credentials)=>{
    return axios.post("http://localhost:3000/login",credentials,{
        headers:{
            'Content-Type':'application/json',
        }
    }).then(response=>{
        
        if(response.data.token!==null){
            localStorage.clear();
            localStorage.setItem('email',JSON.stringify(response.data.email));
            localStorage.setItem('token',JSON.stringify(response.data.token));
            isLoggedIn=true;
            return response.data;
        }else{
            return new Error('Credentials Incorrect');
        }
    }).catch(err=>{
        return err.message;
    })
}
const getAuth=()=>{
    return localStorage.getItem('token')
}

export{
    Login,getAuth,Logout
}