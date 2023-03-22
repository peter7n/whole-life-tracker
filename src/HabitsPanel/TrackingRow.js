import { useState, useEffect } from 'react';
// import HabitRowWrapper from '../UI/HabitRowWrapper';
import Input from '../UI/Input';

const TrackingRow = (props) => {
	let existingTextArea = '';
	let existingChecked = false;
	if (props.textarea !== undefined) {
		existingTextArea = props.textarea.initTextArea;
	}
	if (props.checkbox !== undefined) {
		existingChecked = props.checkbox.initChecked;
	}
	let checkboxInput = '';
	let textareaInput = '';
	let textInput = '';
	let selectInput ='';
	let buttonInput = '';
	let npDisplay = '';
	// const badgeStyle = {
	// 	font-size: '20px';
	// };

	// == States ==
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	const [enteredTextArea, setEnteredTextArea] = useState('');
	const [enteredText, setEnteredText] = useState('');
	const [selectSelected, setSelectSelected] = useState((props.select !== undefined) ? props.select.value : ''); 	// set initial select value to value passed through props

	// == Handlers ==
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

	// Set initial checkbox and textarea states to existing fetch data (passed from parent component)
	useEffect(() => {
		setEnteredTextArea(existingTextArea);
		console.log('changing textarea to initTextArea');
	}, [existingTextArea]);

	useEffect(() => {
		setCheckboxChecked(existingChecked);
		console.log('changing checked to existing check state')
	}, [existingChecked]);

	// Set rendered content
	if (props.checkbox !== undefined && props.checkbox.show) {
		checkboxInput =
			<Input
				type="checkbox"
				label={props.checkbox.label}
				id={props.checkbox.id}
				checked={checkboxChecked}
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
		buttonInput = <button className='btn btn-secondary mt-3' onClick={buttonClickHandler}>{props.button.label}</button>;
	}
	if (props.np !== undefined) {
		npDisplay = <div className='mt-3' style={{fontSize: 30}}><p className={`badge ${props.np > 4 ?'text-bg-success' : props.np < 1 ? 'text-bg-danger' : 'text-bg-secondary'}`}>{props.np}</p></div>;
	}

	return (
		<div className='row mt-3'>
			<div className='col-xsm-12'><h2>{props.name}</h2></div>
			<div className='col-xsm-12'>{checkboxInput}</div>
			<div className='col-xsm-12'>{textareaInput}</div>
			<div className='col'>{selectInput}</div>
			<div className='col'>{textInput}</div>
			<div className=''>{buttonInput}</div>
			{checkboxChecked}
			{npDisplay}
		</div>
	);
}

export default TrackingRow;