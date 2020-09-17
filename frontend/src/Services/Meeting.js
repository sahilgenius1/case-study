import axios from 'axios';
import {getAuth} from './Login'

const getMeetings=()=>{
    const token = getAuth().replace(/^"|"$/g, '') ;
    
    return axios.get("http://localhost:3000/meeting",{
        headers:{
            "Authorization":token
        }
    })
                    .then(response=>{
                        console.log(response.data);
                        return response.data
                    })
}
const getMeetingsByParams=(...queryParams)=>{
    console.log("Meeting here")
    const token = getAuth().replace(/^"|"$/g, '') ;
    if(queryParams.length===1){
        return axios.get(`http://localhost:3000/meeting?period=${queryParams[0]}`,{
            headers:{
                "Authorization":token
            }
        })
                    .then(response=>{
                        return response.data;
                    })
    }else if(queryParams.length===2){
        return  axios.get(`http://localhost:3000/meeting?date=${queryParams[0]}&search=${queryParams[1]}`,{
            headers:{
                "Authorization":token
            }
        })
                    .then(response=>{
                       return response.data
                    })
    }

}
const deleteMeeting=(meetingId)=>{
    const token = getAuth().replace(/^"|"$/g, '') 
    return axios.delete(`http://localhost:3000/meeting/${meetingId}`,{
        headers:{
            "Authorization":token
        }
    })
        .then(response=>{
            console.log(response.data);
            return response.data;
        })
}
const getUsers=()=>{
    const token = getAuth().replace(/^"|"$/g, '') ;
    return axios.get("http://localhost:3000/users",{
        headers:{
            "Authorization":token
        }
    })
            .then(response=>{
                return response.data;
            })
}
const addingUser=(meetings,userId,email)=>{
    const token = getAuth().replace(/^"|"$/g, '') ;
    console.log(token)
return axios.patch(`http://localhost:3000/meeting/${meetings._id}/${userId}?action=add_attendee&email=${email}`
,{},{
        headers:{
            "Authorization":token,
            "Content-Type":"application/json"
        }
    
    }).then(response=>{
        return response.data;
    }).catch(err=>{
        console.log(err.message)
        return err
    })
}
const addMeeting=(userId,meetingDetails)=>{
    console.log("Meeting here")
    let email=localStorage.getItem('email')
    email=email.replace(/^"|"$/g, '') ;
    const token = getAuth().replace(/^"|"$/g, '') ;
    const meetingWithId = {
        name:meetingDetails.name,
        description:meetingDetails.description,
        date:meetingDetails.date,
        startTime:{
            hours:+meetingDetails.shours,
            minutes:+meetingDetails.sminutes
        },
        endTime:{
            hours:+meetingDetails.ehours,
            minutes:+meetingDetails.eminutes
        },
        users:[
            {   _id:+userId,
                emailid:email
            }
        ]

    }
    return axios.post("http://localhost:3000/meeting",meetingWithId,{
        headers:{
            "Authorization":token,
            'Content-Type':"application/json"
        }
    }).then(response=>{
        return response.data;
    })
}
export{getMeetings,getMeetingsByParams,addMeeting,deleteMeeting,getUsers,addingUser}