const RowScore = (props) => {
	return (
		<div className='mt-3' style={{fontSize: 30}}><p className={`badge ${props.points > 4 ?'text-bg-success' : props.points < 1 ? 'text-bg-danger' : 'text-bg-secondary'}`}>{props.points}</p></div>
	);
}

export default RowScore;