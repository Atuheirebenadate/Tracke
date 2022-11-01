import React, {Component} from 'react';
import Timer from './Timer';
//import Zoom from 'react-reveal/Zoom';
//import {TransitionGroup} from 'react-transition-group';

class TimerList extends Component{
  constructor(props){
    super(props);
    this.state={
      timers:[],
    }
  }

  componentDidMount(){
    const timers = this.props.timers;
    this.setState({timers:timers});
  }

  onButtonClick = (ButtonState, id)=>{
    this.props.ToggleStartStop(ButtonState,id);
  }

  onEditFormToggle = (id) => {
    this.props.onEditFormToggle(id);
  }

  render(){
    const timer = this.props.timers.map((timer)=>{
      const {title,project,elapsed,id,runningSince,edit} = timer;
      return(
        //<Zoom key={id} collapse>
        <Timer 
          title={title} 
          project={project} 
          elapsed={elapsed}
          id={id}
          key={id}
          edit={edit}
          runningSince={runningSince}
          handleButtonClick={this.onButtonClick}
          onEditFormToggle={this.onEditFormToggle}
          deleteTimer={this.props.deleteTimer}
          updateTimer={this.props.updateTimer}
        />//</Zoom>
      );
    });
    return(
      <>{timer}</>
    );
  }
}

export default TimerList;