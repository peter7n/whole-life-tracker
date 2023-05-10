/* == Props ==
 * initValue: Sets the initial value for the select field
 * onSelectUpdate: Function in parent to execute when select updates
 * id, name, label: Values for the select field
 * valueOptions: An array of the available select options
 */

import { useState, Fragment, useEffect } from "react";

const Select = (props) => {
	const [selectSelected, setSelectSelected] = useState(props.initValue); 	// set initial select value

	const selectInputHandler = (event) => {
		setSelectSelected(event.target.value);
		props.onSelectUpdate(event.target.value);
	}

	useEffect(() => {
		if (props.clearSelect) {
			setSelectSelected(props.initValue);
			// props.onSelectUpdate(props.initValue);
			props.onClearSelect(false);
		}
	}, [props.clearSelect]);

	return (
		<Fragment>
			<label htmlFor={props.id}>{props.label}</label>
			<select 
				className='form-select' 
				name={props.name} 
				id={props.id} 
				value={selectSelected}
				onChange={selectInputHandler}
			>
				{props.valueOptions.map((val, i) =>
					<option key={i} value={val}>{val}</option>
				)}
			</select>
		</Fragment>
	);
}

export default Select;