import uuid from 'uuid';

export const tellTime = (elapsed,runningSince)=>{
  let totalTime = elapsed;
  if(runningSince){
    totalTime += Date.now() - runningSince;
  } 
  return millisecondsToHuman(totalTime);
}

function millisecondsToHuman(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
}

function pad(numberString, size) {
  let padded = numberString;
  while (padded.length < size) padded = `0${padded}`;
  return padded;
}

export const CreateNewTimer = (title,project) => {
  return {
    id:uuid.v4(),
    title : !title ? 'Title' : title,
    project : !project ? 'Project' : project,
    elapsed : 0,
    runningSince : null,
    edit:false
  }
} 