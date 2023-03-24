import { Fragment } from 'react';

const Input = (props) => {
	// Return radio input
	if (props.type === 'radio') {
		return (
			<Fragment>
				<input 
					type="radio" 
					className="btn-check" 
					name={props.name} 
					id={props.id}
					autoComplete="off"
					onChange={props.onChange}
					checked={props.checked}
				></input>
				<label className={`btn ${props.className}`} htmlFor={props.id}>{props.label}</label>				
			</Fragment>
		);
	}
	
	// Return checkbox or text input
	return (
		<div className={`${props.type === 'checkbox' ? 'form-check' : ''}`}>
			<label className={`${props.type === 'checkbox' ? 'form-check-label' : ''}`} htmlFor={props.id}>{props.label}</label>
			<input 
				className={`${props.type === 'checkbox' ? 'form-check-input' : props.type === 'radio' ? 'btn-check' : 'form-control'}`}
				type={props.type} 
				id={props.id} 
				name={props.name} 
				value={props.value} 
				onChange={props.onChange}
				checked={props.checked}
			/>
		</div>
	);

}

export default Input;