import { useState, useEffect } from 'react';
import './App.css';
import DateBar from './DateBar/DateBar';
import HabitsPanel from './HabitsPanel/HabitsPanel';
// import HabitsPanel from './HabitsPanel/HabitsPanel';
// import ScoreDisplay from './ScoreDisplay/ScoreDisplay';
import HabitsHistory from './HabitsHistory/HabitsHistory';
import devMode from './devMode';

function App() {
  const [daysDataObject, setDaysDataObject] = useState({});
  const [daysExistingData, setDaysExistingData] = useState({});
  const [daySubmitted, setDaySubmitted] = useState(false);
  const [currentDateId, setCurrentDateId] = useState('');
  const [currentView, setCurrentView] = useState('');
  // const [currentDateSelected, setCurrentDateSelected] = useState('');

  // Set development mode
  let fetchUrl = 'https://masterptn.org:3000';
  const fetchUrlDev = 'http://localhost:3001';
  if (devMode) {
    fetchUrl = fetchUrlDev;
  }
  
  // Set deploy version
  let deployVer = 1;
  const pathArray = window.location.pathname.split('/');
  const segment1 = pathArray[1];
  if (segment1 === 'ptn-wlc') {
    deployVer = 2;
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
    // Set view to edit mode
    setCurrentView('Select an Option');
  };

  const viewHandler = (viewValue) => {
    console.log('in app.js: ' + viewValue);
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
    let postPath = '/post-data/';
    if (deployVer === 2) {
      console.log('DEPLOY VER = 2');
      postPath = '/post-data-2/';
    }
    
    if (Object.keys(daysDataObject).length !== 0 && daySubmitted === true) {
      console.log('POSTING to currentDateId: ' + currentDateId);
      fetch(fetchUrl + postPath + currentDateId, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(daysDataObject)
    })
      .then((res) => res.json())
      .then ((data) => {
        console.log('Success', data);
        setDaysExistingData(data);
        // Reset entry submitted state
        setDaySubmitted(false);
        setCurrentView('Success');
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    }
  }, [daysDataObject, currentDateId, fetchUrl, daySubmitted, deployVer]);

  // Fetch all entries
  useEffect(() => {
    let getPath = '/get-data/';
    if (deployVer === 2) {
      getPath = '/get-data-2/';
    }

    if (currentView === 'All') {
      fetch(fetchUrl + getPath)
      .then((res) => res.json())
      .then((data) => {
        setDaysExistingData(data);
        console.log('GETTING ALL DATA');
        console.log(data);
      });
    }
  }, [currentView, fetchUrl, deployVer]);

  let viewContent = '';
  if (currentView === 'All') {
    viewContent = <HabitsHistory data={daysExistingData} />;
  } else if (currentView === 'Success') {
    viewContent = <div><p>Congrats! You submitted</p><HabitsHistory data={[daysDataObject]} /></div>;
  } else {
    viewContent = <HabitsPanel onSubmitDay={submitDayHandler} date={currentDateId} />;
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Whole Life Tracker</h1>
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
