const HabitRow = (props) => {
	let inputContent = '';
	let multiTextBox = <p>MULTI TEXTBOX INPUT</p>;
	if (props.inputType === 'multi-textbox') {
		inputContent = multiTextBox;
	}

	return (
		<div>
			<h2>{props.name}</h2>
			{inputContent}
			<p>Points: +5</p>
		</div>
	);
}

export default HabitRow;