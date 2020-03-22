function sortHobby(userHobbies, a, b) {
	let resultA = 0;
		let resultB = 0;
		if (userHobbies && userHobbies.length) {
			userHobbies.map(userHobby => {
				a.hobbies.map(compareHobby => {
					if (userHobby.name === compareHobby.name)
						resultA++;
				})
			})
			userHobbies.map(userHobby => {
				b.hobbies.map(compareHobby => {
					if (userHobby.name === compareHobby.name)
						resultB++;
				})
			})

		}
		console.log(resultA - resultB);
		return (resultA - resultB);
}

export default sortHobby;