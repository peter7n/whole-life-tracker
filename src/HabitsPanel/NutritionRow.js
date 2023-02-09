import { useState } from 'react';
import HabitRow from '../UI/HabitRow';
import Input from '../UI/Input';

const NutritionRow = (props) => {
	const [pointsSelected, setPointsSelected] = useState('-1');
	const [enteredFood, setEnteredFood] = useState('');
	const [foodArray, setFoodArray] = useState([]);
	const [nutritionPoints, setNutritionPoints] = useState(5);

	const pointsSelectHandler = (event) => {
		setPointsSelected(event.target.value);
	}

	const foodEnteredHandler = (event) => {
		setEnteredFood(event.target.value);
	}
	
	const clickHandler = (event) => {
		event.preventDefault(); // prevent form submission
		let foodEntry = {
			points: pointsSelected,
			food: enteredFood
		};
		let updatedArray = [foodEntry, ...foodArray];
		let updatedPoints = nutritionPoints + +pointsSelected;

		setFoodArray((prevFoodArray) => {
			return [foodEntry, ...prevFoodArray];
		});
		setNutritionPoints(updatedPoints);
		props.onScoreUpdate('NUTRITION', updatedPoints, updatedArray);
	};
	
	return (
		<HabitRow name="Nutrition">
			<Input
				type="select"
				id="nutrition-select"
				label="Pts"
				value={pointsSelected}
				onChange={pointsSelectHandler} />
			<Input
				type="text"
				id="nutrition-text"
				label="Food"
				value={enteredFood}
				onChange={foodEnteredHandler} />
			<button onClick={clickHandler}>Add</button>
			<p>{nutritionPoints}</p>
		</HabitRow>
	);
}

export default NutritionRow;