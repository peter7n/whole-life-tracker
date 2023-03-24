import { useState } from 'react';
import AccomplishInput from "./AccomplishInput";
import NotesInput from './NotesInput';
import RowScore from './RowScore';

const ExerciseRow = (props) => {
	const [exercisePoints, setExercisePoints] = useState(0);
	const [exerciseNotes, setExerciseNotes] = useState('');
	
	const pointsUpdateHandler = (points) => {
		setExercisePoints(exercisePoints + points);
		// props.onScoreUpdate()
	}
	const notesUpdateHandler = (notes) => {
		setExerciseNotes(notes);
	}

	if (props.isFormSubmitted) {
		props.onSubmitResults('exercise', exercisePoints, 'exercise_notes', exerciseNotes);
	}

	return (
		<div>
			<h2>Exercise</h2>
			<AccomplishInput
				label='Accomplished'
				id='exercise-check'
				onPointsUpdate={pointsUpdateHandler}
			/>
			<NotesInput 
				label='Notes'
				id='exercise-notes'
				onNotesUpdate={notesUpdateHandler}
			/>
			<RowScore points={exercisePoints} />
		</div>
	);
}

export default ExerciseRow;