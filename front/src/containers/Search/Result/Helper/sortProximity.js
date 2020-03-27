function sortProximity(userPosition, ascending, descending, a, b) {
	let latDiff_A = userPosition.latitude - a.location.lat;
	let lngDiff_A = userPosition.longitude - a.location.lng;
	let latDiff_B = userPosition.latitude - b.location.lat;
	let lngDiff_B = userPosition.longitude - b.location.lng;
	
	let scoreA = latDiff_A + lngDiff_A;
	let scoreB = latDiff_B + lngDiff_B;

	if (scoreA >= scoreB && ascending === true)
		return (1);
	else
		return (-1);
	if (scoreA >= scoreB && descending === true)
		return (-1);
	else
		return (1);
}

export default sortProximity;