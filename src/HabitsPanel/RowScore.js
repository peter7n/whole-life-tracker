import styles from './RowScore.module.css';

const RowScore = (props) => {
	return (
		<div className={`mt-3 ${styles['wlc-badge']}`}>
			<span className={`badge ${styles.badge} ${props.points > 4 ? styles['wlc-success'] : props.points < 1 ? styles['wlc-danger'] : styles['wlc-secondary']}`}>{props.points}</span>{props.points > 4 ? <span className={styles.text}>Accomplished!</span> : ''}
		</div>
	);
}

export default RowScore;