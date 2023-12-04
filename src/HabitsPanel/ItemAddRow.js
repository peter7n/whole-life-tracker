/* === Props ===
 * initTextInputArray: Initial array of items fetched from backend
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
import ItemDisplay from './ItemDisplay';
// import NutritionBadFoods from './NutritionBadFoods';
import Card from '../UI/Card';

const ItemAddRow = (props) => {
	// === States ===
	const [points, setPoints] = useState(5);
	const [selectPoint, setSelectPoint] = useState(props.selectInitValue);
	const [textInput, setTextInput] = useState('');
	const [textInputArray, setTextInputArray] = useState([]);
	const [clearText, setClearText] = useState(false);

	// === Handlers ===
	const itemAddHandler = (event) => {
		event.preventDefault();
		let item = {
			points: selectPoint,
			item: textInput,
		};
		setTextInputArray((prevArr) => {
			return [...prevArr, item];
		});
		setPoints(points + +selectPoint);
		props.onScoreUpdate(+selectPoint);
		setClearText(true); // clear the text input field

		console.log(textInputArray);
	};

	const selectPointHandler = (num) => {
		setSelectPoint(num);
	};

	const textInputHandler = (text) => {
		setTextInput(text);
	};

	const resetClearTextHandler = (bool) => {
		setClearText(bool);
	};

	// === Effects ===

	// Destructure/reassign props to remove 'props' as a dependency in useEffect()
	const initPointsVal = props.initPoints;
	const initTextInputArrayVal = useMemo(() => {
		return [...props.initTextInputArray];
	}, [props.initTextInputArray]);
	// const arePointsFetchedVal = props.arePointsFetched;
	const onScoreUpdateFunc = props.onScoreUpdate;
	const isFormSubmittedVal = props.isFormSubmitted;
	const submitResultsFunc = props.onSubmitResults;
	const propertyVal = props.property;
	const property2Val = props.property2;

	// Set initial points and item array fetched from backend
	useEffect(() => {
		setPoints(initPointsVal);
		setTextInputArray(initTextInputArrayVal);
		console.log('item init points: ' + initPointsVal);
		// If existing points were fetched, subtract 5 from score so initial points aren't counted
		// if (arePointsFetchedVal) {
		onScoreUpdateFunc(initPointsVal);
		// } else {
		// 	onScoreUpdateFunc(initPointsVal);
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initPointsVal, initTextInputArrayVal]);

	// Submit data on form submit
	useEffect(() => {
		if (isFormSubmittedVal) {
			submitResultsFunc(
				propertyVal,
				points,
				property2Val,
				textInputArray
			);
		}
	}, [isFormSubmittedVal, submitResultsFunc, points, textInputArray, propertyVal, property2Val]);

	return (
		<Card className="row">
			<h2>Nutrition</h2>
			<div className="col">
				<Select
					id={props.property + '-select'}
					name={props.property + '-select'}
					label={props.selectLabel}
					initValue={props.selectInitValue}
					valueOptions={props.selectValOptions}
					onSelectUpdate={selectPointHandler}
				/>
			</div>
			<div className="col">
				<Input
					type="text"
					id={props.property + '-text'}
					label={props.textLabel}
					onTextUpdate={textInputHandler}
					clearText={clearText}
					onClearText={resetClearTextHandler}
				/>
			</div>
			<div className="col-xsm-12">
				<Button label="Add" onClick={itemAddHandler} />
			</div>
			{textInputArray.length > 0 && (
				<div className="mt-3">
					<ItemDisplay itemArray={textInputArray} />
				</div>
			)}
			<RowScore points={points} />
		</Card>
	);
};

export default ItemAddRow;
