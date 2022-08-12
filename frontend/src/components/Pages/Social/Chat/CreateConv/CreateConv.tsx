import { Box, Button, Grid, Typography } from "@mui/material";
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer, HeroContent } from "../../../PlayGame";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CreateConv = () => {
    const navigate = useNavigate();
    
    const createGroupConv = (event: SyntheticEvent) => {
        event.preventDefault();
        return (navigate("/social/chat/createGroupConv"))
    }

    const createDirectConv = (event: SyntheticEvent) => {
        event.preventDefault();
        return (navigate("/social/chat/createDirectConv"))
    }


    return (
        <HeroContainer>
            <HeroContent>
            <Typography fontSize={32} color="textSecondary" align="center" marginTop="30px" fontStyle={"italic"} >Choose the conversation mode that you want </Typography>
            <Box sx = {{ flexGrow: 1, p: 3 }} /> 
                <Grid container direction="row" justifyContent="space-around" alignItems="center" >
                    <Button variant="contained" size="medium" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} onClick={createGroupConv}>Group conversation</Button>
                    <Box sx = {{ flexGrow: 1, p: 3 }} /> 
                    <Button variant="contained" size="medium" style={{ fontSize: 25 }} endIcon={<ArrowForwardIosIcon/>} onClick={createDirectConv}>Private conversation</Button>
                </Grid>
            </HeroContent>
        </HeroContainer>
    )
}