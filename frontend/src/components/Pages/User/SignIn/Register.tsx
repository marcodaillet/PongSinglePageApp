import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer } from "../../PlayGame";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "../style/style.css"
import axios from "axios";

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
            console.log("success")
            setInvalid(false);
            setRedirect(true);
        }
        catch (error){
            console.log("ERRPRPRPRPRPRPPRPR")
            setInvalid(true);
        }
    }

    useEffect(() => {
        console.log(redirect, invalid)
        if (redirect && !invalid){
            return navigate("/home");
        }
    },[redirect]);

    return (
        <HeroContainer>
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