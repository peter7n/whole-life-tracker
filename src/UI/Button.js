const Button = (props) => {
	// const buttonClickHandler = (event) => {
	// 	event.preventDefault(); // prevent form submission
	// 	props.buttonOnClick(selectSelected, enteredText);
	// 	setEnteredText('');		// clear text field
	// }

	return (
		<button className='btn btn-secondary mt-3' onClick={props.onClick}>
			{props.label}
		</button>
	);
}

export default Button;