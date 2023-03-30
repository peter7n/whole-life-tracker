/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';

const SleepRow = (props) => {
	const [points, setPoints] = useState(0);

	const pointsUpdateHandler = (num) => {
		setPoints(points + num);
		props.onScoreUpdate(num);
	}

	useEffect(() => {
		if (props.isFormSubmitted) {
			props.onSubmitResults('sleep', points);
		}
	}, [props.isFormSubmitted, points, props]);

	return (
		<div>
			<h2>Sleep</h2>
			<Input
				type='checkbox'
				label='Accomplished'
				id='sleep-check'
				name='sleep-check'
				onCheckboxUpdate={pointsUpdateHandler}
				initChecked={props.initChecked}
			/>
			<RowScore points={points} />
		</div>
	);
}

export default SleepRow;