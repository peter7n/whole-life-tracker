import { useState } from 'react';
import HabitRow from '../UI/HabitRow';
import Input from '../UI/Input';

const HydrateRow = (props) => {
	const [hydrateChecked, setHydrateState] = useState(false);
	
	const hydrateCheckHandler = () => {
		if (!hydrateChecked) {
			setHydrateState(true);
			props.onScoreUpdate('HYDRATE', 5);
		} else {
			setHydrateState(false);
			props.onScoreUpdate('HYDRATE', -5);
		}
	}
	
	return (
		<div>
			<HabitRow name="Hydrate">
				<Input 
					type="checkbox"
					id="hydrate-check"
					label="Accomplished"
					onChange={hydrateCheckHandler}
				 />
				{hydrateChecked && <p>+5</p>}
			</HabitRow>
		</div>
	);
}

export default HydrateRow;