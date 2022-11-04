import ReactDOM from 'react-dom';
import './css/styles.css';
import './css/semantic/dist/semantic.min.css';
import NewTimer from './Components/NewTimer';

class App extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Home>
        { <div id="main" className="main ui">
            <h1 className="ui centered custom-h1">Timers</h1>
          <TimerWrapper/>
          <NewTimer/>
          <Home/>
        </div> }
        { <div id="main" className="main u">
            <h1 className="ui centered custom-h1">NewTimer</h1>
          <NewTimer/>
        </div> }
  
      </Home>
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('content'));