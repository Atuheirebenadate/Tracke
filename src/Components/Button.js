import React, {Component} from 'react';

class Button extends Component{
  constructor(props){
    super(props);
  }
  onClickHandle = () => {
    this.props.onButtonClick();
  }
  render(){
    const {clickedState, runningSince} = this.props;
    const button = runningSince ? (
        <div onClick = {this.onClickHandle} className="ui red bottom attached button">Stop</div>
      ):(
        <div onClick = {this.onClickHandle} className="ui blue bottom attached button">Start</div>
      );
    return(
      <>{button}</>
    );
  }
}

export default Button;