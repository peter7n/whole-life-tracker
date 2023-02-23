const HabitsHistory = (props) => {
  // let keyDate = Date.now();

  return (
		props.data.map((entry, i) => 
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