import React from 'react';
import {Notification, Container} from 'react-bulma-components';
import './Homepage.css';

class Homepage extends React.Component {
	render () {
		return (
			<div id="homepage">
			<Container style={{ color: '#000', background: '#000'}}>
				<Notification>
					This container is <strong>centered</strong> on desktop
				</Notification>
			</Container>
			</div>
		)
	}
}

export default Homepage;