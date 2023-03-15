import Input from "../UI/Input";
import { useState } from "react";

const DatePicker = () => {
	const [enteredDate, setEnteredDate] = useState('');

	const enteredDateHandler = (event) => {
		setEnteredDate(event.target.value);
	};

	return (
		<div>
			<form>
				<Input
					type="text"
					id="date"
					label="Enter Date to Edit"
					value={enteredDate}
					onChange={enteredDateHandler}
				/>
			</form>
		</div>
	);
}

export default DatePicker;