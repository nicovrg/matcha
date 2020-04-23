function sortPopularity(ascending, descending, a, b) {
	if (ascending === true)
		return (a.populairty - b.populairty);
	else if (descending === true)
		return (b.populairty - a.populairty);
	else
		return (1);
}

export default sortPopularity;