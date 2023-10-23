const timeConverter = (dateId) => {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var year = dateId.substring(0,4);
	var month = months[Number(dateId.substring(4,6) - 1)];
	var date = dateId.substring(6);
	var time = month + ' ' + date + ', ' + year;
	return time;
 }

 export default timeConverter;