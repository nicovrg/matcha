import React, { useState } from 'react';
import api from '../../../api/api'
import { COLORS } from '../../../config/style'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	root: {
		background: COLORS.PURPLE_LIGHT,
		color: COLORS.PURPLE,
		borderRadius: '10px',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

function Gender(props) {
	const classes = useStyles();
	
	const [gender, setGender] = useState(null);
    const [genderList, setGenderList] = useState([]);

	// Get gender names from back 
	const getGender = () => {
		api.get('/user/gender')
		.then((res) => {
			setGender(res.data.name);
		})
		.catch((err) => {
			console.log(err);
		})
	};

	// Open the gender dropdown
	const handleOpenGender = () => {
		props.dropdowns.setOpenGender(!props.dropdowns.openGender);
		props.dropdowns.openOrientation && props.dropdowns.setOpenOrientation(!props.dropdowns.openOrientation);
		props.dropdowns.openHobby && props.dropdowns.setOpenHobby(!props.dropdowns.openHobby);
		if (!genderList.length) {
			api.get('/gender')
			.then((res) => {
				setGenderList(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
		}
	};

	// Post selected gender (id) to server
	const handleChooseGender = (name, id) => {
		let _id = {_id: id};
		api.post('/user/gender', _id)
		.then((res) => {
			handleOpenGender();
		})
		.catch((err) => {
			console.log(err);
		})
	};

	// Create the jsx for the gender selection list
	const genderListJsx = genderList.map(text => {
		return (
			<ListItem button key={text._id} className={classes.nested} value={text._id} onClick={() => handleChooseGender(text.name, text._id)} >
				<ListItemText primary={text.name} />
			</ListItem>
		);
	});

	getGender();

	return (
		<div>
			<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root} >
				<ListItem button onClick={handleOpenGender}>
					<ListItemText primary={ gender ? gender : "gender" } />
					{props.dropdowns.openGender ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={props.dropdowns.openGender} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{ genderListJsx }
					</List>
				</Collapse>
			</List>
		</div>
	);
}

export default Gender;