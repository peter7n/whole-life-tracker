import NutritionRow from './NutritionRow';
import ExerciseRow from './ExerciseRow';
import MobilizeRow from './MobilizeRow';
import SleepRow from './SleepRow';
import HydrateRow from './HydrateRow';
import WellBeingRow from './WellBeingRow';
import ReflectRow from './ReflectRow';

const HabitsPanel = () => {
	return (
		<div>
			<NutritionRow />
			<ExerciseRow />
			<MobilizeRow />
			<SleepRow />
			<HydrateRow />
			<WellBeingRow />
			<ReflectRow />
		</div>
	);
}

export default HabitsPanel;