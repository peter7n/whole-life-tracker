import { useState } from 'react';
import HabitRow from '../UI/HabitRow';

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
			<HabitRow
				name="Hydrate"
				inputType="checkbox"
				checkboxId="hydrate"
				onChange={hydrateCheckHandler}
			/>
			{hydrateChecked && <p>+5</p>}
		</div>
	);
}

export default HydrateRow;