import React from 'react';
import NewWindow from 'react-new-window'
import axios from 'axios'
import { Component } from 'react';
import {addMeeting} from '../Services/Meeting'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
class AddMeeting extends Component {
    state={
        values:{

        }
    }

    addMeeting=(event)=>{
        event.preventDefault();
        addMeeting(this.props.match.params.id,this.state.values)
            .then(meetingUpdate=>alert(`meeting created id ${meetingUpdate._id}`))
            .then(()=>{
                return axios.get("http://localhost:3000/meeting")
                    .then(res =>
                        this.props.history.push("http://localhost:3000/meeting")
                        )
    .catch(err => console.log(err));
                this.props.history.push(`/meeting`)})
            .catch(err=>alert(err.message))
    }
    
    updateValue=(event)=>{
        const value = event.target.value;
        const key = event.target.name;
        this.setState({
            values:{
                ...this.state.values,
                [key]:value
            }
        })
    }
    render() {
        return (
            <div>
            <h1>Add Meeting</h1>
            <form onSubmit={this.addMeeting}>
                        <div className="form-group row">
                            <label  className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input onChange={this.updateValue} type="text" className="form-control" name="name" id="sequenceId" placeholder="" aria-describedby="sequenceHelpId" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label  className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-9">
                                <input  onChange={this.updateValue} type="text" className="form-control" name="description" id="name" placeholder=""  aria-describedby="NameHelpId" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label  className="col-sm-3 col-form-label">Date</label>
                            <div className="col-sm-9">
                                <input  onChange={this.updateValue} type="date" className="form-control" name="date" id="speaker" placeholder="" aria-describedby="speakerHelpId" /> 
                            </div>
                        </div>
                        <div className="form-group row">
                            <label id="startTime"  className="col-sm-3 col-form-label">startTime</label>
                            <div className="col-sm-9">
                                <input  onChange={this.updateValue} type="number" className="form-control" name="shours" id="startTime" placeholder="hours" aria-describedby="durationHelpId" />
                                <input  onChange={this.updateValue} type="number" className="form-control" name="sminutes" id="startTime    " placeholder="minutes" aria-describedby="durationHelpId" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label  id="endTime" className="col-sm-3 col-form-label">endTime</label>
                            <div className="col-sm-9">
                                <input  onChange={this.updateValue} type="number" className="form-control" name="ehours" id="endTime" placeholder="hours" aria-describedby="durationHelpId" />
                                <input onChange={this.updateValue}  type="number" className="form-control" name="eminutes" id="endTime" placeholder="minutes" aria-describedby="durationHelpId" />
                            </div>
                        </div>
                        
                        
                        <div className="form-group row">
                            <div className="offset-sm-3 col-sm-9">
                                <button type="submit" className="btn btn-primary mr-2">Add Meeting</button>
                            </div>
                        </div>
                    </form>
        </div>
        );
    }
    componentDidUpdate(prevP,prevS){
        if(prevS.values!==this.state.values)
        return axios.get("http://localhost:3000/meeting")
    }
  
}

export default AddMeeting;