import styles from '../HabitsPanel/RowScore.module.css';

const ScoreDisplay = (props) => {
	return (
		<div className={`mt-4 mb-4 text-center ${styles['wlc-badge']}`}>
			<span className={`badge ${styles.badge} ${props.score > 24 ? styles['wlc-success'] : props.score < 15 ? styles['wlc-danger'] : styles['wlc-secondary']}`}>Total: {props.score}</span>
		</div>
	);
}

export default ScoreDisplay;