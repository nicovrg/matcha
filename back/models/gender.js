import uuidv1 from 'uuid/v1';
import { mode, session, closeBridge } from '../middleware/session'

export const retriveGenders = async () => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (g:Gender) RETURN g';

	const Genders = []
	await dbSession.session.run(query).then(res => {
		res.records.forEach(record => {
			let {_id, name} = record._fields[0].properties;
			let gender = {_id, name};
			Genders.push(gender);
		});
		closeBridge(dbSession);
	}).catch (e => console.log(e));
	return Genders;
}

export const setGender = async (user, genderId) => {
	const dbSession = session(mode.READ);
	const query = 'MATCH (u:User) WHERE u._id = $userId MATCH (g:Gender) WHERE g._id = $genderId CREATE (g)-[:TYPE]->(u)';
	await dbSession.session.run(query, {userId: user._id, genderId: genderId}).then(res => closeBridge(dbSession))
	.catch (e => console.log(e));
}