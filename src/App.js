import { Fragment, useState, useEffect } from 'react';
import './App.css';
import DateBar from './DateBar/DateBar';
import HabitsPanel from './HabitsPanel/HabitsPanel';
// import ScoreDisplay from './ScoreDisplay/ScoreDisplay';
import HabitsHistory from './HabitsHistory/HabitsHistory';

function App() {
  const [daysDataObject, setDaysDataObject] = useState({});
  const [daysExistingData, setDaysExistingData] = useState({});
  const [daySubmitted, setDaySubmitted] = useState(false);
  const [currentDateId, setCurrentDateId] = useState('');
  
  const submitDayHandler = (daySubmitData) => {
    console.log(daySubmitData);
    setDaySubmitted(true);
    setDaysDataObject(daySubmitData);
    // daysDataObject.unshift(daySubmitData);
    // setDaysDataObject(daysDataObject);
  }
  
  // useEffect(() => {
  //   fetch('http://localhost:3001/api')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDaysDataObject(data);
  //       console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    if (Object.keys(daysDataObject).length !== 0) {
      fetch('http://localhost:3001/post/' + currentDateId, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(daysDataObject)
    })
      .then((res) => res.json())
      .then ((data) => {
        console.log('Success', data);
        setDaysExistingData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    }
  }, [daysDataObject, currentDateId]);

  const DateHandler = (dateId) => {
    console.log('in app.js ' + dateId);
    setCurrentDateId(dateId);
  }

  return (
    <Fragment>
      <DateBar receiveDate={DateHandler} />
      {!daySubmitted && <HabitsPanel onSubmitDay={submitDayHandler} date={currentDateId} />}
      {daySubmitted && <HabitsHistory data={daysExistingData} />}
    </Fragment>
  );
}

export default App;
