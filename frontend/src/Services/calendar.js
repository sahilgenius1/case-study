import axios from 'axios';
import {getAuth,Login} from './Login'

const getCalMeetings=()=>{
    const token = getAuth();
const token1 =  token.replace(/^"|"$/g, '') ;
    return axios.get('http://localhost:3000/calendar',{headers:{
        'Authorization':token1
    }}
    )
                    .then((response)=>{
                        console.log(response.data);
                        return response.data;
                    }).catch(err=>{
                        return new Error("Cant access Calendar")
                    })
};
const getCalMeetingByDate=(val)=>{
    const token = getAuth();
    
const token1 =  token.replace(/^"|"$/g, '') ;
    return axios.get(`http://localhost:3000/calendar?date=${val}`,{headers:{
        'Authorization':token1
    }})
                .then(response=>{
                    console.log(response.data);
                    return response.data;
                })
}



export{getCalMeetings,getCalMeetingByDate}