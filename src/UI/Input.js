import { Fragment } from 'react';

const Input = (props) => {
	let inputHtml = '';

	const checkbox =
		<div className='form-check'>
			<label className='form-check-label' htmlFor={props.id}>{props.label}</label>
			<input className='form-check-input' type="checkbox" id={props.id} name={props.id} onChange={props.onChange} checked={props.checked} />
		</div>;

	const textarea =
		<div className='mt-3'>
			<label className='form-label' htmlFor={props.id}>{props.label}</label>
			<textarea className='form-control' rows='3' id={props.id} name={props.id} onChange={props.onChange} value={props.value} ></textarea>
		</div>;

	const text =
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<input className='form-control' type="text" id={props.id} name={props.id} value={props.value} onChange={props.onChange} />
		</div>;

	const select =
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<select className='form-select' name={props.id} id={props.id} value={props.value} onChange={props.onChange}>
				{props.valueOptions && props.valueOptions.map((val, i) =>
					<option key={i}>{val}</option>
				)}
			</select>
		</div>;

	const submit =
		<div>
			<input className='btn btn-primary' type="submit" value="submit" id={props.id} />
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