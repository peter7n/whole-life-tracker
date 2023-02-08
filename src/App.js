import { Fragment } from 'react';
import './App.css';
import DateBar from './DateBar/DateBar';
import HabitsPanel from './HabitsPanel/HabitsPanel';
// import ScoreDisplay from './ScoreDisplay/ScoreDisplay';

function App() {
  const submitDayHandler = (dayData) => {
    console.log(dayData);
  }
  
  return (
    <Fragment>
      <DateBar />
      <HabitsPanel onSubmitDay={submitDayHandler} />
    </Fragment>
  );
}

export default App;
