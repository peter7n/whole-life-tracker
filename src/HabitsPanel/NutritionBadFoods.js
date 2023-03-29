const NutritionBadFoods = (props) => {
	return (
		<div className='row'>
			<div className='col'>
				<div className='card'>
					<ul className="list-group list-group-flush">
						{props.foodArray.length && props.foodArray.map((item, i) => 
							<li className='list-group-item' key={i}>{item.points} {item.food}</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default NutritionBadFoods;