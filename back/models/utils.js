import uuidv1 from 'uuid/v1';
import consola from 'consola'
import { retriveGenders, initGenders } from './gender';

export const isEmpty = (obj) => {
	for (var key in obj) {
		if (obj[key] !== null && obj[key] != "") return false;
	}
    return true;
}

export const generateGenders = async () => {
	const genders = [
		{ _id: uuidv1(), name: 'male' },
		{ _id: uuidv1(), name: 'female' },
		{ _id: uuidv1(), name: 'alien' },
		{ _id: uuidv1(), name: 'helicopter' }
	]
	const query = 'Match (g:Gender) RETURN g'

	const dbGenders =  await retriveGenders();
	
	if (!dbGenders.length) {
		initGenders(genders);
		consola.success("Generated Genders");
	} else {
		consola.info("Genders already generated")
	}
}