import { Box, Button, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import { CustomVideo } from "./video";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';import { PageTitle } from "../Home";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const HeroContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 650px;
    position: relative;
    z-index: 1;
`;

export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Game = () =>
{
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        let bool = true;
        const getId = async () => {
            const {data} = await axios.get('user/getUserId');
            if (bool)
                setUserId(data.userId)
        }
        getId();
        return () => {bool = false}
    })

    const navigate = useNavigate();
    const easyWaiting = async () => {
        return navigate("/game/playing", {state: { userId: userId, type: 1, gameId: -2, invitationId: -1, canvasX: 600 }});
    }
    const normalWaiting = () => {
        return navigate("/game/playing", {state: { userId: userId, type: 2, gameId: -2, invitationId: -1, canvasX: 600 }});
    }
    const hardWaiting = () => {
        return navigate("/game/playing", {state: { userId: userId, type: 3, gameId: -2, invitationId: -1, canvasX: 600 }});
    }
    return (
        <HeroContainer>
            <CustomVideo/>
            <HeroContent>
                <PageTitle title={"Choose your mode"} />
                <Typography color="textSecondary" align="center" marginTop="30px" fontStyle={"italic"} >Easy mode is for children and elderly people, Normal mode is played by decent human beings and Hard is reserved to the elite (just kidding nobody ever touched that Pong) </Typography>
                <Box sx = {{ flexGrow: 1, p: 3 }} /> 
                <Grid container direction="row" justifyContent="space-around" alignItems="center" >
                    <Button variant="contained" size="large" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} onClick={easyWaiting}>Easy</Button>
                    <Button variant="contained" size="large" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} onClick={normalWaiting}>Normal</Button>
                    <Button variant="contained" size="large" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} onClick={hardWaiting}>Hard</Button>
                </Grid>
            </HeroContent>
        </HeroContainer>
    )
}