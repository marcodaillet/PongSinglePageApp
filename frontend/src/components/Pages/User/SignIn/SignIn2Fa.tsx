import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer, HeroContent } from "../../PlayGame";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { HEADER_HEIGHT } from "../../../../utils/constants";
import { AppTitle } from "../../../Header/AppTitle";
import axios from "axios";

export const SignIn2FA = () => {
    const [code, setCode] = useState(' ');
    const [redi, setRedi] = useState(false);
    const [fail, setFail] = useState(false);
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('2fa/verify', {code: code});
            await axios.post('setOnline');
            setRedi(true);
            setFail(false);
        }
        catch (error) {
            setFail(true);
        }
    }
    
    useEffect(() => {
        if (redi)
            return navigate("/home");
    });

    return (
        <main>
            <HeroContainer>
                <HeroContent>
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
                            <Typography fontSize={28}> {fail ? "Invalid code, please try again" : "Please enter your code from the Google Authentificator App"} </Typography>
                            <div className="form-floating">
                                <label htmlFor="floatingInput">Code : </label>
                                <input required onChange={e => setCode(e.target.value)}></input>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                </HeroContent>
            </HeroContainer>  
        </main>
    )
}