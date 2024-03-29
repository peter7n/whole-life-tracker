/* === Props ===
 * receiveDate: Passes today's date
 * receiveView: Passes current view selected
 * receiveDateSelected: Passes date selected by user
*/

import DatePicker from './DatePicker';
import ViewPicker from './ViewPicker';
import { useEffect, useState } from 'react';
import styles from './DateBar.module.css';
import timeConverter from '../Utilities/timeConverter';

const DateBar = (props) => {
	let newDate = new Date();
	let day = String(newDate.getDate()).padStart(2, '0');
	let month = String(newDate.getMonth() + 1).padStart(2, '0');
	let year = newDate.getFullYear().toString();
	let todaysDate = year + month + day;

	const [currDate, setCurrDate] = useState(todaysDate);

	const viewPasserHandler = (val) => {
		props.receiveView(val);
	}

	const datePasserHandler = (date) => {
		setCurrDate(date);
		props.receiveDateSelected(date);
	}

	// Pass today's date to parent only on first render
	useEffect(() => {
			props.receiveDate(todaysDate);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [todaysDate]);

	return (
		<div className='row mb-3'>
			<div className={`text-center ${styles.date}`}>{timeConverter(currDate)}</div>
			<DatePicker onDateSubmit={datePasserHandler} />
			<ViewPicker onViewChange={viewPasserHandler} />
		</div>
	);
}

export default DateBar;