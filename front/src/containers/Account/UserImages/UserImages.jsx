import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import api from '../../../api/api'
import {COLORS} from '../../../config/style'

import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const useStyles = makeStyles({
	root: {
		background: '#FF3860',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
	setProfile: {
		background: '#FF3860',
	}, delete: {
		background: '#FF3860',
	}
});

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const UserImagesJsxContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const StyledInput = styled.input`
	display: inline-block;
	width: 100%;
	margin: 8px 0;
	padding: 12px 20px;
	border: 1px solid;
	border-radius: 4px;
	box-sizing: border-box;
	background-color: ${COLORS.PURPLE_LIGHT};
`

const ModalContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const StyledButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${COLORS.WHITE};
	background-color: ${COLORS.PINK_FLASHY};
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	:hover {
		transform: scale(1.05);
	}
`

const ExitButton = styled.button`
	position: absolute;
	background: #FF3860;
	top: 2.5%;
	right: 2.5%;
	border: solid;
	border-radius: 30%;
`

const IsProfilePic = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #32CD32;
	top: 1.5%;
	left: 5%;
	border: solid;
	border-radius: 30%;
`

const CarouselContainer = styled.div`
	width: 100%;
	height: 100%;
`

const UploadContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1em;
`

function UserImages() {
	const classes = useStyles();
	
	const [userPictures, setUserPictures] = useState([]);
	const [selectedFile, setSelectedFile] = useState();
	const [selectedPicture, setSelectedPicture] = useState(undefined);

	useEffect(() => {
		getUserPictures();
	}, []);

	// Add a picture in the application state
	const addPictureFile = (e) => {
		if (e.target.files[0].name)
		setSelectedFile({
			...selectedFile, 
			file: e.target.files[0],
			loaded: 0,
		});	
	}

	// Upload the picture from app to server
	const uploadPicture = () => {
		if (selectedFile && selectedFile.file) {
			if (userPictures.length < 5) {
				const data = new FormData()
				data.append('picture', selectedFile.file, {})
				api.post('/user/picture', data)
				.then((res) => {getUserPictures();})
				.catch((err) => {console.log(err);})
			} else
				alert('you cant have more than 5 pictures');
		}
	}

	const getUserPictures = () => {
		api.get('/user/picture')
		.then((res) => {setUserPictures(res.data);})
		.catch((err) => {console.log(err);})
	}

	const setProfilePicture = (id) => {
		api.post('/user/profile', { _id: id })
		.then((res) => {
			getUserPictures();
			setSelectedPicture();
		})
		.catch((err) => {
			console.log(err);
		})
	}

	const deleteUserPicture = (id) => {
		setSelectedPicture();
		api.delete('/user/picture', { data: { _id: id } })
		.then((res) => {getUserPictures();})
		.catch((err) => {console.log(err);})
	}

	const userImagesArray = userPictures.map((text, index) =>
		<div onClick={() => openModal(text._id)} key={text.name} >
			<img id={`profile-image-${index}`} src={text.url} alt={text.name} key={text.name} />
		</div>
	);

	const openModal = (id) => {
		setSelectedPicture(userPictures.filter(userPicture => userPicture._id === id)[0]);
	}

	const PictureModal = (props) => {
		return (
			<ModalContainer>
				<img src={props.image.url} alt=""/>
				<ButtonContainer>
					<StyledButton type="button" className={classes.setProfile} onClick={() => setProfilePicture(props.image._id)}>Set as profile</StyledButton> 
					<StyledButton type="button" className={classes.delete} style={{marginTop: '1em'}} onClick={() => deleteUserPicture(props.image._id)}>Delete</StyledButton> 
					{!!props.image.isPP && 
					<IsProfilePic>
						<AccountCircle/>
					</IsProfilePic>}
					<ExitButton onClick={() => setSelectedPicture(undefined)}>X</ExitButton> 
				</ButtonContainer>
			</ModalContainer>
		);
	}
	
	const UserImagesJsx = () => {
		return (
			<CarouselContainer>
					<Carousel showThumbs={false} showArrows={true} useKeyboardArrows={true} emulateTouch={true}>
						{ userImagesArray }
					</Carousel>
			</CarouselContainer>
		);
	}

	return (
		<MainContainer>
			{ selectedPicture && <PictureModal image={selectedPicture}/> }
			<UserImagesJsxContainer>
				{ !!userPictures.length && <UserImagesJsx /> }
			</UserImagesJsxContainer>
			<UploadContainer>
				{ userPictures.length < 5 && <StyledInput type="file" accept="image/*" name="file" label="pic" onChange={addPictureFile}/> }
				{ userPictures.length < 5 && <StyledButton type="button" className={classes.root} onClick={uploadPicture}>Upload</StyledButton> }
			</UploadContainer>
		</MainContainer>
	);
}

export default UserImages;
