import { Typography } from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer, HeroContent } from "../../../PlayGame";

type PasswordSettingsProps = {
    currentChanId: number;
}

export const PasswordSettings = (props: PasswordSettingsProps) => {
    const navigate = useNavigate();
    const [isPrivate, setIsPrivate] = useState(false);
    const [input, setInput] = useState('');
    const [fail, setFail] = useState(false);
    const [redi, setRedi] = useState(false)
    const [newPassword, setNewPassword] = useState('');
    const [render, setRender] = useState(false);

    useEffect(() => {
        let bool = true;
        const isPrivate = async () => {
            try {
                const {data} = await axios.post('chat/getChanById', {chanId: props.currentChanId});
                if (bool)
                    setIsPrivate(data.isPrivate);
            }
            catch (error) {
                console.log("Counldn't fetch channel info")
            }
        }
        isPrivate();
        return () => {bool = false};
    }, [props.currentChanId]);

    async function checkInput() {
        try {
            const {data} = await axios.post('chat/checkPassword', {password: input, chanId: props.currentChanId});
            if (data === true) {
                setRender(true);
                setFail(false);
            }
            else {
                setFail(false);
            }
        }
        catch (error) {
            console.log("Couldn't check channel password");
        }
    }

    async function removePassword() {
        try {
            await axios.post('chat/removePassword', {chanId: props.currentChanId});
            window.location.reload();
        }
        catch (error) {
            console.log("Couldn't remove channel password");
        }
    }

    let submit = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            await axios.post('chat/changePassword', {newPassword: input, chanId: props.currentChanId});
            setRedi(true);
        }
        catch (error) {
            console.log("Couldn't change channel password");
        }
    }

    function renderSettings() {
        if (render) {
            return (
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="floatingInput">New Password</label>
                        <input required type="password" id="floatingInput" onChange={(e) => setNewPassword(e.target.value)}></input>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )
        }
        else {
            return;
        }
    }

    useEffect(() => {
        if (redi)
            return (navigate('/social/chat'))
    })

    if (isPrivate) {
        return (
            <HeroContainer>
                <label htmlFor="floatingInput">Enter current password</label>
                { fail ? (<Typography>Sorry wrong password try again</Typography>) : <p></p> }
                <input required type="password" id="floatingInput" onChange={(e) => setInput(e.target.value)}></input>
                <div>
                    <button type="submit" onClick={checkInput}>Change password</button>
                    <button type="submit" onClick={removePassword}>Remove password</button>
                </div>
            </HeroContainer>
        )
    }
    else {
        return (
            <HeroContainer>
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onChange={() => setRender(true)}/>
                <label className="form-check-label" htmlFor="defaultCheck1">Add password to channel</label>
                {renderSettings()}
            </HeroContainer>
        )
    }
}