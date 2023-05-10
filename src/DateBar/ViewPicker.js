import { useState } from "react";
import Select from "../UI/Select";

const ViewPicker = (props) => {
	const [clearSelect, setClearSelect] = useState(false);
	const valOptions = ['Select an Option', 'All', 'Last Week'];

	const viewChangeHandler = (value) => {
		props.onViewChange(value);
		setClearSelect(true);
	};

	const resetClearSelectHandler = (bool) => {
		setClearSelect(bool);
	};
	
	return (
		<form className="mt-3">
			<Select
				id="view"
				label="View Entries"
				initValue="Select an Option"
				valueOptions={valOptions}
				onSelectUpdate={viewChangeHandler}
				clearSelect={clearSelect}
				onClearSelect={resetClearSelectHandler}
			/>
		</form>
	);
}

export default ViewPicker;