import { useState } from 'react';
import HabitRowWrapper from '../UI/HabitRowWrapper';
import Input from '../UI/Input';

const TrackingRow = (props) => {
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	// const [enteredTextArea, setEnteredTextArea] = useState('');
	const [enteredText, setEnteredText] = useState('');
	const [selectSelected, setSelectSelected] = useState('-1');
	
	const checkboxHandler = () => {
		if (!checkboxChecked) {
			setCheckboxChecked(true);
			props.onScoreUpdate(props.name, 5);
		} else {
			setCheckboxChecked(false);
			props.onScoreUpdate(props.name, -5);
		}
	}

	const textAreaInputHandler = (event) => {
		// setEnteredTextArea(event.target.value);
		props.onScoreUpdate(props.name, 0, event.target.value);
	}

	const textInputHandler = (event) => {
		setEnteredText(event.target.value);
		props.onScoreUpdate(props.name, 0, event.target.value);
	}

	const selectInputHandler = (event) => {
		setSelectSelected(event.target.value);
	}

	const buttonClickHandler = (event) => {
		event.preventDefault(); // prevent form submission
		props.buttonOnClick(selectSelected, enteredText);
	}

	let checkboxInput = '';
	let textareaInput = '';
	let textInput = '';
	let selectInput ='';
	let buttonInput = '';
	let npDisplay = '';
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
				// value={enteredTextArea}
				onChange={textAreaInputHandler} />;
	}
	if (props.select !== undefined && props.select.show) {
		selectInput =
			<Input
				type="select"
				id={props.select.id}
				label={props.select.label}
				value={selectSelected}
				onChange={selectInputHandler} />;
	}
	if (props.text !== undefined && props.text.show) {
		textInput = 
			<Input
				type="text"
				id={props.text.id}
				label={props.text.label}
				value={enteredText}
				onChange={textInputHandler} />;
	}
	if (props.button !== undefined && props.button.show) {
		buttonInput = <button onClick={buttonClickHandler}>{props.button.label}</button>;
	}
	if (props.np !== undefined) {
		npDisplay = <p>{props.np}</p>;
	}

	return (
		<HabitRowWrapper>
			<h2>{props.name}</h2>
			{checkboxInput}
			{textareaInput}
			{selectInput}
			{textInput}
			{buttonInput}
			{checkboxChecked && <p>+5</p>}
			{npDisplay}
		</HabitRowWrapper>
	);
}

export default TrackingRow;