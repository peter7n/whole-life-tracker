/* === Props ===
 * initFoodAray: Initial array of noncompliant foods fetched from backend
 * initPoints: Initial points fetched from backend
 * arePointsFetched: Used to set the correct total score if initial points were fetched
 * onScoreUpdate: Updates the total score
 * isFormSubmitted: True when the entire form is submitted
 * onSubmitResults: Submits results to the parent component
 */

import { useState, useEffect } from 'react';
import Select from '../UI/Select';
import Input from '../UI/Input';
import RowScore from './RowScore';
import Button from '../UI/Button';
import NutritionBadFoods from './NutritionBadFoods';
import Card from '../UI/Card';

const NutritionRow = (props) => {
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
			food: badFood
		};
		setFoodArray((prevArr) => {
			return [...prevArr, foodEntry];
		});
		setPoints(points + +badFoodPoint);
		props.onScoreUpdate(+badFoodPoint);
		setClearText(true);	// clear the text input field

		console.log(foodArray);
	};

	const badFoodPointHandler = (num) => {
		setBadFoodPoint(num);
	}

	const badFoodHandler = (text) => {
		setBadFood(text);
	}

	const resetClearTextHandler = (bool) => {
		setClearText(bool);
	}

	// === Effects ===
	useEffect(() => {
		if (props.isFormSubmitted) {
			props.onSubmitResults('nutrition', points, 'nutrition_noncompliant', foodArray);
		}
	}, [props.isFormSubmitted, points, foodArray, props]);
	
	// Set initial points and food array fetched from backend
	useEffect(() => {
		setPoints(props.initPoints);
		setFoodArray(props.initFoodArray);
		console.log('food init points: ' + props.initPoints);
		// If existing points were fetched, subtract 5 from score so initial points aren't counted
		if (props.arePointsFetched) {
			props.onScoreUpdate(props.initPoints - 5);
		} else {
			props.onScoreUpdate(props.initPoints);
		}
	}, [props.initPoints, props.initFoodArray]);
	
	return (
		<Card className='row'>
			<h2>Nutrition</h2>
			<div className='col'>
				<Select
					id='nutrition-select'
					name='nutritition-select'
					label='Points'
					initValue='-1'
					valueOptions={[-1, -2, -3, -4, -5]}
					onSelectUpdate={badFoodPointHandler}
				/>
			</div>
			<div className='col'>
				<Input
					type='text'
					id='nutrition-text'
					label='Non-Compliant Food'
					onTextUpdate={badFoodHandler}
					clearText={clearText} 
					onClearText={resetClearTextHandler}
				/>
			</div>
			<div className='col-xsm-12'>
				<Button
					label='Add'
					onClick={nutritionAddHandler}
				/>
			</div>
			{foodArray.length > 0 && <div className='mt-3'>
				<NutritionBadFoods 
					foodArray={foodArray}
				/>
			</div>}
			<RowScore points={points} />
		</Card>
	);
}

export default NutritionRow;