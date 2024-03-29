/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';
import Card from '../UI/Card';

const CheckRow = (props) => {
	const [points, setPoints] = useState(0);

	const pointsUpdateHandler = (num) => {
		setPoints(points + num);
		props.onScoreUpdate(num);
	}

	const isFormSubmittedVal = props.isFormSubmitted;
	const onSubmitResultsFunc = props.onSubmitResults;
	
	// === Effects ===

	// Destructure/reassign props to remove 'props' as a dependency in useEffect()
	const initCheckedVal = props.initChecked;
	const propertyVal = props.property;
	
	useEffect(() => {
		if (initCheckedVal.checkState) {
			setPoints(5);
		} else {
			setPoints(0);
		}
	}, [initCheckedVal]);
	
	useEffect(() => {
		if (isFormSubmittedVal) {
			onSubmitResultsFunc(propertyVal, points);
		}
	}, [isFormSubmittedVal, points, onSubmitResultsFunc, propertyVal]);

	return (
		<Card className='row'>
			<div className='col'>
				<Input
					type='checkbox'
					label={props.label}
					id={props.property + '-check'}
					name={props.property + '-check'}
					onCheckboxUpdate={pointsUpdateHandler}
					initChecked={props.initChecked}
				/>
			</div>
			<RowScore points={points} />
		</Card>
	);
}

export default CheckRow;