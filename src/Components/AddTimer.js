import React, {Component} from 'react';
import NewTimer from './NewTimer';

class AddTimer extends Component {
  constructor(props){
    super(props)
    this.state = {
      openForm : false
    }
  }
  openTimerForm = () => {
    this.setState({
      openForm : !this.state.openForm
    })
  }
  createTimer = (title,project) => {
    this.props.createTimer(title,project);
  }
  render(){
    return(
      <div>
        {(!this.state.openForm) &&
          <button onClick={this.openTimerForm} className="ezi ui basic blue button icon" data-inverted="" data-tooltip="Add Timer" data-position="left center">
            <i className="ui blue plus icon"></i>
          </button>
        }
        {(this.state.openForm) &&
          <NewTimer
            toBeEditted={false}
            goBack={this.openTimerForm}
            createTimer={this.createTimer}
          />
        }
      </div>
    );
  }
}

export default AddTimer;