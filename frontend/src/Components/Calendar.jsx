import React from 'react';
import {getCalMeetings,getCalMeetingByDate} from '../Services/calendar';
import  { Component } from 'react';
import moment from 'moment';

class Calendar extends Component {
    state={
        dateToShow : new Date(),
        meetings:null,
        status : "Loading_meetings",
        error:null
    }
    changeDate=(event)=>{

          const value = event.target.value;
          console.log(value);
          this.setState({
              dateToShow:(new Date(value)),
              status:Calendar.Status.Loading_meeting
          })  
    }
    render() {
        const {dateToShow,meetings,status,error}=this.state;
        let ele;
        
        switch(status){
            case Calendar.Status.Loading_meeting : 
                ele = (
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <strong>Loading Meetings! Please Wait.</strong>
                        </div>
                )
                break;

            case Calendar.Status.Loaded_meeting :     
            ele = (
                <div className="row">
                    {
                        meetings.map(meeting=>(
                            
                                <div key={meeting.name} className="col-4 d-flex">
                                    
                                        <div className="card-body card w-100 my-3 d-flex flex-column text-reset text-decoration-none bg-info">
                                            <div className="card-img-container d-flex flex-column justify-content-center">
                                                
                                            </div>
                                            <h4 className="card-title">{meeting.name}</h4>
                                            <div className="card-text">
                                                <div>
                        <span>{meeting.startTime.hours}:{meeting.startTime.minutes}</span> - <span>{meeting.endTime.hours}:{meeting.endTime.minutes}</span>
                                                </div>
                                                <div>
                                                    <span><strong><em>{this.formatDate(meeting.date)}</em></strong></span>
                                                </div>
                                                <div className="my-3">
                                                    <p><strong>{meeting.description}</strong></p>
                                                </div>
                                                <div>
                                                    <h3>Users</h3>
                                                    <ul type="square">
                                                       {meeting.users.map(user=>(
                                                           <li><strong><em>{user.emailid}</em></strong></li>
                                                       ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    
                                </div>

                        )
                        )
                    }
                </div>
            )
            break;
            case Calendar.Status.Error_meeting : 
                    ele = (
                        <div>
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <strong>{error.message}</strong> 
                            </div>
                        </div>
                    )
                    break;
                    default : break;
        }
        
        return (
          <div className="container my-4">
              <>
              <div>
       
              
              
                        
                            <div className="jumbotron jumbotron-fluid">
                                 <div className="container">
                                    <h1 className="display-3">Calendar</h1>
                                    <p className="lead">Search and Manage all your meetings</p>
                                    <hr className="my-2"/>
                                    <p>More info</p>
                                    
                                </div>
                            </div>
                        </div>
                            <form>
                    <div className="form-group">
                        <label>Search Meeting Date</label>
                        <input type="date" className="form-control" name="date" aria-describedby="helpId" placeholder="enter date to search " id="date" onChange={this.changeDate}/>
                        
                        
                        </div>
        
                    </form>
                  
                    
                <h1>Your Meetings for the Day</h1>
                {ele}
              </>
          </div>
        );
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    componentDidMount(){
        getCalMeetings()
            .then(meetings=>{
                this.setState({
                    meetings,
                    status: Calendar.Status.Loaded_meeting
                })
            }).catch(error=>{
                this.setState({
                    status:Calendar.Status.Error_meeting,
                    error
                })
            })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.dateToShow!==this.state.dateToShow){
            console.log("world")
            console.log(this.state.dateToShow)
            const val = this.formatDate(this.state.dateToShow)
            console.log(typeof(val))
            console.log(val);
            getCalMeetingByDate(val)
                .then(meetings=>{
                    this.setState({
                        meetings,
                        status:Calendar.Status.Loaded_meeting
                    })
                }).catch(error=>{
                    this.setState({
                        status:Calendar.Status.Error_meeting,
                        error
                    })
                })
        }
    }
}
Calendar.Status = {
    Loading_meeting:"Loading_meeting",
    Loaded_meeting:"Loaded_Meeting",
    Error_meeting:"Error_loading"
}
export default Calendar;

/*  */