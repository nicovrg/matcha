import neo4j from 'neo4j-driver';

const driver = neo4j.driver(process.env.DB_URL, neo4j.auth.basic(process.env.DB_USR, process.env.DB_PWD));

const getSession = () => {
	return driver.session();
}

export default getSession;