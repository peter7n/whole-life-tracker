import { useState, useEffect, Fragment } from 'react';
import Select from '../UI/Select';
import Input from '../UI/Input';
import RowScore from './RowScore';
import Button from '../UI/Button';
import NutritionBadFoods from './NutritionBadFoods';

const NutritionRow = (props) => {
	// === States ===
	const [points, setPoints] = useState(props.initPoints);
	const [badFoodPoint, setBadFoodPoint] = useState(-1);
	const [badFood, setBadFood] = useState('');
	const [foodArray, setFoodArray] = useState(props.initFoodArray);
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
	}, [props.initPoints, props.initFoodArray]);
	
	return (
		<Fragment>
			<h2>Nutrition</h2>
			<div className='col'>
				<Select
					id='nutrition-select'
					name='nutritition-select'
					label='Pts'
					initValue='-1'
					valueOptions={[-1, -2, -3, -4, -5]}
					onSelectUpdate={badFoodPointHandler}
				/>
			</div>
			<div className='col'>
				<Input
					type='text'
					id='nutrition-text'
					label='Food'
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
			<NutritionBadFoods 
				foodArray={foodArray}
			/>
			<RowScore points={points} />
		</Fragment>
	);
}

export default NutritionRow;