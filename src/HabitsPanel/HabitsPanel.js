import { useState } from 'react';
import NutritionRow from './NutritionRow';
import ExerciseRow from './ExerciseRow';
import MobilizeRow from './MobilizeRow';
import SleepRow from './SleepRow';
import HydrateRow from './HydrateRow';
import WellBeingRow from './WellBeingRow';
import ReflectRow from './ReflectRow';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';

const HabitsPanel = () => {
	const [scoreVal, setScore] = useState(0);
	const scoreUpdateHandler = (points) => {
		setScore(scoreVal + points);
	}

	return (
		<div>
			<NutritionRow />
			<ExerciseRow />
			<MobilizeRow />
			<SleepRow onScoreUpdate={scoreUpdateHandler} />
			<HydrateRow />
			<WellBeingRow />
			<ReflectRow />
			<ScoreDisplay score={scoreVal} />
		</div>
	);
}

export default HabitsPanel;