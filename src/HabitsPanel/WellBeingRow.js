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

const WellBeingRow = (props) => {
	const [points, setPoints] = useState(0);
	const [notes, setNotes] = useState('');
	
	const pointsUpdateHandler = (num) => {
		setPoints(points + num);
		props.onScoreUpdate(num);
	}
	const notesUpdateHandler = (text) => {
		setNotes(text);
	}
	
	useEffect(() => {
		if (props.isFormSubmitted) {
			props.onSubmitResults('wellbeing', points, 'wellbeing_notes', notes);
		}
	}, [props.isFormSubmitted, notes, points, props]);
	
	return (
		<div className='row mt-3'>
			<h2>Well-Being</h2>
			<div className='col'>
				<Input
					type='checkbox'
					label='Well-Being Accomplished'
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
		</div>
	);
}

export default WellBeingRow;