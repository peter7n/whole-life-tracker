const HabitRow = (props) => {
	return (
		<div>
			<h2>{props.name}</h2>
			{props.children}
		</div>
	);
}

export default HabitRow;