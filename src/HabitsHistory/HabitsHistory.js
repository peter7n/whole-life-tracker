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
      <p key={i}>
        {entry.date}<br />
        Nutrition: {entry.nutrition}<br />
        Noncompliant Foods: {entry.nutrition_noncompliant.map((item, j) => <span key={j}>{item.food}, </span>)}<br />
        Exercise: {entry.exercise}<br />
        Exercise Notes: {entry.exercise_notes}<br />
        Mobilize: {entry.mobilize}<br />
        Sleep: {entry.sleep}<br />
        Hydrate: {entry.hydrate}<br />
        Well-Being: {entry.wellbeing}<br />
        Well-Being Notes: {entry.wellbeing_notes}<br />
        Reflect: {entry.reflect}<br />
        Reflect Notes: {entry.reflect_notes}<br />
        Total Score: {entry.total}<br />
      </p>
    )
	);
};

export default HabitsHistory;