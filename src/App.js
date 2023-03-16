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
  const [currentView, setCurrentView] = useState('');
  
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
      fetch('https://masterptn.org:3000/post-data/' + currentDateId, {
      // fetch('http://localhost:3001/post-data/' + currentDateId, {
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

  useEffect(() => {
    if (currentView === 'All') {
      fetch('https://masterptn.org:3000/get-data/')
      .then((res) => res.json())
      .then((data) => {
        setDaysExistingData(data);
        console.log(data);
    });
    }
  }, [currentView]);

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
    <Fragment>
      <DateBar receiveDate={DateHandler} receiveView={viewHandler} />
      {viewContent}
    </Fragment>
  );
}

export default App;
