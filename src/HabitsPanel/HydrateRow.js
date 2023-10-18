/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * onScoreUpdate: Pass updated habit points to track total score
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';
import Card from '../UI/Card';

const HydrateRow = (props) => {
	const [points, setPoints] = useState(0);

	const pointsUpdateHandler = (num) => {
		console.log('HYDRATE: updating ' + points + ' + ' + num);
		setPoints(points + num);
		props.onScoreUpdate(num);
	}

	const isFormSubmittedVal = props.isFormSubmitted;
	const onSubmitResultsFunc = props.onSubmitResults;
	
	// === Effects ===

	// Destructure/reassign props to remove 'props' as a dependency in useEffect()
	const initCheckedVal = props.initChecked;
	
	useEffect(() => {
		if (initCheckedVal.checkState) {
			setPoints(5);
		} else {
			setPoints(0);
		}
	}, [initCheckedVal]);	
	
	useEffect(() => {
		if (isFormSubmittedVal) {
			onSubmitResultsFunc('hydrate', points);
		}
	}, [isFormSubmittedVal, points, onSubmitResultsFunc]);

	return (
		<Card className='row'>
			<div className='col'>
				<Input
					type='checkbox'
					label='Hydrate'
					id='hydrate-check'
					name='hydrate-check'
					onCheckboxUpdate={pointsUpdateHandler}
					initChecked={props.initChecked}
				/>
			</div>
			<RowScore points={points} />
		</Card>
	);
}

export default HydrateRow;