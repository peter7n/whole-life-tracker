/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * initTextArea: Initial text value fetched from backend
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import TextArea from '../UI/TextArea';
import RowScore from './RowScore';
import Card from '../UI/Card';

const ExerciseRow = (props) => {
	const [points, setPoints] = useState(0);
	const [notes, setNotes] = useState('');
	
	const pointsUpdateHandler = (num) => {
		console.log('EXERCISE: updating ' + points + ' + ' + num);
		setPoints(points + num);
		props.onScoreUpdate(num);
	}
	const notesUpdateHandler = (text) => {
		setNotes(text);
	}

	const isFormSubmittedVal = props.isFormSubmitted;
	const onSubmitResultsFunc = props.onSubmitResults;
	
	// === Effects ===

	// Destructure/reassign props to remove 'props' as a dependency in useEffect()
	const initCheckedVal = props.initChecked;
	console.log('initChecked = ' + initCheckedVal);
	// const scoreUpdateFunc = props.onScoreUpdate;
	
	useEffect(() => {
		console.log('EXERCISE: setting points in useEffect');
		if (initCheckedVal) {
			setPoints(5);
			// scoreUpdateFunc(5);
	} else {
			setPoints(0);
		}
	}, [initCheckedVal]);
	
	useEffect(() => {
		if (isFormSubmittedVal) {
			onSubmitResultsFunc('exercise', points, 'exercise_notes', notes);
		}
	}, [isFormSubmittedVal, notes, points, onSubmitResultsFunc]);
	
	return (
		<Card className='row'>
			<div className='col'>
				<Input
					type='checkbox'
					label='Exercise'
					id='exercise-check'
					name='exercise-check'
					onCheckboxUpdate={pointsUpdateHandler}
					initChecked={props.initChecked}
				/>
			</div>
			<TextArea 
				label='Exercise Notes'
				id='exercise-notes'
				onTextAreaUpdate={notesUpdateHandler}
				initTextArea={props.initTextArea}
			/>
			<RowScore points={points} />
		</Card>
	);
}

export default ExerciseRow;