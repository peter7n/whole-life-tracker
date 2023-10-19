/* === Props ===
 * initFoodAray: Initial array of noncompliant foods fetched from backend
 * initPoints: Initial points fetched from backend
 * arePointsFetched: Used to set the correct total score if initial points were fetched
 * onScoreUpdate: Updates the total score
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect, useMemo } from 'react';
import Select from '../UI/Select';
import Input from '../UI/Input';
import RowScore from './RowScore';
import Button from '../UI/Button';
import NutritionBadFoods from './NutritionBadFoods';
import Card from '../UI/Card';

const NutritionRow = (props) => {
	const valOptions = [
		{ text: '-1', value: -1 },
		{ text: '-2', value: -2 },
		{ text: '-3', value: -3 },
		{ text: '-4', value: -4 },
		{ text: '-5', value: -5 }
	];

	// === States ===
	const [points, setPoints] = useState(5);
	const [badFoodPoint, setBadFoodPoint] = useState(-1);
	const [badFood, setBadFood] = useState('');
	const [foodArray, setFoodArray] = useState([]);
	const [clearText, setClearText] = useState(false);

	// === Handlers ===
	const nutritionAddHandler = (event) => {
		event.preventDefault();
		let foodEntry = {
			points: badFoodPoint,
			food: badFood,
		};
		setFoodArray((prevArr) => {
			return [...prevArr, foodEntry];
		});
		setPoints(points + +badFoodPoint);
		props.onScoreUpdate(+badFoodPoint);
		setClearText(true); // clear the text input field

		console.log(foodArray);
	};

	const badFoodPointHandler = (num) => {
		setBadFoodPoint(num);
	};

	const badFoodHandler = (text) => {
		setBadFood(text);
	};

	const resetClearTextHandler = (bool) => {
		setClearText(bool);
	};

	// === Effects ===

	// Destructure/reassign props to remove 'props' as a dependency in useEffect()
	const initPointsVal = props.initPoints;
	const initFoodArrayVal = useMemo(() => {
		return [...props.initFoodArray];
	}, [props.initFoodArray]);
	// const arePointsFetchedVal = props.arePointsFetched;
	const onScoreUpdateFunc = props.onScoreUpdate;
	const isFormSubmittedVal = props.isFormSubmitted;
	const submitResultsFunc = props.onSubmitResults;

	// Set initial points and food array fetched from backend
	useEffect(() => {
		setPoints(initPointsVal);
		setFoodArray(initFoodArrayVal);
		console.log('food init points: ' + initPointsVal);
		// If existing points were fetched, subtract 5 from score so initial points aren't counted
		// if (arePointsFetchedVal) {
		onScoreUpdateFunc(initPointsVal);
		// } else {
		// 	onScoreUpdateFunc(initPointsVal);
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initPointsVal, initFoodArrayVal]);

	// Submit nutrition data on form submit
	useEffect(() => {
		if (isFormSubmittedVal) {
			submitResultsFunc(
				'nutrition',
				points,
				'nutrition_noncompliant',
				foodArray
			);
		}
	}, [isFormSubmittedVal, submitResultsFunc, points, foodArray]);

	return (
		<Card className="row">
			<h2>Nutrition</h2>
			<div className="col">
				<Select
					id="nutrition-select"
					name="nutritition-select"
					label="Points"
					initValue="-1"
					valueOptions={valOptions}
					onSelectUpdate={badFoodPointHandler}
				/>
			</div>
			<div className="col">
				<Input
					type="text"
					id="nutrition-text"
					label="Non-Compliant Food"
					onTextUpdate={badFoodHandler}
					clearText={clearText}
					onClearText={resetClearTextHandler}
				/>
			</div>
			<div className="col-xsm-12">
				<Button label="Add" onClick={nutritionAddHandler} />
			</div>
			{foodArray.length > 0 && (
				<div className="mt-3">
					<NutritionBadFoods foodArray={foodArray} />
				</div>
			)}
			<RowScore points={points} />
		</Card>
	);
};

export default NutritionRow;
