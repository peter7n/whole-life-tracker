const Button = (props) => {
	return (
		<button className='btn btn-secondary mt-3' onClick={props.onClick}>
			{props.label}
		</button>
	);
}

export default Button;