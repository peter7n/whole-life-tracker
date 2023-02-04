import HabitRow from '../UI/HabitRow';

const ExerciseRow = () => {
	return (
		<HabitRow
			name="Exercise"
			inputType="checkbox-and-text"
			checkboxId="exercise"
			textId="exercise-notes"
		/>
	);
}

export default ExerciseRow;