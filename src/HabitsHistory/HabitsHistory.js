import timeConverter from "../Utilities/timeConverter";

const HabitsHistory = (props) => {
	let obj = props.data;
  
	const reverseArr = (arr) => {
		let indexCounter = arr.length - 1;
		let newArr = [];
		for (let i = 0; i < arr.length; i++) {
			newArr[i] = arr[indexCounter];
			indexCounter--;
		}
		return newArr;
	}

	const objVals = Object.values(obj);
	const revObjVals = reverseArr(objVals);

	return (
		revObjVals.map((entry, i) => 
			<div key={i} className="card mb-3">
				<div className="card-header">
					{timeConverter(entry.date)}
				</div>
				<ul className="list-group list-group-flush">
					<li className='list-group-item'>Nutrition: <span className={`badge ${entry.nutrition > 4 ?'text-bg-success' : entry.nutrition < 1 ? 'text-bg-danger' : 'text-bg-secondary'}`}>{entry.nutrition}</span></li>
					<li className='list-group-item'>Noncompliant Foods: {entry.nutrition_noncompliant.map((item, j) => <span key={j}>{item.food}{j === entry.nutrition_noncompliant.length - 1 ? '' : ', '} </span>)}</li>
					<li className='list-group-item'>Exercise: <span className={`badge ${entry.exercise ?'text-bg-success' : 'text-bg-danger'}`}>{entry.exercise}</span></li>
					<li className='list-group-item'>Exercise Notes: {entry.exercise_notes}</li>
					<li className='list-group-item'>Mobilize: <span className={`badge ${entry.mobilize ?'text-bg-success' : 'text-bg-danger'}`}>{entry.mobilize}</span></li>
					<li className='list-group-item'>Sleep: <span className={`badge ${entry.sleep ?'text-bg-success' : 'text-bg-danger'}`}>{entry.sleep}</span></li>
					<li className='list-group-item'>Hydrate: <span className={`badge ${entry.hydrate ?'text-bg-success' : 'text-bg-danger'}`}>{entry.hydrate}</span></li>
					<li className='list-group-item'>Well-Being: <span className={`badge ${entry.wellbeing ?'text-bg-success' : 'text-bg-danger'}`}>{entry.wellbeing}</span></li>
					<li className='list-group-item'>Well-Being Notes: {entry.wellbeing_notes}</li>
					<li className='list-group-item'>Reflect: <span className={`badge ${entry.reflect ?'text-bg-success' : 'text-bg-danger'}`}>{entry.reflect}</span></li>
					<li className='list-group-item'>Reflect Notes: {entry.reflect_notes}</li>
					<li className='list-group-item'>Total Score: <span className={`badge ${entry.total > 24 ?'text-bg-success' : entry.total < 15 ? 'text-bg-danger' : 'text-bg-warning'}`}>{entry.total}</span></li>
				</ul>
			</div>
		)
	);
};

export default HabitsHistory;