// import { useState } from 'react';
import Input from '../UI/Input';
import HabitRow from '../UI/HabitRowWrapper';

const ExerciseRow = () => {
	// const [exerciseChecked, setExerciseChecked] = useState(false);
	// const [enteredExerciseNotes, setEnteredExerciseNotes] = useState('');

	// const exerciseNotesHandler = () => {

	// }
	
	return (
		<HabitRow name="Exercise">
			<Input
				type="checkbox"
				label="Accomplished"
				id="exercise-check"
				// onChange={exerciseCheckHandler}
				 />
			<Input
				type="textarea"
				label="Notes"
				id="exercise-text"
				// value={enteredExerciseNotes}
				// onChange={exerciseNotesHandler} 
				/>			
		</HabitRow>
	);
}

export default ExerciseRow;