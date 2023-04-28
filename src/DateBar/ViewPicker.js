import Select from "../UI/Select";

const ViewPicker = (props) => {
	const valOptions = ['Select an Option', 'All', 'Last Week'];

	const viewChangeHandler = (value) => {
		props.onViewChange(value);
	}
	
	return (
		<form className="mt-3">
			<Select
				id="view"
				label="View Entries"
				valueOptions={valOptions}
				onSelectUpdate={viewChangeHandler}
			/>
		</form>
	);
}

export default ViewPicker;