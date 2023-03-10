import { useState } from 'react';
import HabitRow from '../UI/HabitRowWrapper';

const SleepRow = (props) => {
	const [sleepChecked, setSleepCheckState] = useState(false);
	const sleepCheckHandler = () => {
		if (!sleepChecked) {
			setSleepCheckState(true);
			props.onScoreUpdate('SLEEP', 5);
		} else {
			setSleepCheckState(false);
			props.onScoreUpdate('SLEEP', -5);
		}
	}
	return (
		<div>
			<HabitRow
				name="Sleep"
				inputType="checkbox"
				checkboxId="sleep"
				onChange={sleepCheckHandler}
			/>
			{sleepChecked && <p>+5</p>}
		</div>
	);
}

export default SleepRow;