import { Fragment } from 'react';

const Input = (props) => {
	let inputHtml = '';

	const checkbox =
		<div>
			<label htmlFor="{props.id}">{props.label}</label>
			<input type="checkbox" id="{props.id}" name="{props.id}" onChange={props.onChange} />
		</div>;

	const textarea =
		<div>
			<label htmlFor="props.id">{props.label}</label>
			<textarea id="props.id" name="props.id" onChange={props.onChange} ></textarea>
		</div>;

	const text =
		<div>
			<label htmlFor="props.id">{props.label}</label>
			<input type="text" id="props.id" name="props.id" />
		</div>;

	const select =
		<div>
			<label htmlFor="props.id">{props.label}</label>
			<select name="props.id" id="props.id">
				<option value="1">-1</option>
				<option value="2">-2</option>
				<option value="3">-3</option>
				<option value="3">-4</option>
				<option value="3">-5</option>
			</select>
		</div>;

	const submit =
		<div>
			<input type="submit" value="submit" />
		</div>;

	if (props.type === 'checkbox') {
		inputHtml = checkbox;
	} else if (props.type === 'textarea') {
		inputHtml = textarea;
	} else if (props.type === 'text') {
		inputHtml = text;
	} else if (props.type === 'select') {
		inputHtml = select;
	} else if (props.type === 'submit') {
		inputHtml = submit;
	}

	return (
		<Fragment>
			{inputHtml}
		</Fragment>
	);
}

export default Input;