// import React, {Component} from 'react';
// import {tellTime} from '../helpers/helper'
// import Button from './Button';
// import NewTimer from './NewTimer';

// class Timer extends Component{
//   constructor(props){
//     super(props);
//   }
//   componentDidMount() {
//     this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
//   }
  
//   handleButtonClick = () =>{
//     this.props.handleButtonClick(!!this.props.runningSince,this.props.id);
//   }

//   handleTrashClick = () => {
//     this.props.deleteTimer(this.props.id)
//   }

//   handleEditClick = () => {
//     this.props.onEditFormToggle(this.props.id)
//   }

//   render(){
//     const elapsedString = tellTime(
//       this.props.elapsed, this.props.runningSince
//     );

//     const {title,project,runningSince,elapsed,edit,id} = this.props;
//     const timer = {title,project,runningSince,elapsed,edit,id};

//     return(
//       <>
//       {(!this.props.edit) &&
//         <div className='ui ezi card'>
//           <div className='content'>
//             <div className='left aligned header'>
//               {this.props.title}
//             </div>
//             <div className='left aligned meta'>
//               {this.props.project}
//             </div>
//             <div className='center aligned description'>
//               <h2>
//                 {elapsedString}
//               </h2>
//             </div>
//             <div className='extra content'>
//               <span
//                 className='right floated edit icon'
//                 onClick={this.handleEditClick}
//               >
//                 <i className='edit icon' />
//               </span>
//               <span
//                 className='right floated trash icon'
//                 onClick={this.handleTrashClick}
//               >
//                 <i className='trash icon' />
//               </span>
//             </div>
//           </div>
//           <Button 
//             runningSince = {!!this.props.runningSince}
//             onButtonClick = {this.handleButtonClick}
//           />
//         </div>
//       }
//       {this.props.edit &&
//         <NewTimer
//           updateTimer={this.props.updateTimer}
//           toggle={this.handleEditClick} 
//           toBeEditted={true} 
//           timer={timer} 
//         /> 
//       }
//       </>
//     );
//   }
// } 

// export default Timer;