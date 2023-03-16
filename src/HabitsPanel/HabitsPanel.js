import { useState } from 'react';
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
	
	// Specific states for Nutrition tracker
	const [foodArray, setFoodArray] = useState([]);
	// const [nutritionPoints, setNutritionPoints] = useState(5);

	const scoreUpdateHandler = (habit, points, data) => {
		if (habit === 'Nutrition') {
			setNutritionScore(nutritionScore + points);
			setNutritionFoodArray(data);
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
		let updatedArray = [...foodArray, foodEntry];
		// let updatedPoints = nutritionPoints + +pointsSelected;

		setFoodArray((prevFoodArray) => {
			return [...prevFoodArray, foodEntry];
		});
		// setNutritionPoints(updatedPoints);
		scoreUpdateHandler('Nutrition', +pointsSelected, updatedArray);
	};

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
			<TrackingRow
				name="Exercise"
				checkbox={ {show: true, label: 'Accomplished', id: 'exercise-check'} }
				textarea={ {show: true, label: 'Notes', id: 'exercise-text'} }
				onScoreUpdate={scoreUpdateHandler} />			
			<TrackingRow
				name="Mobilize"
				checkbox={ {show: true, label: 'Accomplished', id: 'mobilize-check'} }
				onScoreUpdate={scoreUpdateHandler} />			
			<TrackingRow
				name="Sleep"
				checkbox={ {show: true, label: 'Accomplished', id: 'sleep-check'} }
				onScoreUpdate={scoreUpdateHandler} />			
			<TrackingRow
				name="Hydrate"
				checkbox={ {show: true, label: 'Accomplished', id: 'hydrate-check'} }
				onScoreUpdate={scoreUpdateHandler} />
			<TrackingRow
				name="Well-Being"
				checkbox={ {show: true, label: 'Accomplished', id: 'well-being-check'} }
				textarea={ {show: true, label: 'Notes', id: 'well-being-text'} }
				onScoreUpdate={scoreUpdateHandler} />
			<TrackingRow
				name="Reflect"
				checkbox={ {show: true, label: 'Accomplished', id: 'reflect-check'} }
				textarea={ {show: true, label: 'Notes', id: 'reflect-text'} }
				onScoreUpdate={scoreUpdateHandler} />
			<button type="submit">Submit</button>
			<ScoreDisplay score={nutritionScore + exerciseScore + mobilizeScore + sleepScore + hydrateScore + wellBeingScore + reflectScore} />
		</form>
	);
}

export default HabitsPanel;