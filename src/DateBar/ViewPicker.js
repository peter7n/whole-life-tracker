import Input from "../UI/Input";
import { useState } from "react";

const ViewPicker = (props) => {
	const [selectedView, setSelectedView] = useState('Select an Option');
	const valOptions = ['Select an Option', 'All', 'Last Week'];

	const viewChangeHandler = (event) => {
		setSelectedView(event.target.value);
		// pass new view selection up to DateBar
		props.onViewChange(event.target.value);
	}
	
	return (
		<form>
			<Input
				type="select"
				id="view"
				label="View Entries"
				value={selectedView}
				valueOptions={valOptions}
				onChange={viewChangeHandler}
			/>
		</form>
	);
}

export default ViewPicker;