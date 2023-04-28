/* === Props ===
 * initChecked: Initial checked state fetched from backend
 * onScoreUpdate: Pass updated habit points to track total score
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';

const HydrateRow = (props) => {
	const [points, setPoints] = useState(0);

	const pointsUpdateHandler = (num) => {
		setPoints(points + num);
		props.onScoreUpdate(num);
	}

	useEffect(() => {
		if (props.isFormSubmitted) {
			props.onSubmitResults('hydrate', points);
		}
	}, [props.isFormSubmitted, points, props]);

	return (
		<div className='row mt-3'>
			<h2>Hydrate</h2>
			<div className='col'>
				<Input
					type='checkbox'
					label='Accomplished'
					id='hydrate-check'
					name='hydrate-check'
					onCheckboxUpdate={pointsUpdateHandler}
					initChecked={props.initChecked}
				/>
			</div>
			<RowScore points={points} />
		</div>
	);
}

export default HydrateRow;