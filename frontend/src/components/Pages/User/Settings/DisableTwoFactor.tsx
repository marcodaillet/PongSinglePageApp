import { Button, Typography } from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer } from "../../PlayGame";
import "../style/style.css"

const DisableTwoFactor = () => {
    const [code, setCode] = useState('');
    const [QRCode, setQRCode] = useState(' ');
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [twoFa, setTwoFa] = useState(false);

    const navigate = useNavigate();

    const disable = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('2fa/verify', {code: code});
            await axios.post('2fa/disable', {});
            alert("You successfully disabled 2FA authentication")
            setRedirect(true);
            setInvalid(false);
        }
        catch (error){
            setInvalid(true);
        }
    }

    useEffect(() => {
        if (redirect && !invalid){
            return navigate("/home");
        }
    },[redirect]);

    return (
        <HeroContainer>
            <form>
                <Typography>You currently have the two factor authentication enable</Typography>
                <Typography>Enter the code from your Google Anthenticator app to disable it</Typography>
                { invalid? <Typography>Wrong code, please try again</Typography> : <Typography></Typography>}
                <div className="form-field">
                    <input required id="floatingInput" placeholder="12345" onChange={e => setCode(e.target.value)}/>
                    <label>Enter authentication code</label>
                </div>
                <div className="form-field">
                    <div className="button">
                        <Button onClick={disable} variant="contained">Disable</Button>
                    </div>
                </div>
            </form>
        </HeroContainer>
    )
}

export default DisableTwoFactor;