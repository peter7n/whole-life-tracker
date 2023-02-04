import PointsDisplay from '../HabitsPanel/PointsDisplay';

const HabitRow = (props) => {
	let inputContent = '';
	let multiTextBox = 
		<form>
			<label for="points">Pts</label>
			<select name="points" id="points">
				<option value="1">-1</option>
				<option value="2">-2</option>
				<option value="3">-3</option>
			</select>
			<label for="food">Food</label>
			<input type="text" id="food" name="food" />
			<input type="submit" value="submit" />
		</form>;
	let checkbox = <form><label for="{props.checkboxId}">Accomplished</label><input type="checkbox" id="{props.checkboxId}" name="{props.checkboxId}" value="false" /></form>
	let checkboxAndText = <form><label for="props.textId">Notes</label><textarea id="props.textId" name="props.textId" ></textarea><label for="{props.checkboxId}">Accomplished</label><input type="checkbox" id="{props.checkboxId}" name="{props.checkboxId}" value="false" /></form>
	
	if (props.inputType === 'multi-textbox') {
		inputContent = multiTextBox;
	} else if (props.inputType === 'checkbox') {
		inputContent = checkbox;
	} else if (props.inputType === 'checkbox-and-notes') {
		inputContent = checkboxAndText;
	}

	return (
		<div>
			<h2>{props.name}</h2>
			{inputContent}
			<PointsDisplay type="props.name" />
		</div>
	);
}

export default HabitRow;