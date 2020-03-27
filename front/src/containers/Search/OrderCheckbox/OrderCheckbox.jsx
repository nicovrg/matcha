import React, { useState } from "react";
import styled from "styled-components";

import { TextWrapper } from "../../../components/Wrapper/Wrapper.jsx";
import { Checkbox } from "@material-ui/core";

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50vw;
`

const CheckboxContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

function OrderCheckbox(props) {
	
	const handleAscending = (e) => {!props.ascending && !props.descending ? props.setAscending(true) : props.setAscending(false);}
	const handleDescending = (e) => {!props.descending && !props.ascending ? props.setNo(true) : props.setNo(false);}

	return (
		<MainContainer>
			<CheckboxContainer>
				<TextWrapper id="placeholder">ascending</TextWrapper>
				<Checkbox id="checkbox" checked={props.Ascending} onChange={handleAscending} value="test" style={{color: "#FFF", marginLeft: "auto"}}/>
			</CheckboxContainer>
			<CheckboxContainer>
				<TextWrapper id="placeholder">descending</TextWrapper>
				<Checkbox id="checkbox" checked={props.descending} onChange={handleDescending} value="test" style={{color: "#FFF", marginLeft: "auto"}}/>
			</CheckboxContainer>
		</MainContainer>
	);
}

export default OrderCheckbox;