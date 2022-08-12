import { CountertopsOutlined } from "@mui/icons-material";
import { Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExitToApp } from '@mui/icons-material';

type LeaveChanProps = {
    userId: number;
    currentChannelId: number;
}

const LeaveChan = (props: LeaveChanProps) => {
    function LeaveChan() {
        const removeUser = async() => {
            try {
                await axios.post('chat/deleteUser', {userId: props.userId});
                window.location.reload();
            }
            catch (error) {
                console.log("Couldn't remove user from the channel");
            }
        }
        removeUser();
    }

    return (
        <div>
            <button onClick={LeaveChan}>
                <ExitToApp></ExitToApp>
            </button>
        </div>
    )
}

type ChanHeaderProps = {
    userId: number;
    isDirectConv: boolean;
    currentChannelId: number;
    setCurrentChannelId: Function;
}

const ChanHeader = (props: ChanHeaderProps) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [rediToAdm, setRediToAdm] = useState(false);
    useEffect(() => {
        let bool = true;
        const getName = async () => {
            if (props.currentChannelId) {
                try {
                    const {data} = await axios.post('chat/getChanById', {id: props.currentChannelId})
                    if (bool)
                        setName(data.name);
                }
                catch (error) {
                    console.log("Couldn't fetch channel name");
                }
            }
            else {
                setName("Please select a channel in the right menu");
            }
        }
        getName();
        return () => {bool = false};
    }, [props.currentChannelId]);

    useEffect(() => {
        let bool = true;
        const isAdmin = async () => {
            try {
                const {data} = await axios.post('chat/idAdmin', {userId: props.userId, chanId: props.currentChannelId})
                if (bool)
                    setIsAdmin(data);
            }
            catch (error) {
                console.log("Couldn't fetch admin info");
            }
        }
        isAdmin();
        return () => {bool = false};
    }, [props.currentChannelId]);

    useEffect(() => {
        if (rediToAdm)
            return (navigate('/chat/admin', {state: props.currentChannelId}))
    })

    return (
        <div>
            <Divider orientation="center" style={{color: "#6281ca"}}> {name} </Divider>
            <div>
                {props.currentChannelId ? ( <LeaveChan userId={props.userId} currentChannelId={props.currentChannelId} /> ) : null }
            </div>
            <div>
                {isAdmin && !props.isDirectConv ? (<button type="button" onClick={() => setRediToAdm(true)}>Admin Panel</button>) : null }
            </div>
        </div>
    )
}

type PrivateGuardProps = {
    currentChannelId:number;
    passwordSuccess: boolean;
    setPasswordSuccess: Function;
}

const PrivateGuard = (props: PrivateGuardProps) => {
    const [input, setInput] = useState('');
    const [invalid, setInvalid] = useState(false);

    async function checkInput() {
        try {
            const {data} = await axios.post('chat/getChanById', {chanId: props.currentChannelId});
            if (data.password !== input) {
                setInvalid(true);
                props.setPasswordSuccess(false);
            }
            else {
                setInvalid(false);
                props.setPasswordSuccess(true);
            }
        }
        catch (error) {
            console.log("Counld't fetch channel data (password)");
        }
    }

    return (
        <div>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" id="exampleInputPassword1" placeholder="Password" onChange={e => setInput(e.target.value)}/>
            <button type="submit" onClick={checkInput}>Submit</button>
            { invalid? <p className="registerSubTitle">Invalid password, please try again</p> : <p/>  }
        </div>
    )
}

type ChatFeedProps = {
    userId: number;
    currentChannelId: number;
    setCurrentChannelId: Function;
}

export const ChatFeed = (props: ChatFeedProps) => {
    const navigate = useNavigate();
    const chanId = props.currentChannelId;
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isDirectConv, setIsDirectConv] = useState(false);

    useEffect(() => {
        let bool = true;
        const getChanInfo = async() => {
            try {
                const {data} = await axios.post('chat/getChanById', {chanId: chanId});
                if (bool) {
                    setIsDirectConv(data.isDirectConv);
                    setIsPrivate(data.isPrivate);
                }
            }
            catch (error) {
                console.log("Failed to catch channel info");
            }
        }
        getChanInfo();
        return () => {bool = false}
    }, [props.currentChannelId])

    return (
        <div>
            {isPrivate && !passwordSuccess ? (
                <PrivateGuard currentChannelId={props.currentChannelId} passwordSuccess={passwordSuccess} setPasswordSuccess={setPasswordSuccess} />
            ) : (
            <>
                <ChanHeader userId={props.userId} isDirectConv={isDirectConv} currentChannelId={props.currentChannelId} setCurrentChannelId={props.setCurrentChannelId} />
            </>
            
        )}
        </div>
    )
}