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
	const [sleepScore, setSleepScore] = useState(0);
	const [hydrateScore, setHydrateScore] = useState(0);
	const [reflectScore, setReflectScore] = useState(0);
	const [reflectNotes, setReflectNotes] = useState('');

	const scoreUpdateHandler = (habit, points, notes) => {
		if (habit === 'SLEEP') {
			setSleepScore(sleepScore + points);
		} else if (habit === 'HYDRATE') {
			setHydrateScore(hydrateScore + points);
		} else if (habit === 'REFLECT') {
			setReflectScore(reflectScore + points);
			setReflectNotes(notes);
		} else if (habit === 'NUTRITION') {
			console.log(habit, points, notes);
		}
	}

	const submitHandler = (event) => {
		event.preventDefault();
		const totalScore = sleepScore + hydrateScore + reflectScore;
		const dayData = {
			date: 'Feb. 8, 2023',
			sleep: sleepScore,
			hydrate: hydrateScore,
			reflect: reflectScore,
			reflect_notes: reflectNotes,
			total: totalScore
		}
		props.onSubmitDay(dayData); //pass the data object
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
			<ScoreDisplay score={sleepScore + hydrateScore + reflectScore} />
		</form>
	);
}

export default HabitsPanel;