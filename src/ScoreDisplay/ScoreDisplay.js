const ScoreDisplay = (props) => {
	return (
		<div className="mt-3">
			<p className='badge text-bg-success' style={{fontSize: 20}}>Total: {props.score}</p>
		</div>
	);
}

export default ScoreDisplay;