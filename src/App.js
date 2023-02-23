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
    setDaysDataArray((prevArray) => {
      return [daySubmitData, ...prevArray];
    })
    // daysDataArray.unshift(daySubmitData);
    // setDaysDataArray(daysDataArray);
  }
  
  // useEffect(() => {
  //   fetch('http://localhost:3001/api')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDaysDataArray(data);
  //       console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    console.log(daysDataArray.length);
    if (daysDataArray.length > 0) {
      fetch('http://localhost:3001/post', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(daysDataArray)
    })
      .then((res) => res.json())
      .then ((data) => {
        console.log('Success', data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
      // .then()
      // .catch(err);
    }
  }, [daysDataArray]);

  return (
    <Fragment>
      <DateBar />
      {!daySubmitted && <HabitsPanel onSubmitDay={submitDayHandler} />}
      {daySubmitted && <HabitsHistory data={daysDataArray} />}
    </Fragment>
  );
}

export default App;
