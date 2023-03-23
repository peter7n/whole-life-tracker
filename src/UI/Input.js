const Input = (props) => {
	return (
		<div className={`${props.type === 'checkbox' ? 'form-check' : ''}`}>
			<label className={`${props.type === 'checkbox' ? 'form-check-label' : ''}`} htmlFor={props.id}>{props.label}</label>
			<input 
				className={`${props.type === 'checkbox' ? 'form-check-input' : props.type === 'radio' ? 'btn-check' : 'form-control'}`}
				type={props.type} 
				id={props.id} 
				name={props.id} 
				value={props.value} 
				onChange={props.onChange}
				checked={props.checked}
			/>
		</div>
	);

}

export default Input;