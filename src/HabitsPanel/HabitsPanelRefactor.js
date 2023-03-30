import { useState, useEffect} from 'react';
import NutritionRow from './NutritionRow';
import ExerciseRow from './ExerciseRow';
import MobilizeRow from './MobilizeRow';
import SleepRow from './SleepRow';
import HydrateRow from './HydrateRow';
import WellBeingRow from './WellBeingRow';
import ReflectRow from './ReflectRow';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';
// import TrackingRow from './TrackingRow';

const HabitsPanel = (props) => {
	let fetchUrl = 'https://masterptn.org:3000';
	const fetchUrlDev = 'http://localhost:3001';
	let devMode = true;   // edit for dev or prod server
 
	if (devMode) {
	  fetchUrl = fetchUrlDev;
	}

	const [score, setScore] = useState(0);
	const [submitState, setSubmitState] = useState(false);

	// checkbox control to set state on data load
	const [exerciseCheck, setExerciseCheck] = useState(false);
	// const [radio1Check, setRadio1Check] = useState(false);
	// const [radio2Check, setRadio2Check] = useState(false);
	const [mobilizeCheck, setMobilizeCheck] = useState(false);
	const [sleepCheck, setSleepCheck] = useState(false);
	const [hydrateCheck, setHydrateCheck] = useState(false);
	const [wellbeingCheck, setWellBeingCheck] = useState(false);
	const [reflectCheck, setReflectCheck] = useState(false);

	const [initExerciseNotes, setInitExerciseNotes] = useState('');
	const [initWellbeingNotes, setInitWellbeingNotes] = useState('');
	const [initReflectNotes, setInitReflectNotes] = useState('');
	const [initNutritionPoints, setInitNutritionPoints] = useState(5);
	const [initFoodArray, setInitFoodArray] = useState([]);
	const [nutritionPointsFetched, setNutritionPointsFetched] = useState(false);

	let dayData = {
		date: props.date,
		nutrition: 0,
		nutrition_noncompliant: {},
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
	}

	const scoreUpdateHandler = (points) => {
		console.log('adding to score: ' + points);
		setScore((prev) => {
			return prev + points;
		});
		console.log('score: ' + score);
		console.log('score + points: ' + (score + points));
	}

	const submitHandler = (event) => {
		event.preventDefault();
		setSubmitState(true);
	};

	const submitResultsHandler = (key1, points, key2, data) => {
		// setDayData((prevData) => {
		// 	let newData = {...prevData};
		// 	if (key1 === 'exercise') {
		// 		newData.exercise = points;
		// 		newData.exercise_notes = data;
		// 	} else if (key1 === 'mobilize') {
		// 		newData.mobilize = points;
		// 	}
			
		// 	return {...newData};
		// });
		// let xyz = dayData;
		dayData['total'] = score;
		dayData[key1] = points;
		if (key2) {
			dayData[key2] = data;
		}
		// setDayData((prev) => {
		// 	return {...xyz};
		// });
		console.log('points: ' + points);
		console.log('data: ' + data);
		console.log(dayData);
		setSubmitState(false);	// stop infinite loop
		props.onSubmitDay(dayData); // pass day data to App.js
	};

	// fetch data for today's date
	useEffect(() => {
		if (props.date) {
			fetch(fetchUrl + '/get-data/' + props.date)
			.then((res) => res.json())
			.then((data) => {
				if (data.date) {
					console.log('entry exists');
					// setExistingDayData(data);
					// setScore(data.total);
					setInitNutritionPoints(data.nutrition);
					setNutritionPointsFetched(true);
					// setTempFoodArray(data.nutrition_noncompliant);
					setInitFoodArray(data.nutrition_noncompliant);
					// setIsFoodEntered(true);
					if (data.exercise) {
						// setExerciseScore(data.exercise);
						setExerciseCheck(true);
						// setRadio1Check(true);
						// setExerciseNotes(data.exercise_notes);
						setInitExerciseNotes(data.exercise_notes);
					}
					if (data.mobilize) {
						// setMobilizeScore(data.mobilize);
						setMobilizeCheck(true);
					}
					if (data.sleep) {
						// setSleepScore(data.sleep);
						setSleepCheck(true);
					}
					if (data.hydrate) {
						// setHydrateScore(data.hydrate);
						setHydrateCheck(true);
					}
					if (data.wellbeing) {
						// setWellBeingScore(data.wellbeing);
						setWellBeingCheck(true);
						// setWebllBeingNotes(data.wellbeing_notes);
						setInitWellbeingNotes(data.wellbeing_notes);
					}
					if (data.reflect) {
						// setReflectScore(data.reflect);
						setReflectCheck(true);
						// setReflectNotes(data.reflect_notes);
						setInitReflectNotes(data.reflect_notes);
					}
				} else {
					console.log('entry not found');
				}

				console.log('getting current date:');
				console.log(data);
			});
		}
	}, [props.date, fetchUrl]);

	return (
		<form onSubmit={submitHandler} className='row mt-3'>
			<NutritionRow 
				isFormSubmitted={submitState} 
				onSubmitResults={submitResultsHandler}
				initPoints={initNutritionPoints}
				initFoodArray={initFoodArray}
				arePointsFetched={nutritionPointsFetched}
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
			<button type="submit" className='btn btn-primary'>Submit</button>
			<ScoreDisplay score={score} />
		</form>
	);
}

export default HabitsPanel;