import { useState } from 'react';
import HabitRowWrapper from '../UI/HabitRowWrapper';
import Input from '../UI/Input';

const TrackingRow = (props) => {
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	// const [enteredText, setEnteredText] = useState('');
	
	const checkboxHandler = () => {
		if (!checkboxChecked) {
			setCheckboxChecked(true);
			props.onScoreUpdate(props.name, 5);
		} else {
			setCheckboxChecked(false);
			props.onScoreUpdate(props.name, -5);
		}
	}

	const textInputHandler = (event) => {
		// setEnteredText(event.target.value);
		props.onScoreUpdate(props.name, 0, event.target.value);
	}
	
	let checkboxInput = '';
	let textareaInput = '';
	let textInput = '';
	if (props.checkbox !== undefined && props.checkbox.show) {
		checkboxInput =
			<Input
				type="checkbox"
				label={props.checkbox.label}
				id={props.checkbox.id}
				onChange={checkboxHandler} />;
	}
	if (props.textarea !== undefined && props.textarea.show) {
		textareaInput = 
			<Input
				type="textarea"
				label={props.textarea.label}
				id={props.textarea.id}
				// value={enteredText}
				onChange={textInputHandler} />;
	}
	if (props.text !== undefined && props.text.show) {
		textInput = <Input type="text" />;
	}

	return (
		<HabitRowWrapper>
			<h2>{props.name}</h2>
			{checkboxInput}
			{textareaInput}
			{textInput}
			{checkboxChecked && <p>+5</p>}
		</HabitRowWrapper>
	);
}

export default TrackingRow;