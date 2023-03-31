import { useState, useEffect } from 'react';
import './App.css';
import DateBar from './DateBar/DateBar';
import HabitsPanel from './HabitsPanel/HabitsPanel';
// import HabitsPanel from './HabitsPanel/HabitsPanel';
// import ScoreDisplay from './ScoreDisplay/ScoreDisplay';
import HabitsHistory from './HabitsHistory/HabitsHistory';

function App() {
  const [daysDataObject, setDaysDataObject] = useState({});
  const [daysExistingData, setDaysExistingData] = useState({});
  const [daySubmitted, setDaySubmitted] = useState(false);
  const [currentDateId, setCurrentDateId] = useState('');
  const [currentView, setCurrentView] = useState('');

  let fetchUrl = 'https://masterptn.org:3000';
  const fetchUrlDev = 'http://localhost:3001';
  let devMode = true;   // edit for dev or prod server

  if (devMode) {
    fetchUrl = fetchUrlDev;
  }
  
  const submitDayHandler = (daySubmitData) => {
    console.log(daySubmitData);
    setDaySubmitted(true);
    setDaysDataObject(daySubmitData);
  }
  
  // useEffect(() => {
  //   fetch('http://localhost:3001/api')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDaysDataObject(data);
  //       console.log(data);
  //   });
  // }, []);

  // post entry with specified date
  useEffect(() => {
    if (Object.keys(daysDataObject).length !== 0) {
      fetch(fetchUrl + '/post-data/' + currentDateId, {
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
  }, [daysDataObject, currentDateId, fetchUrl]);

  // fetch all entries
  useEffect(() => {
    if (currentView === 'All') {
      fetch(fetchUrl + '/get-data/')
      .then((res) => res.json())
      .then((data) => {
        setDaysExistingData(data);
        console.log(data);
    });
    }
  }, [currentView, fetchUrl]);

  const DateHandler = (dateId) => {
    console.log('in app.js ' + dateId);
    setCurrentDateId(dateId);
  };

  const viewHandler = (viewValue) => {
    console.log('in app.js' + viewValue);
    setCurrentView(viewValue);
  };

  let viewContent = '';
  if (currentView === 'All') {
    viewContent = <HabitsHistory data={daysExistingData} />;
  } else if (daySubmitted) {
    viewContent = <p>Congrats! You submitted</p>;
  } else {
    viewContent = <HabitsPanel onSubmitDay={submitDayHandler} date={currentDateId} />;
  }

  return (
    <div className='container'>
      <DateBar receiveDate={DateHandler} receiveView={viewHandler} />
      {viewContent}
    </div>
  );
}

export default App;
