/* == Props ==
 * initTextArea: Initial text value fetched from backend
 * onTextAreaUpdate: Function in parent to execute when textarea updates
 * id, name, label: Values for the textarea field
 */

import { useState, useEffect } from "react";

const TextArea = (props) => {
	const [enteredTextArea, setEnteredTextArea] = useState('');

	const textAreaInputHandler = (event) => {
		setEnteredTextArea(event.target.value);
		props.onTextAreaUpdate(event.target.value);
	}

	// Set initial textarea value to existing fetch data 
	useEffect(() => {
		if (props.initTextArea !== undefined) {
			setEnteredTextArea(props.initTextArea);
			// Update text content in parent in case no changes are made
			props.onTextAreaUpdate(props.initTextArea);
			console.log('changing textarea to initTextArea: ' + props.label);
			console.log(props.initTextArea);
		}
	}, [props.initTextArea]);
		
	return (
		<div className='mt-3'>
			<label className='form-label' htmlFor={props.id}>{props.label}</label>
			<textarea 
				className='form-control' 
				rows='3' 
				id={props.id} 
				name={props.id} 
				onChange={textAreaInputHandler} 
				value={enteredTextArea}
			>
			</textarea>
		</div>
	);
}

export default TextArea;