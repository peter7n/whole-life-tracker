/* === Props ===
 * onDateSubmit: Pass the entered date to edit
*/

import Button from "../UI/Button";
import Input from "../UI/Input";
import { useState } from "react";

const DatePicker = (props) => {
	const [enteredDate, setEnteredDate] = useState('');
	const [clearText, setClearText] = useState(false);

	const enteredDateHandler = (date) => {
		setEnteredDate(date);
	};

	const clickHandler = () => {
		props.onDateSubmit(enteredDate);
		setClearText(true);
	}

	const resetClearTextHandler = (bool) => {
		setClearText(bool);
	}

	// const DateInputHandler = (date) => {
	// 	props.onDateChange(date);
	// }

	return (
		<div className="mt-4">
			<Input
				type="text"
				id="date"
				label="Enter Date to Edit"
				onTextUpdate={enteredDateHandler}
				clearText={clearText} 
				onClearText={resetClearTextHandler}				/>
			<Button
				label='Go'
				onClick={clickHandler}
			/>
		</div>
	);
}

export default DatePicker;