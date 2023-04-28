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
  // const [currentDateSelected, setCurrentDateSelected] = useState('');

  let fetchUrl = 'https://masterptn.org:3000';
  const fetchUrlDev = 'http://localhost:3001';
  let devMode = true;   // edit for dev or prod server

  if (devMode) {
    fetchUrl = fetchUrlDev;
  }
  

  // === Handlers ===
  
  const submitDayHandler = (daySubmitData) => {
    console.log(daySubmitData);
    setDaySubmitted(true);
    setDaysDataObject(daySubmitData);
  }
  
  const dateHandler = (dateId) => {
    console.log('in app.js ' + dateId);
    setCurrentDateId(dateId);
  };

  const viewHandler = (viewValue) => {
    console.log('in app.js' + viewValue);
    setCurrentView(viewValue);
  };

  // const selectedDateHandler = (dateId) => {
  //   console.log('in app.js' + dateId);
  //   setCurrentDateSelected(dateId);
  //   setCurrentDateId(dateId);
  // };

  // === Effects ===

  // useEffect(() => {
  //   fetch('http://localhost:3001/api')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDaysDataObject(data);
  //       console.log(data);
  //   });
  // }, []);
  
  // Post entry with specified date
  useEffect(() => {
    if (Object.keys(daysDataObject).length !== 0) {
      console.log('POSTING to currentDateId: ' + currentDateId);
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

  // Fetch all entries
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

  let viewContent = '';
  if (currentView === 'All') {
    viewContent = <HabitsHistory data={daysExistingData} />;
  } else if (daySubmitted) {
    viewContent = <div><p>Congrats! You submitted</p><HabitsHistory data={[daysDataObject]} /></div>;
  } else {
    viewContent = <HabitsPanel onSubmitDay={submitDayHandler} date={currentDateId} />;
  }

  return (
    <div className='container'>
      <DateBar 
        receiveDate={dateHandler} 
        receiveView={viewHandler} 
        receiveDateSelected={dateHandler}
      />
      {viewContent}
    </div>
  );
}

export default App;
