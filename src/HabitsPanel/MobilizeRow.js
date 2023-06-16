/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';
import Card from '../UI/Card';
import styles from '../UI/Input.module.css';

const MobilizeRow = (props) => {
	const [points, setPoints] = useState(0);

	const pointsUpdateHandler = (num) => {
		setPoints(points + num);
		props.onScoreUpdate(num);
	}

	useEffect(() => {
		if (props.isFormSubmitted) {
			props.onSubmitResults('mobilize', points);
		}
	}, [props.isFormSubmitted, points, props]);

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