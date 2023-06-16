import styles from '../HabitsPanel/RowScore.module.css';

const ScoreDisplay = (props) => {
	return (
		<div className={`mt-3 ${styles['wlc-badge']}`}>
			<span className={`badge ${styles.badge} ${props.score > 24 ? styles['wlc-success'] : props.score < 15 ? styles['wlc-danger'] : styles['wlc-secondary']}`} style={{fontSize: 20}}>Total: {props.score}</span>
		</div>
	);
}

export default ScoreDisplay;