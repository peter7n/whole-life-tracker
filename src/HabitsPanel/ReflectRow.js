import { useState } from 'react';
import HabitRow from '../UI/HabitRow';
import Input from '../UI/Input';

const ReflectRow = () => {
	const [reflectChecked, setReflectChecked] = useState(false);
	const [reflectNotes, setReflectNotes] = useState('');

	return (
		<HabitRow name="Reflect">
			<Input type="checkbox" label="Accomplished" id="reflect-check" />
			<Input type="textarea" label="Notes" id="reflect-text" />
		</HabitRow>
	);
}

export default ReflectRow;