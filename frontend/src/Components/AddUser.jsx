import React, { Component } from 'react';
import {getUsers,addingUser} from '../Services/Meeting'
import { withRouter } from 'react-router';
class AddUser extends Component {
    state={
        user:"",
        userlists:null,
        status:"Loading_User",
        values:{

        }

    }

    addingUser=(event)=>{
        
        const value=event.target.value;
        const i  = value.indexOf("/");
        
        const id = value.slice(0,i);
        const email = value.slice(25,value.length);
      addingUser(this.props.meetings,id,email)
        .then(response=>window.location.assign("http://localhost:3001/meeting"))
        .catch(err=>alert(err.message))
    }
    
    render() {
        const {user,userlists,status}=this.state;
        const {meetings}=this.props
        
       let ele;
       switch(status){
         case "Loading_User":
             ele=(
                 <div>
                    
                 </div>
             )
             break;
             case "Loaded_User":
                console.log(userlists)   
             ele=(
                       
                        <select onChange={this.addingUser}  name="user-list" className="form-control">
                            
                            {
                                userlists.map(list=>(
                                    <option id={list.emailid} value={list._id+"/"+list.emailid}>{list.name}</option>
                                ))
                            }
                        
                        </select>
                        
                    
                 )
                 break;
            default:break;
       }
        return (
            <div>
                <div className="form-group">
                 
                  
                    <br/>
                    {ele}
                    
                   
                  
                  
                </div>
            </div>
        );
    }
    componentDidMount(){
        console.log("love")
        getUsers()
            .then(userlists=>{
                this.setState({
                    userlists,
                    status:"Loaded_User"
                })
               
            })
    }
}

export default AddUser;