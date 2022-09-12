import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer } from "../../PlayGame";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import "../style/style.css"
import axios from "axios";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { HEADER_HEIGHT } from "../../../../utils/constants";
import { AppTitle } from "../../../Header/AppTitle";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('register', {username, email, phoneNumber});
            setInvalid(false);
            setRedirect(true);
        }
        catch (error){
            console.log("Error while submiting")
            setInvalid(true);
        }
    }

    useEffect(() => {
        if (redirect && !invalid){
            return navigate("/home");
        }
    },[redirect, invalid, navigate]);

    return (
        <HeroContainer>
                <AppBar position="fixed" sx = {{ height: HEADER_HEIGHT, }}>
                    <Toolbar variant="dense">
                        <Box sx={{ flexGrow: 1 }} />
                        <VideogameAssetIcon fontSize='large' />
                        <Box sx={{ flexGrow: 1 }}>
                        <AppTitle />
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                        </Box>
                    </Toolbar>
                </AppBar>
            <form onSubmit={submit}>
                <Typography fontSize={28}> {invalid ? "Invalid informations, please try again" : "Please enter your informations" } </Typography>
                <div className="form-field">
                    <label>User Name </label>
                    <input required id="floatingInput" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-field">
                    <label>Mail </label>
                    <input required id="floatingInput" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-field">
                    <label>Phone Number </label>
                    <input required id="floatingInput" onChange={e => setPhoneNumber(e.target.value)} />
                </div>
                <div>
                    <Button variant="contained" onClick={submit}>Submit</Button>
                </div>
            </form>
        </HeroContainer>
    )
}