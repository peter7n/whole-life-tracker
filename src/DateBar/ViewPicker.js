import Input from "../UI/Input";
import { useState } from "react";

const ViewPicker = () => {
	const [selectedView, setSelectedView] = useState('Select an Option');
	const valOpt = ['All', 'LastWeek'];

	const viewChangeHandler = (event) => {
		setSelectedView(event.target.value);
	}
	
	return (
		<form>
			<Input
				type="select"
				id="view"
				label="View Entries"
				value={selectedView}
				valueOptions={valOpt}
				onChange={viewChangeHandler}
			/>
		</form>
	);
}

export default ViewPicker;