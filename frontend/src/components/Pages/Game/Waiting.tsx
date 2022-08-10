import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer, HeroContent } from "../PlayGame";
import { useLocation } from "react-router-dom";
import axios from "axios";

type WaitingProps = {
    type: string,
    private: boolean,
}

export const Waiting = (props: any) => {
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();

    let location = useLocation();
    let data = location.state as WaitingProps;
    const type = data.type;
    const priv = data.private;

    useEffect(() => {
        let bool = true;
        const getUserId = async () => {
            const {data} = await axios.get('userData');
            if (bool)
                setUserId(data.id);
        }
        getUserId();
        return() => {bool = false};
    }, []);

    useEffect(() => {
        let bool = true;
        const sendPlayerBack = async () => {
            if (bool) {
                try {
                    await axios.post('waitingRoom/newPlayer', {userId, type, priv})
                    bool = false;
                }
                catch (error) {
                    console.log("An error occurred while sending the player's data to the backend")
                }
            }
        }
        sendPlayerBack()
        return () => {bool = false};
    }, [userId, type, priv])

    useEffect(() => {
        const isStarting = async () => {
            const gameId = await axios.post('isStarting', {userId});
            if (gameId)
                return (navigate('/game/game:'+`${gameId}`))
        }
        isStarting();
    }, [navigate, userId]);

    return (
        <HeroContainer>
            <HeroContent>
                <Typography>This is a waiting room</Typography>
                <Typography>You will be redirected as soon as we find you a match</Typography>
            </HeroContent>
        </HeroContainer>
    )
}