const TextArea = (props) => {
	return (
		<div className='mt-3'>
			<label className='form-label' htmlFor={props.id}>{props.label}</label>
			<textarea 
				className='form-control' 
				rows='3' 
				id={props.id} 
				name={props.id} 
				onChange={props.onChange} 
				value={props.value} 
			>
			</textarea>
		</div>
	);
}

export default TextArea;