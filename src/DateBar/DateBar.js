import DatePicker from './DatePicker';
import ViewPicker from './ViewPicker';
import { useEffect, useState } from 'react';

const DateBar = (props) => {
	let currentDate = new Date();
	let day = String(currentDate.getDate()).padStart(2, '0');
	let month = String(currentDate.getMonth() + 1).padStart(2, '0');
	let year = currentDate.getFullYear().toString();
	let dateId = year + month + day;

	const [viewVal, setViewVal] = useState('');
	const viewPasserHandler = (val) => {
		setViewVal(val);
	}

	useEffect(() => {
		props.receiveDate(dateId);
	}, [dateId, props]);

	useEffect(() => {
		props.receiveView(viewVal);
	}, [viewVal, props]);

	return (
		<div>
			<p>{year}.{month}.{day}</p>
			<DatePicker />
			<ViewPicker onViewChange={viewPasserHandler} />
		</div>
	);
}

export default DateBar;