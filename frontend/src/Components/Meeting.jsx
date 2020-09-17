
    import {Link, Route} from 'react-router-dom'
    import React, { Component } from 'react';
    import { getMeetings,getMeetingsByParams } from '../Services/Meeting';
    import Calendar from './Calendar';
    import AddMeeting from './AddMeeting'
    import {deleteMeeting} from '../Services/Meeting'
    import AddUser from './AddUser'


    class Meeting extends Component {
        state={
            meetings:null,
            status:"Meeting_Loading",
            dateToFind:(new Date()),
            error:null,
            period:"",
            search:"",
            visibility:false
        }
        dateInputRef=React.createRef();
        searchInputRef=React.createRef();
        periodInputRef = React.createRef();

        updateSearch=(event)=>{
            event.preventDefault();
            console.log(this.dateInputRef.current.value+" "+this.searchInputRef.current.value+" "+this.periodInputRef.current.value)
            this.setState({
            dateToFind:this.dateInputRef.current.value,
            search:this.searchInputRef.current.value,
            period:this.periodInputRef.current.value
            })
        }
        updateVisibility=(event)=>{
            if(this.state.visibility===true){
                this.setState({
                    visibility:false
                })
            }else{
                this.setState({
                    visibility:true
                })
            }
        }
        
        Delete=(meetingId)=>{
            deleteMeeting(meetingId)
                .then(response=>alert(`deleted ${response._id}`))
                .then(data=>window.location.assign("http://localhost:3001/meeting"))
                .catch(err=>alert(err.message))
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
        render() {
            const {meetings,status,dateToFind,error,period}=this.state;
            let ele;
            switch(status){
                case Meeting.Status.Loading_meeting : 
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

            case Meeting.Status.Loaded_meeting :     
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
                                                <button type="button" onClick={this.updateVisibility} className="btn btn-warning">Add User</button>
                                                        <div style={this.state.visibility===false?{'display':'none'}:{}}>
                                                           
                                                            <AddUser meetings={meeting}  />
                                                            
                                                            
                                                            </div>
                                                        
                                                &nbsp;&nbsp;
                                                <button type="button" onClick={()=>this.Delete(meeting._id)} className="btn btn-danger ">Excuse Yourself</button>
                                            </div>
                                        </div>
                                    
                                </div>

                        )
                        )
                    }
                </div>
            )
            break;
            case Meeting.Status.Error_meeting : 
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
                    <div className="jumbotron">
                    <h1 className="display-3">Meeting</h1>
                    <p className="lead">All Meeting one platform</p>
                    <hr className="my-2"/>
                    <p className="lead">
                        <Link to={`${this.props.match.url}/add`} className="btn btn-primary btn-lg" href="Jumbo action link" role="button">Add Meeting</Link>
                    </p>
                    <div>
                        <Route path={`${this.props.match.path}/add`} component={AddMeeting}></Route>
                    </div>
                    
                </div>
                <div>
                <form onSubmit={this.updateSearch}>
                    <div className="form-group">
                        <label>Search Meeting Date</label>
                        <input type="date" className="form-control" name="dateToFind" defaultValue={this.state.dateToFind} aria-describedby="helpId" placeholder="enter date to search " id="date" ref={this.dateInputRef}/>
                        <label>Search Meeting Description</label>
                        <input type="text" className="form-control" defaultValue="" name="search" aria-describedby="helpId" placeholder="enter date to search " id="date" ref={this.searchInputRef}/>
                        <label>Search Meeting Time</label>
                        <input  type="text" name="period"   defaultValue="" list="list-period" className="form-control" ref={this.periodInputRef}/>
                        <datalist id="list-period">
                            <option>Past</option>
                            <option >future</option>
                            <option>all</option>
                        </datalist> 
                        <br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
        
                    </form>
                </div>
                
                {ele}
                
                
                </div>
                
            );
        }
        componentDidMount(){
            getMeetings()
                .then(meetings=>{
                    this.setState({
                        meetings,
                        status:Meeting.Status.Loaded_meeting
                    })
                }).catch(err=>{
                    this.setState({
                        status:Meeting.Status.error_meeting,
                        err
                    })
                })
        }
        componentDidUpdate(prevProps,prevState){
            if(prevState.period!==this.state.period){
                console.log("A")
                getMeetingsByParams(this.state.period)
                .then(meetings=>{
                    this.setState({
                        meetings,
                        status:Meeting.Status.Loaded_meeting
                    })
                }).catch(err=>{
                    this.setState({
                        error:err,
                        status:Meeting.Status.error_meeting
                    })
                })
            }
            
            else if(prevState.dateToFind!==this.state.dateToFind || prevState.search!==this.state.search){
                console.log("B")
                getMeetingsByParams(this.state.dateToFind,this.state.search)
                .then(meetings=>{
                    this.setState({
                        meetings,
                        status:Meeting.Status.Loaded_meeting
                    })
                }).catch(err=>{
                    this.setState({
                        error:err,
                        status:Meeting.Status.error_meeting
                    })
                })
            }    
        
    }
            
    }

    Meeting.Status={
        Loading_meeting:"Meeting_loading",
        Loaded_meeting:"Meeting_loaded",
        error_meeting:"Error_Meeting"
    }

    export default Meeting;

