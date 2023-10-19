/* === Props ===
 * onDateSubmit: Pass the entered date to edit
*/

import Select from "../UI/Select";
import { useState } from "react";

const DatePicker = (props) => {
	const [clearSelect, setClearSelect] = useState(false);

	// Get date range
	const dateStart = new Date(2023,2,13);
	const dateEnd = new Date(); // today's date
	const valOptions = getDatesBetween(dateStart, dateEnd);

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
				initValue="Select Date"
				valueOptions={valOptions}
				onSelectUpdate={dateChangeHandler}
				clearSelect={clearSelect}
				onClearSelect={resetClearSelectHandler}
			/>
		</div>
	);
}

// Returns an array of a date range
const getDatesBetween = (startDate, endDate) => {
	const currentDate = new Date(startDate.getTime());
	let dates = [];
	let dateObj = {};
	let dateDate = ''
	let dateVal = '';
	while (currentDate <= endDate) {
		dateObj = new Date(currentDate);
		dateDate = dateObj.toDateString();
		dateVal = dateObj.toISOString().slice(0,10).replace(/-/g,"");
		dates.unshift({ text: dateDate, value: dateVal });
		currentDate.setDate(currentDate.getDate() + 1);
	}
	dates.unshift({ text: 'Select Date', value: 'Select Date'});
	return dates;
 }

export default DatePicker;