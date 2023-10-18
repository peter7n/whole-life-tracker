import { useState, useEffect } from 'react';
import NutritionRow from './NutritionRow';
import ExerciseRow from './ExerciseRow';
import MobilizeRow from './MobilizeRow';
import SleepRow from './SleepRow';
import HydrateRow from './HydrateRow';
import WellBeingRow from './WellBeingRow';
import ReflectRow from './ReflectRow';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';
import styles from './HabitsPanel.module.css';
import devMode from '../devMode';
// import deployVer from '../deployVer';

const HabitsPanel = (props) => {
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

	let dayData = {
		date: props.date,
		nutrition: 0,
		nutrition_noncompliant: [],
		exercise: 0,
		exercise_notes: '',
		mobilize: 0,
		sleep: 0,
		hydrate: 0,
		wellbeing: 0,
		wellbeing_notes: '',
		reflect: 0,
		reflect_notes: '',
		total: 0
	};

	// === States ===

	const [score, setScore] = useState(0);
	const [submitState, setSubmitState] = useState(false);

	// checkbox control to set state on data load
	const [exerciseCheck, setExerciseCheck] = useState({ checkState: false });
	// const [radio1Check, setRadio1Check] = useState(false);
	// const [radio2Check, setRadio2Check] = useState(false);
	const [mobilizeCheck, setMobilizeCheck] = useState({ checkState: false });
	const [sleepCheck, setSleepCheck] = useState({ checkState: false });
	const [hydrateCheck, setHydrateCheck] = useState({ checkState: false });
	const [wellbeingCheck, setWellBeingCheck] = useState({ checkState: false });
	const [reflectCheck, setReflectCheck] = useState({ checkState: false });

	const [initExerciseNotes, setInitExerciseNotes] = useState('');
	const [initWellbeingNotes, setInitWellbeingNotes] = useState('');
	const [initReflectNotes, setInitReflectNotes] = useState('');

	const [initNutritionPoints, setInitNutritionPoints] = useState(5);
	const [initFoodArray, setInitFoodArray] = useState([]);
	// const [nutritionPointsFetched, setNutritionPointsFetched] = useState(false);

	// === Handlers ===

	const scoreUpdateHandler = (points) => {
		// console.log('1. current score: ' + score);
		// console.log('2. adding to score: ' + points);
		// console.log('3. score + points: ' + (score + points));
		setScore((prev) => {
			return prev + points;
		});
		// console.log('4. new score: ' + score);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		setSubmitState(true);
	};

	const submitResultsHandler = (key1, points, key2, data) => {
		dayData['total'] = score;
		dayData[key1] = points;
		if (key2) {
			dayData[key2] = data;
		}
		console.log('points: ' + points);
		console.log('data: ' + data);
		console.log(dayData);
		setSubmitState(false);	// stop infinite loop
		props.onSubmitDay(dayData); // pass day data to App.js
		// Reset score
		setScore(0);
	};

	// === Effects ===

	// Fetch data for today's date
	const dateVal = props.date;

	useEffect(() => {
		let getPath = '/get-data/';
		if (deployVer === 2) {
		 getPath = '/get-data-2/';
		} 

		if (dateVal) {
			console.log('fetching ' + dateVal);
			fetch(fetchUrl + getPath + dateVal)
			.then((res) => res.json())
			.then((data) => {
				if (data.date) {
					console.log('entry exists');
					console.log('RESETTING total score to 0');
					setScore(0);

					setInitNutritionPoints(data.nutrition);
					// setNutritionPointsFetched(true);
					setInitFoodArray(data.nutrition_noncompliant);
					if (data.exercise) {
						setExerciseCheck({ checkState: true });
						setInitExerciseNotes(data.exercise_notes);
					} else {
						setExerciseCheck({ checkState: false });
						setInitExerciseNotes('');
					}
					if (data.mobilize) {
						setMobilizeCheck({ checkState: true });
					} else {
						setMobilizeCheck({ checkState: false });
					}
					if (data.sleep) {
						setSleepCheck({ checkState: true });
					} else {
						setSleepCheck({ checkState: false });
					}
					if (data.hydrate) {
						setHydrateCheck({ checkState: true });
					} else {
						setHydrateCheck({ checkState: false });
					}
					if (data.wellbeing) {
						setWellBeingCheck({ checkState: true });
						setInitWellbeingNotes(data.wellbeing_notes);
					} else {
						setWellBeingCheck({ checkState: false });
						setInitWellbeingNotes('');
					}
					if (data.reflect) {
						setReflectCheck({ checkState: true });
						setInitReflectNotes(data.reflect_notes);
					} else {
						setReflectCheck({ checkState: false });
						setInitReflectNotes('');
					}
				} else {
					console.log('entry not found');
					// Reset all values
					setInitNutritionPoints(5);
					// setNutritionPointsFetched(false);
					setInitFoodArray([]);
					setExerciseCheck({ checkState: false });
					setInitExerciseNotes('');
					setMobilizeCheck({ checkState: false });
					setSleepCheck({ checkState: false });
					setHydrateCheck({ checkState: false });
					setWellBeingCheck({ checkState: false });
					setInitWellbeingNotes('');
					setReflectCheck({ checkState: false });
					setInitReflectNotes('');
					setScore(0);
				}

				console.log('getting date: ' + dateVal);
				console.log(data);
			});
		}
	}, [dateVal, fetchUrl, deployVer]);

	return (
		<form onSubmit={submitHandler} className='mt-3'>
			<NutritionRow 
				isFormSubmitted={submitState} 
				onSubmitResults={submitResultsHandler}
				initPoints={initNutritionPoints}
				initFoodArray={initFoodArray}
				// arePointsFetched={nutritionPointsFetched}
				onScoreUpdate={scoreUpdateHandler}
			/>
			<ExerciseRow 
				isFormSubmitted={submitState} 
				onSubmitResults={submitResultsHandler}
				initChecked={exerciseCheck}
				initTextArea={initExerciseNotes}
				onScoreUpdate={scoreUpdateHandler}
			/>
			<MobilizeRow 
				isFormSubmitted={submitState} 
				onSubmitResults={submitResultsHandler}
				initChecked={mobilizeCheck}
				onScoreUpdate={scoreUpdateHandler}
			/>
			<SleepRow 
				isFormSubmitted={submitState} 
				onSubmitResults={submitResultsHandler}
				initChecked={sleepCheck}
				onScoreUpdate={scoreUpdateHandler}
			/>
			<HydrateRow 
				isFormSubmitted={submitState} 
				onSubmitResults={submitResultsHandler}
				initChecked={hydrateCheck}
				onScoreUpdate={scoreUpdateHandler}
			/>
			<WellBeingRow 
				isFormSubmitted={submitState} 
				onSubmitResults={submitResultsHandler} 
				initChecked={wellbeingCheck}
				initTextArea={initWellbeingNotes} 
				onScoreUpdate={scoreUpdateHandler}
			/>
			<ReflectRow 
				isFormSubmitted={submitState} 
				onSubmitResults={submitResultsHandler} 
				initChecked={reflectCheck}
				initTextArea={initReflectNotes} 
				onScoreUpdate={scoreUpdateHandler}
			/>
			<div className='text-center'><button type="submit" className={`btn btn-secondary ${styles.submit}`}>Submit</button></div>
			<ScoreDisplay score={score} />
		</form>
	);
}

export default HabitsPanel;