import DatePicker from './DatePicker';
import ViewPicker from './ViewPicker';
import { useEffect } from 'react';

const DateBar = (props) => {
	let currentDate = new Date();
	let day = String(currentDate.getDate()).padStart(2, '0');
	let month = String(currentDate.getMonth() + 1).padStart(2, '0');
	let year = currentDate.getFullYear().toString();
	let dateId = year + month + day;

	useEffect(() => {
		props.receiveDate(dateId);
	}, [dateId, props]);

	return (
		<div>
			<p>{year}.{month}.{day}</p>
			<DatePicker />
			<ViewPicker />
		</div>
	);
}

export default DateBar;