function sortProximity(userPosition, ascending, descending, a, b) {
	let latDiff_A = userPosition.latitude - a.location.lat;
	let lngDiff_A = userPosition.longitude - a.location.lng;
	let latDiff_B = userPosition.latitude - b.location.lat;
	let lngDiff_B = userPosition.longitude - b.location.lng;

	let scoreA = latDiff_A + lngDiff_A;
	let scoreB = latDiff_B + lngDiff_B;

	if (ascending === true)
		return (scoreA - scoreB);
	else
		return (scoreB - scoreA);
}

export default sortProximity;