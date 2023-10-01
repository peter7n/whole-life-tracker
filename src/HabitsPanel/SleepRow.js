/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';
import Card from '../UI/Card';

const SleepRow = (props) => {
	const [points, setPoints] = useState(0);

	const pointsUpdateHandler = (num) => {
		setPoints(points + num);
		props.onScoreUpdate(num);
	}

	const isFormSubmittedVal = props.isFormSubmitted;
	const onSubmitResultsFunc = props.onSubmitResults;
	
	useEffect(() => {
		if (isFormSubmittedVal) {
			onSubmitResultsFunc('sleep', points);
		}
	}, [isFormSubmittedVal, points, onSubmitResultsFunc]);

	return (
		<Card className='row'>
			<div className='col'>
				<Input
					type='checkbox'
					label='Sleep'
					id='sleep-check'
					name='sleep-check'
					onCheckboxUpdate={pointsUpdateHandler}
					initChecked={props.initChecked}
				/>
			</div>
			<RowScore points={points} />
		</Card>
	);
}

export default SleepRow;