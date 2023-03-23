const Select = (props) => {
	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<select 
				className='form-select' 
				name={props.id} 
				id={props.id} 
				value={props.value} 
				onChange={props.onChange}
			>
				{props.valueOptions.map((val, i) =>
					<option key={i}>{val}</option>
				)}
			</select>
		</div>
	);
}

export default Select;