const HabitsHistory = (props) => {
	return (
		props.data.map((entry) => 
        <p>
          {entry.date}<br />
          Nutrition: {entry.nutrition}<br />
          Noncompliant Foods: {entry.nutrition_noncompliant.map((item) => <span>{item.food}, </span>)}<br />
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