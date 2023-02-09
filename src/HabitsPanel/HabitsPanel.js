import { useState } from 'react';
import NutritionRow from './NutritionRow';
import ExerciseRow from './ExerciseRow';
import MobilizeRow from './MobilizeRow';
import SleepRow from './SleepRow';
import HydrateRow from './HydrateRow';
import WellBeingRow from './WellBeingRow';
import ReflectRow from './ReflectRow';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';

const HabitsPanel = (props) => {
	const [nutritionScore, setNutritionScore] = useState(0);
	const [nutritionFoodArray, setNutritionFoodArray] = useState([]);
	const [sleepScore, setSleepScore] = useState(0);
	const [hydrateScore, setHydrateScore] = useState(0);
	const [reflectScore, setReflectScore] = useState(0);
	const [reflectNotes, setReflectNotes] = useState('');

	const scoreUpdateHandler = (habit, points, data) => {
		if (habit === 'SLEEP') {
			setSleepScore(sleepScore + points);
		} else if (habit === 'HYDRATE') {
			setHydrateScore(hydrateScore + points);
		} else if (habit === 'REFLECT') {
			setReflectScore(reflectScore + points);
			setReflectNotes(data);
		} else if (habit === 'NUTRITION') {
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

	return (
		<form onSubmit={submitHandler}>
			<NutritionRow onScoreUpdate={scoreUpdateHandler} />
			<ExerciseRow />
			<MobilizeRow />
			<SleepRow onScoreUpdate={scoreUpdateHandler} />
			<HydrateRow onScoreUpdate={scoreUpdateHandler} />
			<WellBeingRow />
			<ReflectRow onScoreUpdate={scoreUpdateHandler} />
			<button type="submit">Submit</button>
			<ScoreDisplay score={nutritionScore + sleepScore + hydrateScore + reflectScore} />
		</form>
	);
}

export default HabitsPanel;