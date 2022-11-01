import React, {Component} from 'react';

class NewTimer extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : '',
      project : ''
    }
  }

  componentDidMount(){
    if(this.props.timer){
      const {title,project} = this.props.timer;
      this.setState({
        title,project
      })
    }
  }

  handleChange = (e) => {
    const {value,name} = e.target;
    this.setState({
      [name] : value
    })
  }

  handleSubmit = () => {
    const {title,project} = this.state;

    //edit
    if(this.props.timer){
      this.props.updateTimer(title,project,this.props.timer.id);
      // this.props.toggle();
    }

    //create
    else{
      this.props.createTimer(title,project);
      this.props.goBack();
      }
  }

  handleCancel = () => {
    //edit
    if(this.props.timer){
      this.props.toggle();
    }

    //create
    else{
      this.props.goBack();
    }
  }

  render(){
    const submitText = this.props.timer ? 'Update' : 'Create';
    return(
      <div className='ezi ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input
                type='text'
                name='title'
                placeholder="Enter your title here!"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className='field'>
              <label>Project</label>
              <input
                type='text'
                name='project'
                placeholder="Enter your Project Name here!"
                value={this.state.project}
                onChange={this.handleChange}
              />
            </div>
            <div className='ui buttons'>
              <button
                className='ui green button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className='ui button'
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default NewTimer;
