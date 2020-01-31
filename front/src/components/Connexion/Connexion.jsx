import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { SnackbarProvider } from 'notistack';

import Signup from '../../containers/Signup/Signup';
import Login from '../../containers/Login/Login';
import Logout from '../Logout/Logout';
import NoMatch from '../NoMatch/NoMatch';

function Connexion() {
	return (
		<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/logout" component={Logout} />
				<Route path="*" component={NoMatch} />
			</Switch>
		</BrowserRouter>
		</SnackbarProvider>
	);
}

export default Connexion;