const ScoreDisplay = (props) => {
	return (
		<div className="mt-3">
			<p className={`badge ${props.score > 24 ?'text-bg-success' : props.score < 15 ? 'text-bg-danger' : 'text-bg-warning'}`} style={{fontSize: 20}}>Total: {props.score}</p>
		</div>
	);
}

export default ScoreDisplay;