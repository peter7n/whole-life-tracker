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

	const scoreUpdateHandler = (habit, points) => {
		if (habit === 'SLEEP') {
			setSleepScore(sleepScore + points);
		} else if (habit === 'HYDRATE') {
			setHydrateScore(hydrateScore + points);
		}
	}

	const submitHandler = (event) => {
		event.preventDefault();
		const totalScore = sleepScore + hydrateScore;
		const dayData = {
			date: 'Feb. 8, 2023',
			sleep: sleepScore,
			hydrate: hydrateScore,
			total: totalScore
		}
		props.onSubmitDay(dayData); //pass the data object
	}

	return (
		<form onSubmit={submitHandler}>
			<NutritionRow />
			<ExerciseRow />
			<MobilizeRow />
			<SleepRow onScoreUpdate={scoreUpdateHandler} />
			<HydrateRow onScoreUpdate={scoreUpdateHandler} />
			<WellBeingRow />
			<ReflectRow onScoreUpdate={scoreUpdateHandler} />
			<button type="submit">Submit</button>
			<ScoreDisplay score={sleepScore + hydrateScore} />
		</form>
	);
}

export default HabitsPanel;