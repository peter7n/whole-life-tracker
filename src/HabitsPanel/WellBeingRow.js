/* == Props ==
 * initChecked: Initial checked state fetched from backend
 * onCheckboxUpdate: Function in parent to execute when checkbox updates
 * type, id, name, label: Values for the input field
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
		<div>
			<h2>Well-Being</h2>
			<Input
				type='checkbox'
				label='Well-Being Accomplished'
				id='wellbeing-check'
				name='wellbeing-check'
				onCheckboxUpdate={pointsUpdateHandler}
				initChecked={props.initChecked}
			/>
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