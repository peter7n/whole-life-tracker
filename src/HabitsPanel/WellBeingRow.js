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

const WellBeingRow = (props) => {
	const [points, setPoints] = useState(0);
	const [notes, setNotes] = useState('');
	
	const pointsUpdateHandler = (num) => {
		console.log('WELLBEING: updating ' + points + ' + ' + num);
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
	
	useEffect(() => {
		if (initCheckedVal) {
			setPoints(5);
		} else {
			setPoints(0);
		}
	}, [initCheckedVal]);
	
	useEffect(() => {
		if (isFormSubmittedVal) {
			onSubmitResultsFunc('wellbeing', points, 'wellbeing_notes', notes);
		}
	}, [isFormSubmittedVal, notes, points, onSubmitResultsFunc]);
	
	return (
		<Card className='row'>
			<div className='col'>
				<Input
					type='checkbox'
					label='Well-Being'
					id='wellbeing-check'
					name='wellbeing-check'
					onCheckboxUpdate={pointsUpdateHandler}
					initChecked={props.initChecked}
				/>
			</div>
			<TextArea 
				label='Well-Being Notes'
				id='wellbeing-notes'
				onTextAreaUpdate={notesUpdateHandler}
				initTextArea={props.initTextArea}
			/>
			<RowScore points={points} />
		</Card>
	);
}

export default WellBeingRow;