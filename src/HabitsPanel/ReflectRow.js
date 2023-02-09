import { useState } from 'react';
import HabitRow from '../UI/HabitRow';
import Input from '../UI/Input';

const ReflectRow = (props) => {
	const [reflectChecked, setReflectChecked] = useState(false);
	const [enteredReflectNotes, setEnteredReflectNotes] = useState('');
	
	const reflectCheckHandler = () => {
		if (!reflectChecked) {
			setReflectChecked(true);
			props.onScoreUpdate('REFLECT', 5);
		} else {
			setReflectChecked(false);
			props.onScoreUpdate('REFLECT', -5);
		}
	}

	const reflectNotesHandler = (event) => {
		setEnteredReflectNotes(event.target.value);
		props.onScoreUpdate('REFLECT', 0, enteredReflectNotes);
	}

	return (
		<HabitRow name="Reflect">
			<Input
				type="checkbox"
				label="Accomplished"
				id="reflect-check"
				onChange={reflectCheckHandler} />
			<Input
				type="textarea"
				label="Notes"
				id="reflect-text"
				value={enteredReflectNotes}
				onChange={reflectNotesHandler} />
			{reflectChecked && <p>+5</p>}
		</HabitRow>
	);
}

export default ReflectRow;