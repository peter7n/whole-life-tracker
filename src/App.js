import { Fragment } from 'react';
import './App.css';
import DateBar from './DateBar/DateBar';
import HabitsPanel from './HabitsPanel/HabitsPanel';
// import ScoreDisplay from './ScoreDisplay/ScoreDisplay';

function App() {
  return (
    <Fragment>
      <DateBar />
      <HabitsPanel />
    </Fragment>
  );
}

export default App;
