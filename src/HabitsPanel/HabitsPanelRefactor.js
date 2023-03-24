import { useState, useEffect} from 'react';
// import NutritionRow from './NutritionRow';
import ExerciseRow from './ExerciseRow';
// import MobilizeRow from './MobilizeRow';
// import SleepRow from './SleepRow';
// import HydrateRow from './HydrateRow';
// import WellBeingRow from './WellBeingRow';
// import ReflectRow from './ReflectRow';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';
import TrackingRow from './TrackingRow';

const HabitsPanel = (props) => {
	let fetchUrl = 'https://masterptn.org:3000';
	const fetchUrlDev = 'http://localhost:3001';
	let devMode = true;   // edit for dev or prod server
 
	if (devMode) {
	  fetchUrl = fetchUrlDev;
	}
	const [nutritionScore, setNutritionScore] = useState(5);
	const [nutritionFoodArray, setNutritionFoodArray] = useState([]);
	const [exerciseScore, setExerciseScore] = useState(0);
	const [exerciseNotes, setExerciseNotes] = useState('');
	const [mobilizeScore, setMobilizeScore] = useState(0);
	const [sleepScore, setSleepScore] = useState(0);
	const [hydrateScore, setHydrateScore] = useState(0);
	const [wellBeingScore, setWellBeingScore] = useState(0);
	const [wellBeingNotes, setWebllBeingNotes] = useState('');
	const [reflectScore, setReflectScore] = useState(0);
	const [reflectNotes, setReflectNotes] = useState('');

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

	// const [existingDayData, setExistingDayData] = useState({});
	
	// Specific states for Nutrition tracker
	// const [tempFoodArray, setTempFoodArray] = useState([]);
	// const [nutritionPoints, setNutritionPoints] = useState(5);
	const [isFoodEntered, setIsFoodEntered] = useState(false);

	const scoreUpdateHandler = (habit, points, data) => {
		if (habit === 'Nutrition') {
			setNutritionScore(nutritionScore + points);
		} else if (habit === 'Exercise') {
			setExerciseScore(exerciseScore + points);
			setExerciseNotes(data);
			// setRadio1Check(data.radio1);
			// setRadio2Check(data.radio2);
		} else if (habit === 'Mobilize') {
			setMobilizeScore(mobilizeScore + points);
		} else if (habit === 'Sleep') {
			setSleepScore(sleepScore + points);
		} else if (habit === 'Hydrate') {
			setHydrateScore(hydrateScore + points);
		} else if (habit === 'Well-Being') {
			setWellBeingScore(wellBeingScore + points);
			setWebllBeingNotes(data);
		} else if (habit === 'Reflect') {
			setReflectScore(reflectScore + points);
			setReflectNotes(data);
		} 
	}

	const submitHandler = (event) => {
		event.preventDefault();
		setSubmitState(true);
		
		// const totalScore = nutritionScore + exerciseScore + mobilizeScore + sleepScore + hydrateScore + wellBeingScore + reflectScore;
		// const dayData = {
		// 	date: props.date,
		// 	nutrition: nutritionScore,
		// 	nutrition_noncompliant: nutritionFoodArray,
		// 	exercise: exerciseScore,
		// 	exercise_notes: exerciseNotes,
		// 	mobilize: mobilizeScore,
		// 	sleep: sleepScore,
		// 	hydrate: hydrateScore,
		// 	wellbeing: wellBeingScore,
		// 	wellbeing_notes: wellBeingNotes,
		// 	reflect: reflectScore,
		// 	reflect_notes: reflectNotes,
		// 	total: totalScore
		// }
		// props.onSubmitDay(dayData); //pass day data to App.js
	};

	// const initDayData = {
	// 	date: props.date,
	// 	nutrition: 0,
	// 	nutrition_noncompliant: {},
	// 	exercise: 0,
	// 	exercise_notes: '',
	// 	mobilize: 0,
	// 	sleep: 0,
	// 	hydrate: 0,
	// 	wellbeing: 0,
	// 	wellbeing_notes: '',
	// 	reflect: 0,
	// 	reflect_notes: '',
	// 	total: 0
	// }

	const [dayData, setDayData] = useState({
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
	});
	
	const submitResultsHandler = (key1, points, key2, data) => {
		// setDayData((prevData) => {
			// const newData = {...prevData};
			// newData.exercise = points;
			// newData.exercise_notes = data;
		// 	return {...prevData};
		// });
		// setDayData({new: 'new'});
		console.log('result: ' + points);
		console.log('result: ' + data);
		console.log(dayData);
	};

	const nutritionAddHandler = (pointsSelected, enteredFood) => {
		let foodEntry = {
			points: pointsSelected,
			food: enteredFood
		};
		// let updatedArray = [...tempFoodArray, foodEntry];
		// let updatedPoints = nutritionPoints + +pointsSelected;

		// setTempFoodArray((prevFoodArray) => {
		// 	return [...prevFoodArray, foodEntry];
		// });
		// setNutritionPoints(updatedPoints);
		setNutritionFoodArray((prevArr) => {
			return [...prevArr, foodEntry];
		});
		scoreUpdateHandler('Nutrition', +pointsSelected);

		setIsFoodEntered(true);
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
					setNutritionScore(data.nutrition);
					// setTempFoodArray(data.nutrition_noncompliant);
					setNutritionFoodArray(data.nutrition_noncompliant);
					setIsFoodEntered(true);
					if (data.exercise) {
						setExerciseScore(data.exercise);
						setExerciseCheck(true);
						// setRadio1Check(true);
						setExerciseNotes(data.exercise_notes);
						setInitExerciseNotes(data.exercise_notes);
					}
					if (data.mobilize) {
						setMobilizeScore(data.mobilize);
						setMobilizeCheck(true);
					}
					if (data.sleep) {
						setSleepScore(data.sleep);
						setSleepCheck(true);
					}
					if (data.hydrate) {
						setHydrateScore(data.hydrate);
						setHydrateCheck(true);
					}
					if (data.wellbeing) {
						setWellBeingScore(data.wellbeing);
						setWellBeingCheck(true);
						setWebllBeingNotes(data.wellbeing_notes);
						setInitWellbeingNotes(data.wellbeing_notes);
					}
					if (data.reflect) {
						setReflectScore(data.reflect);
						setReflectCheck(true);
						setReflectNotes(data.reflect_notes);
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

	console.log('food array:' + nutritionFoodArray.length);
	console.log(nutritionFoodArray);
	if (nutritionFoodArray.length) {
		console.log('true');
	} else {
		console.log('false');
	}

	return (
		<form onSubmit={submitHandler}>
			<TrackingRow 
				name="Nutrition"
				select={ {show: true, label: 'Pts', id: 'nutrition-select', value: '-1'} }
				text={ {show: true, label: 'Food', id: 'nutrition-text'} }
				button= { {show: true, label: 'Add'} }
				buttonOnClick = {nutritionAddHandler}
				onScoreUpdate={scoreUpdateHandler}
				np={nutritionScore}
			/>
			<div className='row'>
				<div className='col'>
					<div className='card'>
						<ul className="list-group list-group-flush">
							{isFoodEntered && nutritionFoodArray.map((item, i) => 
								<li className='list-group-item' key={i}>{item.points} {item.food}</li>
							)}
						</ul>
					</div>
				</div>
			</div>

			<ExerciseRow onScoreUpdate={scoreUpdateHandler} isFormSubmitted={submitState} onSubmitResults={submitResultsHandler} />

			{/* <TrackingRow
				name="Exercise"
				radio={ {show: true, name: 'exercise-radio', label1: 'Yes', label2: 'No', id1: 'yes', id2: 'no', initRadio1: radio1Check, initRadio2: radio2Check} }
				textarea={ {show: true, label: 'Notes', id: 'exercise-text', initTextArea: initExerciseNotes} }
				onScoreUpdate={scoreUpdateHandler} 
				np={exerciseScore}
			/>			 */}
			{/* <TrackingRow
				name="Exercise"
				checkbox={ {show: true, label: 'Accomplished', id: 'exercise-check', initChecked: exerciseCheck} }
				textarea={ {show: true, label: 'Notes', id: 'exercise-text', initTextArea: initExerciseNotes} }
				onScoreUpdate={scoreUpdateHandler} 
				np={exerciseScore}
			/>			 */}
			<TrackingRow
				name="Mobilize"
				checkbox={ {show: true, label: 'Accomplished', id: 'mobilize-check', initChecked: mobilizeCheck} }
				onScoreUpdate={scoreUpdateHandler} 
				np={mobilizeScore}
			/>			
			<TrackingRow
				name="Sleep"
				checkbox={ {show: true, label: 'Accomplished', id: 'sleep-check', initChecked: sleepCheck} }
				onScoreUpdate={scoreUpdateHandler} 
				np={sleepScore}
			/>			
			<TrackingRow
				name="Hydrate"
				checkbox={ {show: true, label: 'Accomplished', id: 'hydrate-check', initChecked: hydrateCheck} }
				onScoreUpdate={scoreUpdateHandler} 
				np={hydrateScore}
			/>
			<TrackingRow
				name="Well-Being"
				checkbox={ {show: true, label: 'Accomplished', id: 'well-being-check', initChecked: wellbeingCheck} }
				textarea={ {show: true, label: 'Notes', id: 'well-being-text', initTextArea: initWellbeingNotes} }
				onScoreUpdate={scoreUpdateHandler} 
				np={wellBeingScore}
			/>
			<TrackingRow
				name="Reflect"
				checkbox={ {show: true, label: 'Accomplished', id: 'reflect-check', initChecked: reflectCheck} }
				textarea={ {show: true, label: 'Notes', id: 'reflect-text', initTextArea: initReflectNotes} }
				onScoreUpdate={scoreUpdateHandler} 
				np={reflectScore}
			/>
			<button type="submit" className='btn btn-primary'>Submit</button>
			<ScoreDisplay score={nutritionScore + exerciseScore + mobilizeScore + sleepScore + hydrateScore + wellBeingScore + reflectScore} />
		</form>
	);
}

export default HabitsPanel;