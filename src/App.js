import { Fragment, useState, useEffect } from 'react';
import './App.css';
import DateBar from './DateBar/DateBar';
import HabitsPanel from './HabitsPanel/HabitsPanel';
// import ScoreDisplay from './ScoreDisplay/ScoreDisplay';
import HabitsHistory from './HabitsHistory/HabitsHistory';

function App() {
  const [daysDataArray, setDaysDataArray] = useState([]);
  const [daySubmitted, setDaySubmitted] = useState(false);
  
  const submitDayHandler = (daySubmitData) => {
    console.log(daySubmitData);
    setDaySubmitted(true);
    daysDataArray.unshift(daySubmitData);
    setDaysDataArray(daysDataArray);
  }
  
  useEffect(() => {
    fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
      setDaysDataArray(data);
      console.log(data);
    });
  }, []);

  return (
    <Fragment>
      <DateBar />
      {!daySubmitted && <HabitsPanel onSubmitDay={submitDayHandler} />}
      {daySubmitted && <HabitsHistory data={daysDataArray} />}
    </Fragment>
  );
}

export default App;
