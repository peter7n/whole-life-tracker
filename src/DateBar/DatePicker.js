const DatePicker = () => {
	return (
		<div>
			<form>
				<label for="date">Select Date</label>
				<select name="date" id="date">
					<option value="January 28, 2023">January 28, 2023</option>
					<option value="January 27, 2023">January 27, 2023</option>
					<option value="January 26, 2023">January 26, 2023</option>
				</select>
			</form>
		</div>
	);
}

export default DatePicker;