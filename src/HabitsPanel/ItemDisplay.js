const ItemDisplay = (props) => {
	return (
		<div className='row'>
			<div className='col'>
				<div className='card'>
					<ul className="list-group list-group-flush">
						{props.itemArray.length && props.itemArray.map((item, i) => 
							<li className='list-group-item' key={i}>{item.points} {item.item}</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default ItemDisplay;