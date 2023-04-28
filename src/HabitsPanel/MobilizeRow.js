/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';

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
		<div className='row mt-3'>
			<h2>Mobilize</h2>
			<div className='col'>
				<Input
					type='checkbox'
					label='Accomplished'
					id='mobilize-check'
					name='mobilize-check'
					onCheckboxUpdate={pointsUpdateHandler}
					initChecked={props.initChecked}
				/>
			</div>
			<RowScore points={points} />
		</div>
	);
}

export default MobilizeRow;