import React, {Component} from 'react';
import TimerList from './TimerList';
import AddTimer from './AddTimer';
import {CreateNewTimer} from '../helpers/helper';
import axios from 'axios';

class TimerWrapper extends Component{
  constructor(props){
    super(props);
    this.state = {
      timers : []
    }
  }

  componentDidMount(){
    axios.get('/api/timers').then(({data})=>{
        this.setState({timers:data});
    }).catch(e => console.log(e));
  }

  handleButtonClick = (ButtonState,id) => {
    let prevStateBtn = "";
    const now = Date.now();
    this.setState((prevState)=>{
      const currentState = prevState.timers.map((timer)=>{
        if(!ButtonState){
          prevStateBtn = 'start';
          axios.post('/api/timer/start',{id:id, start:now})
            .then(res => console.log(res.data.success))
            .catch(e => console.log(e + `from ${prevStateBtn}`));
          console.log("START pressed from local");
          if(id === timer.id){
            timer.runningSince = now;
          }
        }
        else{
          prevStateBtn = 'stop';
          console.log("STOP Pressed from local");
          axios.post('/api/timer/stop',{id:id, stop:now})
            .then(res => console.log(res.data.success))
            .catch(e => console.log(e + `from ${prevStateBtn}`));
          if(id === timer.id){
            const totalElapsed = timer.elapsed + now - timer.runningSince;
            timer.elapsed = totalElapsed;
            timer.runningSince = null;
          }
        }
      });
      return{
        timer:currentState
      }
    })
  }

  handleCreateTimer = (title,project) => {
    const t = CreateNewTimer(title,project);
    this.setState((prevState)=>{
      prevState.timers.push(t);
      return{
        timers : prevState.timers
      }
    })

    axios.post('/api/timer',{timer:t})
      .then(res=>console.log(res.data.success))
      .catch(e => console.log(e));
  }

  handleDeleteTimer = (id) => {
    this.setState((prevState)=>{
      const currentState = prevState.timers.filter((t)=>t.id !== id);
      return{
        timers:currentState
      }
    });

    axios.delete('/api/timer',{data:{id:id}}).then(res => 
      console.log(res.data.success)
    ).catch(e => console.log(e));
  }

  handleEditFormToggle = (id) => {
    console.log('edit timer with id = '+id);
    this.setState((prevState)=>{
      prevState.timers.map((timer)=>{
        if(timer.id === id){
          timer.edit = !timer.edit;
        }
      });
      return{
        timers:prevState.timers
      }
    });
  }

  handleUpdateTimer = (title,project,id) => {
    // console.log('edit timer with id = '+id);
    this.setState((prevState)=>{
      prevState.timers.map((timer)=>{
        if(timer.id === id){
          timer.edit = !timer.edit;
          timer.title = title;
          timer.project = project;
        }
      });
      return{
        timers:prevState.timers
      }
    });

    axios.put('/api/timer',{timer:{id,title,project}})
      .then(res => {
        console.log(res.data.success);
      }).catch(e=>console.log(e));
  }

  render(){
    return(
      <div className="ui centered three column grid">
        <div className="cloumn">
         <TimerList 
          ToggleStartStop={this.handleButtonClick} 
          timers={this.state.timers}
          deleteTimer={this.handleDeleteTimer}
          onEditFormToggle={this.handleEditFormToggle}
          updateTimer={this.handleUpdateTimer}
        />
         <AddTimer createTimer = {this.handleCreateTimer} />
        </div>
      </div>
    );
  }
}

export default TimerWrapper;
