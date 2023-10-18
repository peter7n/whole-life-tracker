/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';
import Card from '../UI/Card';

const MobilizeRow = (props) => {
	const [points, setPoints] = useState(0);

	const pointsUpdateHandler = (num) => {
		console.log('MOBILIZE: updating ' + points + ' + ' + num);
		setPoints(points + num);
		props.onScoreUpdate(num);
	}

	const isFormSubmittedVal = props.isFormSubmitted;
	const onSubmitResultsFunc = props.onSubmitResults;
	
	// === Effects ===

	// Destructure/reassign props to remove 'props' as a dependency in useEffect()
	const initCheckedVal = props.initChecked;
	
	useEffect(() => {
		if (initCheckedVal) {
			setPoints(5);
		} else {
			setPoints(0);
		}
	}, [initCheckedVal]);
	
	useEffect(() => {
		if (isFormSubmittedVal) {
			onSubmitResultsFunc('mobilize', points);
		}
	}, [isFormSubmittedVal, points, onSubmitResultsFunc]);

	return (
		<Card className='row'>
			<div className='col'>
				<Input
					type='checkbox'
					label='Mobilize'
					id='mobilize-check'
					name='mobilize-check'
					onCheckboxUpdate={pointsUpdateHandler}
					initChecked={props.initChecked}
				/>
			</div>
			<RowScore points={points} />
		</Card>
	);
}

export default MobilizeRow;