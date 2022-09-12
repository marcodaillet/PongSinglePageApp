import { Comment, Card} from "antd";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { DatabaseMessageType, WebSocketMessageType } from "../../../../../datamodels/chan";
import User from "../../../../../datamodels/user";
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import BlockIcon from '@mui/icons-material/Block';
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client";
import "./chatFeed.css"

type UserBubleProps = {
    userId: number;
    senderId: number;
    userName: string;
    avatar: string;
    chanId: number;
}

const {Meta} = Card;
export const UserBuble = (props: UserBubleProps) => {
    const navigate = useNavigate();
    const [name, setName] = useState('')

    useEffect(() => {
        let bool = true;
        const getUser = async() => {
            try {
                const {data} = await axios.post('user/getUser', {id: props.senderId});
                if (bool) {
                    setName(data.username);
                }
            }
            catch (error) {
                console.log("Couldn't fetch user data");
            }
        }
        getUser();
        return () => {bool = false}
    }, [props.senderId]);

    async function addFriend(event: SyntheticEvent) {
        event.preventDefault();
        try {
            await axios.post("user/addFriend", {userID: props.userId, friendID: props.senderId})
            alert("You added a new friend");
        }
        catch (error) {
            console.log("error occurred while adding this friend");
        }
    }

    const sendInvite = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        return navigate("/game/playing", {state: { userId: props.userId, type: 1, gameId: -1, invitationId: props.senderId, canvasX: 600 }});
    }

    const blockUser = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        try {
            await axios.post('user/blockUser', {userId: props.userId, blockeeId: props.senderId});
            alert("You successfully blocked this user");
        }
        catch (error) {
            console.log("Error occurred while blocking user");
        }
    }

    let actions: JSX.Element[];
    if (props.userId === props.senderId) {
        actions = [
            <Button startIcon={<CloseIcon/>} />, 
        ]
    }
    else {
        actions = [
            <Link to={"/social/publicprofile"} state={name} type="button" className="customButton">
                <AccountCircleIcon color="primary"/>
            </Link>,
            <Button startIcon={<VideogameAssetIcon/>} onClick={(e) => {sendInvite(e, props.senderId)}}/>,
            <Button startIcon={<PersonAddIcon/>} onClick={addFriend}/>,
            <Button startIcon={<BlockIcon/>} onClick={(e) => {blockUser(e, props.senderId)}}/>,
            <Button startIcon={<CloseIcon/>} />,
        ]
    }

    return (
        <Card hoverable style={{ width: 260}} cover={<img alt='avatar' src={props.avatar}/>} actions={actions}>
            <Meta title={props.userName} />
        </Card>
    )
}

type ChatMessageProps = {
    msg: WebSocketMessageType;
    oneShownPopup: string;
    setOneShownPopup: Function;
    userId: number;
}   

export const ChatMessage = (props: ChatMessageProps) => {
    const content = props.msg.content;
    const timestamp = props.msg.timestamp;
    const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isMute, setIsMute] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    const toggleUserBuble = () => {
        setIsOpen(!isOpen);
        props.setOneShownPopup(props.msg.timestamp);
    };

    useEffect(() => {
        let bool = true;
        const getIsBlocked = async () => {
            const {data} = await axios.get('user/userBlocked');
            data.blocked.forEach((user: User) => {
                if (bool && user.id === props.msg.senderId)
                    setIsBlocked(true);                
            });
        }
        getIsBlocked();
        return () => {bool = false};
    }, [props.msg.senderId]);

    useEffect(() => {
        let bool = true;
        const getUser = async() => {
            try {
                const {data} = await axios.post('user/getUser', {id: props.msg.senderId});
                if (bool) {
                    setUserName(data.username);
                    setAvatar(data.avatar);
                }
            }
            catch (error) {
                console.log("Couldn't fetch user data");
            }
        }
        getUser();
        return () => {bool = false}
    }, [props.msg.senderId]);

    useEffect(() => {
        let bool = true;
        const getUserType = async() => {
            if (props.msg.chanId !== 0) {
                try {
                    const {data} = await axios.post('chat/getUserType', {userId: props.msg.senderId, chanId: props.msg.chanId});
                    if (bool && data === 3) {
                        setIsMute(true);
                    }
                }
                catch (error) {
                    console.log("Couldn't fetch user state");
                }
            }
        }
        getUserType();
        return () => {bool = false}
    }, [props.msg.senderId, props.msg.chanId]);

    if (isMute || isBlocked) {
        return (
            <div></div>
        )
    }
    else {
        return (
            <div onClick={toggleUserBuble}>
                <Comment content={content} author={userName} avatar={avatar} datetime={timestamp} />
                {
                    (isOpen ? <UserBuble userId={props.userId} senderId={props.msg.senderId} userName={userName} avatar={avatar} chanId={props.msg.chanId} /> : null)
                }
            </div>
        );
    }
}

type ChannelMessagesProps = {
    currentChannelId: number;
    userId: number;
    setCurrentChannelId: Function;
}

export const ChannelMessages = (props: ChannelMessagesProps) => {
    const [oldMessages, setOldMessages] = useState([]);
    const [newMessages, setNewMessages] = useState<WebSocketMessageType[]>([]);
    const [oneShownPopup, setOneShownPopup] = useState("");
    const [content, setContent] = useState('');
    const [timestamp, setTimestamp] = useState(new Date().toLocaleString());

    useEffect(() => {
        let bool = true;
        const getOldMessages = async () => {
            try {
                const {data} = await axios.post('messages/getOldMessages', {chanId: props.currentChannelId});
                if (bool)
                    setOldMessages(data);
            }
            catch (error) {
                console.log("Counldn't fetch old messages for this channel");
            }
        }
        getOldMessages();
        return () => {bool = false};
    }, [props.currentChannelId]);

    useEffect(() => {
        let websock = io(`http://localhost:8000`);
        websock.on('message', async (args) => {
            const data = JSON.parse(JSON.stringify(args));
            if (data.chanId === props.currentChannelId) {
                const new_msg: WebSocketMessageType = {
                    chanId: data.chanId,
                    senderId: data.senderId,
                    content: data.content,
                    timestamp: data.timestamp,
                };
                setNewMessages((prevState: WebSocketMessageType[]) => [...prevState, new_msg]);
            }
        });
        return () => { websock.close(); };
    }, [props.currentChannelId]);

    let checkIfBanned = async(chanId: number) => {
        try {
            const {data} = await axios.post("chat/isBanned", {userId: props.userId, chanId: chanId});
            if (data === true) {
                alert("You have been banned from this channel")
                props.setCurrentChannelId(0);
            }
        }
        catch (error) {
            console.log("Couldn't check if user was banned")
        }
    }

    async function submit(e: SyntheticEvent) {
        e.preventDefault();
        checkIfBanned(props.currentChannelId)
        if (content !== "") {
            const {data} = await axios.post("chat/isMuted", {userId: props.userId, chanId: props.currentChannelId});
            if (data === false) {
                try {
                    setTimestamp(new Date().toLocaleString());
                    await axios.post('messages/newMessage', {chanId: props.currentChannelId, senderId: props.userId, content: content, timestamp: timestamp});
                }
                catch (error) {
                    console.log("Counldn't send a message");
                }
                let websock2 = io(`http://localhost:8000`);
                websock2.emit("message", {chanId: props.currentChannelId, senderId: props.userId, content: content, timestamp: timestamp});
            }
            else
                alert("You are currently muted on this channel")
            setContent('');
        }
    }

    return (
        <div className="chatFeed">
            <div className="chatMessages">
                {oldMessages.filter((msg: WebSocketMessageType) => {
                    return (msg.chanId === props.currentChannelId)}).map((msg: DatabaseMessageType) => (
                    <ChatMessage key={msg.id} msg={msg} oneShownPopup={oneShownPopup} setOneShownPopup={setOneShownPopup} userId={props.userId}></ChatMessage>
                ))}
                {newMessages.filter((msg: WebSocketMessageType) => {
                    return (msg.chanId === props.currentChannelId)}).map((msg: WebSocketMessageType) => (
                    <ChatMessage key={msg.timestamp} msg={msg} oneShownPopup={oneShownPopup} setOneShownPopup={setOneShownPopup} userId={props.userId}></ChatMessage>
                ))}
            </div>
            <div className="inputBar">
                <input id="inputBar" className="input" required value={content} type="text" placeholder="Write your message here" onChange={(e) => setContent(e.target.value)} />
                <Button startIcon={<SendIcon/>} onClick={submit}></Button>
            </div> 

        </div>
    )
}  