import { useState } from 'react';
import Input from '../UI/Input';

const AccomplishInput = (props) => {
	// == States ==
	const [checkboxChecked, setCheckboxChecked] = useState(false);
	
	// == Handlers ==
	const checkboxHandler = () => {
		if (!checkboxChecked) {
			setCheckboxChecked(true);
			props.onPointsUpdate(5);
		} else {
			setCheckboxChecked(false);
			props.onPointsUpdate(-5);
		}
	}

	return (
		<Input
			type="checkbox"
			label={props.label}
			id={props.id}
			checked={checkboxChecked}
			onChange={checkboxHandler} 
		/>
	);
}

export default AccomplishInput;