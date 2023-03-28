import { useState, useEffect } from 'react';
import Input from '../UI/Input';
import RowScore from './RowScore';

const MobilizeRow = (props) => {
	const [points, setPoints] = useState(0);

	const pointsUpdateHandler = (num) => {
		setPoints(points + num);
	}

	useEffect(() => {
		if (props.isFormSubmitted) {
			console.log('MOBILIZE inside useEffect');
			props.onSubmitResults('mobilize', points);
		}
	}, [props.isFormSubmitted, points, props]);

	return (
		<div>
			<h2>Mobilize</h2>
			<Input
				type='checkbox'
				label='Accomplished'
				id='mobilize-check'
				name='mobilize-check'
				onCheckboxUpdate={pointsUpdateHandler}
				initChecked={props.initChecked}
			/>
			<RowScore points={points} />
		</div>
	);
}

export default MobilizeRow;