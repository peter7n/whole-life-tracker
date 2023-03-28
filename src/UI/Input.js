/* == Props ==
 * initChecked: Initial checked state fetched from backend
 * onCheckboxUpdate: Function in parent to execute when checkbox updates
 * type, id, name, label: Values for the input field
 */

import { Fragment, useState, useEffect } from 'react';

const Input = (props) => {
	// == States ==
	const [checkboxChecked, setCheckboxChecked] = useState(false);

	// == Handlers ==
	const checkboxHandler = () => {
		if (!checkboxChecked) {
			setCheckboxChecked(true);
			props.onCheckboxUpdate(5);
		} else {
			setCheckboxChecked(false);
			props.onCheckboxUpdate(-5);
		}
	}

	// const textInputHandler = (event) => {
	// 	setEnteredText(event.target.value);
	// 	props.onScoreUpdate(props.name, 0, event.target.value);
	// }
	// let existingCheck = props.initChecked;
	// let label = props.label;
	// const checkFunc = props.onCheckboxUpdate;
	// Set initial checkbox state and score to existing fetch data
	useEffect(() => {
		if (props.initChecked !== undefined) {
			setCheckboxChecked(props.initChecked);
			if (props.initChecked) {
				props.onCheckboxUpdate(5);
			}
			console.log('changing checked to existing check state:' + props.label);
			console.log(props.initChecked);
		}
	}, [props.initChecked]);
	
	// Return radio input
	if (props.type === 'radio') {
		return (
			<Fragment>
				<input 
					type="radio" 
					className="btn-check" 
					name={props.name} 
					id={props.id}
					autoComplete="off"
					onChange={props.onChange}
					checked={props.checked}
				></input>
				<label className={`btn ${props.className}`} htmlFor={props.id}>{props.label}</label>				
			</Fragment>
		);
	}
	
	// Return checkbox or text input
	return (
		<div className={`${props.type === 'checkbox' ? 'form-check' : ''}`}>
			<label className={`${props.type === 'checkbox' ? 'form-check-label' : ''}`} htmlFor={props.id}>{props.label}</label>
			<input 
				className={`${props.type === 'checkbox' ? 'form-check-input' : props.type === 'radio' ? 'btn-check' : 'form-control'}`}
				type={props.type} 
				id={props.id} 
				name={props.name} 
				value={props.value} 
				onChange={checkboxHandler}
				checked={checkboxChecked}
			/>
		</div>
	);

}

export default Input;