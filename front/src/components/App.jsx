import React, { useState } from 'react';

import Connexion from './Connexion/Connexion';
import Application from './Application/Application';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

function App() {

	const [userIsLog, setUserIsLog] = useState(`dulebi`);

	userIsLog == false && localStorage.token && setUserIsLog(true);

	if (userIsLog === false)	
		return <Connexion />;
	else if (userIsLog === true)
		return <Application />;
	return <Application />;
}

export default App;

/*
use ...state because setState overwrite ancient state ()
	const eventHandler = (value) => {
		setState({ ...state, property: value})
	}
*/


	// const [user, setUser] = useState({
	// 	isLog: 0,
	// 	username: null,
	// 	message: null,
	// 	notification: null
	// });

	// const HandleUserConnexion = (e) => {
	// 	console.log("here and now");
	// 	setUser( ...user, user.isLog = 1);
	// 	console.log(`is user log? ${user.isLog}`);
	// }