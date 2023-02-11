import { useState } from 'react';
// import NutritionRow from './NutritionRow';
import ExerciseRow from './ExerciseRow';
import MobilizeRow from './MobilizeRow';
import SleepRow from './SleepRow';
// import HydrateRow from './HydrateRow';
import WellBeingRow from './WellBeingRow';
// import ReflectRow from './ReflectRow';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';
import TrackingRow from './TrackingRow';

const HabitsPanel = (props) => {
	const [nutritionScore, setNutritionScore] = useState(0);
	const [nutritionFoodArray, setNutritionFoodArray] = useState([]);
	const [sleepScore, setSleepScore] = useState(0);
	const [hydrateScore, setHydrateScore] = useState(0);
	const [reflectScore, setReflectScore] = useState(0);
	const [reflectNotes, setReflectNotes] = useState('');
	
	// Specific states for Nutrition tracker
	const [foodArray, setFoodArray] = useState([]);
	const [nutritionPoints, setNutritionPoints] = useState(5);

	const scoreUpdateHandler = (habit, points, data) => {
		if (habit === 'Sleep') {
			setSleepScore(sleepScore + points);
		} else if (habit === 'Hydrate') {
			setHydrateScore(hydrateScore + points);
		} else if (habit === 'Reflect') {
			setReflectScore(reflectScore + points);
			setReflectNotes(data);
		} else if (habit === 'Nutrition') {
			setNutritionScore(points);
			setNutritionFoodArray(data);
		}
	}

	const submitHandler = (event) => {
		event.preventDefault();
		const totalScore = nutritionScore + sleepScore + hydrateScore + reflectScore;
		const dayData = {
			date: 'Feb. 8, 2023',
			nutrition: nutritionScore,
			nutrition_noncompliant: nutritionFoodArray,
			sleep: sleepScore,
			hydrate: hydrateScore,
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
		let updatedArray = [foodEntry, ...foodArray];
		let updatedPoints = nutritionPoints + +pointsSelected;

		setFoodArray((prevFoodArray) => {
			return [foodEntry, ...prevFoodArray];
		});
		setNutritionPoints(updatedPoints);
		scoreUpdateHandler('Nutrition', updatedPoints, updatedArray);
	};

	return (
		<form onSubmit={submitHandler}>
			{/* <NutritionRow onScoreUpdate={scoreUpdateHandler} /> */}
			<TrackingRow 
				name="Nutrition"
				select={ {show: true, label: 'Pts', id: 'nutrition-select'} }
				text={ {show: true, label: 'Food', id: 'nutrition-text'} }
				button= { {show: true, label: 'Add'} }
				buttonOnClick = {nutritionAddHandler}
				onScoreUpdate={scoreUpdateHandler}
				np={nutritionPoints}
			/>
			<ExerciseRow />
			<MobilizeRow />
			<SleepRow onScoreUpdate={scoreUpdateHandler} />
			<TrackingRow
				name="Hydrate"
				checkbox={ {show: true, label: 'Accomplished', id: 'hydrate-check'} }
				onScoreUpdate={scoreUpdateHandler} />
			<WellBeingRow />
			<TrackingRow
				name="Reflect"
				checkbox={ {show: true, label: 'Accomplished', id: 'reflect-check'} }
				textarea={ {show: true, label: 'Notes', id: 'reflect-text'} }
				onScoreUpdate={scoreUpdateHandler} />
			<button type="submit">Submit</button>
			<ScoreDisplay score={nutritionScore + sleepScore + hydrateScore + reflectScore} />
		</form>
	);
}

export default HabitsPanel;