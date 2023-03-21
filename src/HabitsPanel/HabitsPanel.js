import { useState, useEffect} from 'react';
// import NutritionRow from './NutritionRow';
// import ExerciseRow from './ExerciseRow';
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

	// checkbox control to set state on data load
	const [exerciseCheck, setExerciseCheck] = useState(false);
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
		const totalScore = nutritionScore + exerciseScore + mobilizeScore + sleepScore + hydrateScore + wellBeingScore + reflectScore;
		// let idDate = Date.now();
		const dayData = {
			// id: idDate,
			date: props.date,
			nutrition: nutritionScore,
			nutrition_noncompliant: nutritionFoodArray,
			exercise: exerciseScore,
			exercise_notes: exerciseNotes,
			mobilize: mobilizeScore,
			sleep: sleepScore,
			hydrate: hydrateScore,
			wellbeing: wellBeingScore,
			wellbeing_notes: wellBeingNotes,
			reflect: reflectScore,
			reflect_notes: reflectNotes,
			total: totalScore
		}
		props.onSubmitDay(dayData); //pass day data to App.js
	}

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

	const checkboxChangeHandler = (habit, state) => {
		switch (habit) {
			case 'Exercise':
				setExerciseCheck(state);
				break;
			case 'Mobilize':
				setMobilizeCheck(state);
				break;
			case 'Sleep':
				setSleepCheck(state);
				break;
			case 'Hydrate':
				setHydrateCheck(state);
				break;
			case 'Well-Being':
				setWellBeingCheck(state);
				break;
			case 'Reflect':
				setReflectCheck(state);
				break;
			default:
				throw new Error('Unhandled habit.');
		}
	}

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
			<div>
				{isFoodEntered && nutritionFoodArray.map((item, i) => 
					<p key={i}>{item.points} {item.food}</p>
				)}
			</div>
			<TrackingRow
				name="Exercise"
				checkbox={ {show: true, label: 'Accomplished', id: 'exercise-check', initChecked: exerciseCheck, onCheckboxChange: checkboxChangeHandler} }
				textarea={ {show: true, label: 'Notes', id: 'exercise-text', initTextArea: initExerciseNotes} }
				onScoreUpdate={scoreUpdateHandler} 
				np={exerciseScore}
			/>			
			<TrackingRow
				name="Mobilize"
				checkbox={ {show: true, label: 'Accomplished', id: 'mobilize-check', initChecked: mobilizeCheck, onCheckboxChange: checkboxChangeHandler} }
				onScoreUpdate={scoreUpdateHandler} 
				np={mobilizeScore}
			/>			
			<TrackingRow
				name="Sleep"
				checkbox={ {show: true, label: 'Accomplished', id: 'sleep-check', initChecked: sleepCheck, onCheckboxChange: checkboxChangeHandler} }
				onScoreUpdate={scoreUpdateHandler} 
				np={sleepScore}
			/>			
			<TrackingRow
				name="Hydrate"
				checkbox={ {show: true, label: 'Accomplished', id: 'hydrate-check', initChecked: hydrateCheck, onCheckboxChange: checkboxChangeHandler} }
				onScoreUpdate={scoreUpdateHandler} 
				np={hydrateScore}
			/>
			<TrackingRow
				name="Well-Being"
				checkbox={ {show: true, label: 'Accomplished', id: 'well-being-check', initChecked: wellbeingCheck, onCheckboxChange: checkboxChangeHandler} }
				textarea={ {show: true, label: 'Notes', id: 'well-being-text', initTextArea: initWellbeingNotes} }
				onScoreUpdate={scoreUpdateHandler} 
				np={wellBeingScore}
			/>
			<TrackingRow
				name="Reflect"
				checkbox={ {show: true, label: 'Accomplished', id: 'reflect-check', initChecked: reflectCheck, onCheckboxChange: checkboxChangeHandler} }
				textarea={ {show: true, label: 'Notes', id: 'reflect-text', initTextArea: initReflectNotes} }
				onScoreUpdate={scoreUpdateHandler} 
				np={reflectScore}
			/>
			<button type="submit">Submit</button>
			<ScoreDisplay score={nutritionScore + exerciseScore + mobilizeScore + sleepScore + hydrateScore + wellBeingScore + reflectScore} />
		</form>
	);
}

export default HabitsPanel;