/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * clearText: Clears the text field
 * onClearText: Passes back false to set clearText back to false again
 * onCheckboxUpdate: Function in parent to execute when checkbox updates
 * onTextUpdate: Function in parent to execute when text field updates
 * type, id, name, label: Values for the input field
 */

import { useState, useEffect } from 'react';
import styles from './Input.module.css';

const Input = (props) => {
	// === States ===
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	const [enteredText, setEnteredText] = useState('');

	// === Handlers ===
	const checkboxHandler = () => {
		if (!checkboxChecked) {
			setCheckboxChecked(true);
			props.onCheckboxUpdate(5);
		} else {
			setCheckboxChecked(false);
			props.onCheckboxUpdate(-5);
		}
	}

	const textInputHandler = (event) => {
		setEnteredText(event.target.value);
		props.onTextUpdate(event.target.value);
	}

	// let existingCheck = props.initChecked;
	// let label = props.label;
	// const checkFunc = props.onCheckboxUpdate;

	// === Effects ===
	// Set initial checkbox state and score to existing fetched data
	useEffect(() => {
		if (props.initChecked !== undefined) {
			setCheckboxChecked(props.initChecked);
			if (props.initChecked) {
				props.onCheckboxUpdate(5);
			}
		}
	}, [props.initChecked]);

	// Clear the text input field
	useEffect(() => {
		if (props.clearText) {
			setEnteredText('');
			props.onClearText(false);
		}
	}, [props.clearText]);
	
	// Return radio input
	// if (props.type === 'radio') {
	// 	return (
	// 		<Fragment>
	// 			<input 
	// 				type="radio" 
	// 				className="btn-check" 
	// 				name={props.name} 
	// 				id={props.id}
	// 				autoComplete="off"
	// 				onChange={props.onChange}
	// 				checked={props.checked}
	// 			></input>
	// 			<label className={`btn ${props.className}`} htmlFor={props.id}>{props.label}</label>				
	// 		</Fragment>
	// 	);
	// }
	
	// Return checkbox or text input
	return (
		<div className={`${props.type === 'checkbox' ? 'form-check' : ''} ${props.type === 'checkbox' ? styles.big : ''}`}>
			<label className={`${props.type === 'checkbox' ? 'form-check-label' : ''}`} htmlFor={props.id}>{props.label}</label>
			<input 
				className={`${props.type === 'checkbox' ? 'form-check-input' : props.type === 'radio' ? 'btn-check' : 'form-control'}`}
				type={props.type} 
				id={props.id} 
				name={props.name} 
				value={enteredText} 
				onChange={props.type === 'checkbox' ? checkboxHandler : textInputHandler}
				checked={checkboxChecked}
			/>
		</div>
	);

}

export default Input;