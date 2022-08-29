import { Button, Typography } from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer } from "../../PlayGame";
import "../style/style.css"

const EnableTwoFactor = () => {
    const [code, setCode] = useState('');
    const [QRCode, setQRCode] = useState(' ');
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let bool = true;
        const getQRCode = async () => {
            try {
                const {data} = await axios.get('2fa/generate');
                if (bool) {
                    setQRCode(data);
                }
            }
            catch (error) {
                console.log('error occured getting QRCode image')
            }
        }
        getQRCode();
        return () => {
            bool = false;
        }
    }, []);

    const enable = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('2fa/verify', {code: code});
            alert("You successfully enabled 2FA authentication")
            setRedirect(true);
        }
        catch (error){
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
            <form>
                <Typography>Enable two factor authentication</Typography>
                <Typography>Scan the QR code with Google Anthenticator</Typography>
                <div>
                    <img className="qrcodeimage" alt="QRCode" src={QRCode}></img>
                </div>
                { invalid? <Typography>Wrong code, please try again</Typography> : <Typography></Typography>}
                <div className="form-field">
                    <input required id="floatingInput" placeholder="12345" onChange={e => setCode(e.target.value)}/>
                    <label>Enter authentication code</label>
                </div>
                <div className="form-field">
                    <div className="button">
                        <Button onClick={enable} variant="contained">Enable</Button>
                    </div>
                </div>
            </form>
        </HeroContainer>
    )
}

export default EnableTwoFactor;