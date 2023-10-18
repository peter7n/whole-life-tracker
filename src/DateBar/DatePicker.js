/* === Props ===
 * onDateSubmit: Pass the entered date to edit
*/

import Select from "../UI/Select";
import { useState } from "react";

const DatePicker = (props) => {
	const [clearSelect, setClearSelect] = useState(false);
	const valOptions = ['Select a Date', '20231011', '20231009', '20231008', '20231002', '20231001'];

	const dateChangeHandler = (value) => {
		props.onDateSubmit(value);
		setClearSelect(true);
	}

	const resetClearSelectHandler = (bool) => {
		setClearSelect(bool);
	};
	
	return (
		<div className="mt-4">
			<Select
				id="date"
				label="Edit Entry"
				initValue="Select an Option"
				valueOptions={valOptions}
				onSelectUpdate={dateChangeHandler}
				clearSelect={clearSelect}
				onClearSelect={resetClearSelectHandler}
			/>
		</div>
	);
}

export default DatePicker;