// Props: isFormSubmitted, onSubmitResults

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import TextArea from '../UI/TextArea';
import RowScore from './RowScore';

const ExerciseRow = (props) => {
	const [points, setPoints] = useState(0);
	const [notes, setNotes] = useState('');
	
	const pointsUpdateHandler = (num) => {
		setPoints(points + num);
	}
	const notesUpdateHandler = (text) => {
		setNotes(text);
	}

	useEffect(() => {
		if (props.isFormSubmitted) {
			console.log('EXERCISE inside useEffect');
			props.onSubmitResults('exercise', points, 'exercise_notes', notes);
		}
	}, [props.isFormSubmitted, notes, points, props]);
	
	return (
		<div>
			<h2>Exercise</h2>
			<Input
				type='checkbox'
				label='Exercise Accomplished'
				id='exercise-check'
				name='exercise-check'
				onCheckboxUpdate={pointsUpdateHandler}
				initChecked={props.initChecked}
			/>
			<TextArea 
				label='Exercise Notes'
				id='exercise-notes'
				onTextAreaUpdate={notesUpdateHandler}
				initTextArea={props.initTextArea}
			/>
			<RowScore points={points} />
		</div>
	);
}

export default ExerciseRow;