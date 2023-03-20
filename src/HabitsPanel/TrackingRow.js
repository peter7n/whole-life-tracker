import { useState, useEffect } from 'react';
import HabitRowWrapper from '../UI/HabitRowWrapper';
import Input from '../UI/Input';

const TrackingRow = (props) => {
	let existingTextArea = '';
	if (props.textarea !== undefined) {
		console.log('yyy:' + props.name);
		console.log(props.textarea.initTextArea);
		existingTextArea = props.textarea.initTextArea;
	}
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	const [enteredTextArea, setEnteredTextArea] = useState('');
	const [enteredText, setEnteredText] = useState('');
	const [selectSelected, setSelectSelected] = useState((props.select !== undefined) ? props.select.value : ''); 	// set initial select value to value passed through props
	
	const checkboxHandler = () => {
		// if local state and parent state are both not checked, then set checked
		if (!checkboxChecked && !props.checkbox.checked) {
			setCheckboxChecked(true);
			// props.checkbox.onCheckboxChange(true);
			props.onScoreUpdate(props.name, 5);
		// else if local state is not checked and parent state is checked, set parent state to not checked
		} else if (!checkboxChecked && props.checkbox.checked) {
			props.checkbox.onCheckboxChange(props.name, false) // create a prop to set parent state
			props.onScoreUpdate(props.name, -5)
		// else set local state to unchecked
		} else {
			setCheckboxChecked(false);
			props.onScoreUpdate(props.name, -5);
		}
	}

	const textAreaInputHandler = (event) => {
		setEnteredTextArea(event.target.value);
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
		setEnteredText('');		// clear text field
	}

	useEffect(() => {
		setEnteredTextArea(existingTextArea);
		console.log('changing textarea to initTextArea');
	}, [existingTextArea]);

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
				checked={checkboxChecked || props.checkbox.checked}
				onChange={checkboxHandler} 
			/>;
	}
	if (props.textarea !== undefined && props.textarea.show) {
		textareaInput = 
			<Input
				type="textarea"
				label={props.textarea.label}
				id={props.textarea.id}
				value={enteredTextArea}
				onChange={textAreaInputHandler} />;
	}
	if (props.select !== undefined && props.select.show) {
		const valOpt = ['-1', '-2', '-3', '-4', '-5'];
		selectInput =
			<Input
				type="select"
				id={props.select.id}
				label={props.select.label}
				value={selectSelected}
				valueOptions={valOpt}
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
			{checkboxChecked}
			{npDisplay}
		</HabitRowWrapper>
	);
}

export default TrackingRow;