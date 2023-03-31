import { useState } from "react";
import TextArea from "../UI/TextArea";

const NotesInput = (props) => {
	const [enteredTextArea, setEnteredTextArea] = useState('');

	const textAreaInputHandler = (event) => {
		setEnteredTextArea(event.target.value);
		props.onNotesUpdate(event.target.value);
	}

	return (
		<TextArea
			label={props.label}
			id={props.id}
			value={enteredTextArea}
			onChange={textAreaInputHandler} 
		/>
	);
}

export default NotesInput;