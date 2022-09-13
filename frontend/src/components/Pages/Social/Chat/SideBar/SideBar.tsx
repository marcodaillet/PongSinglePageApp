import { Col, Divider, Row } from "antd";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Chan } from "./../../../../../datamodels/chan"
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

type SideBarChannelsProps = {
    setCurrentChannelId: Function;
    userId: number;
};

const SideBarChannels = (props: SideBarChannelsProps) => {
    const [chans, setChans] = useState<Array<Chan>>([])
    useEffect(() => {
        let bool = true;
        const getChans = async () => {
            try {
                const {data} = await axios.post('chat/getChansByUserId', {userId: props.userId})
                if (data) {
                    let res: Chan[];
                    res = data.filter((channel: any) => !channel.isDirectConv);
                    if (bool)
                        setChans(res);
                }
            }
            catch (error) {
                console.log("Couldn't fetch channels where user belongs");
            }
        }
        getChans();
        return () => {bool = false}
    }, [props.userId]);

    let checkIfBanned = async(e: SyntheticEvent, chanId: number) => {
        e.preventDefault();
        if (chanId !== 0) {
            try {
                const {data} = await axios.post("chat/isBanned", {userId: props.userId, chanId: chanId});
                if (data === true)
                    alert("You have been banned from this channel")
                else
                    props.setCurrentChannelId(chanId)
            }
            catch (error) {
                console.log("Couldn't check if user was banned")
            }
        }
    }

    return (
        <div>
            <Divider orientation={"center"} style={{ color: "#6281ca"}}>
                Group Messages
            </Divider>
            <Col>
                {chans.map((chan: Chan) => (
                    <Row justify="center" key={chan.id} style={{marginLeft: "25px", padding: "5px"}}>
                        <Button variant="outlined" size="small" onClick={(e) => checkIfBanned(e, chan.id)} endIcon={(chan.isPrivate ? <LockIcon></LockIcon> : null)}>{chan.name}</Button>
                    </Row>
                ))}
            </Col>
        </div>
    )
}

type RenderDirectConvsProps = {
    setCurrentChannelId: Function;
    userName:string;
    directConv: Chan;
    chanId: number;
    userId: number;
}
const RenderDirectConvs = (props: RenderDirectConvsProps) => {
    const [name, setName] = useState('');
    
    let checkIfBanned = async(e: SyntheticEvent, chanId: number) => {
        e.preventDefault();
        if (chanId !== 0) {
            try {
                const {data} = await axios.post("chat/isBanned", {userId: props.userId, chanId: chanId});
                if (data === true)
                    alert("You have been banned from this channel")
                else
                    props.setCurrentChannelId(chanId)
            }
            catch (error) {
                console.log("Couldn't check if user was banned")
            }
        }
    }

    useEffect(() => {
        let bool = true;
        const getUsers = async () => {
            let chanId = props.directConv.id;
            try {
                const {data} = await axios.post('chat/getChanUsers', {chanId: chanId});
                if (data.length === 2) {
                    data.forEach((u: any) => {
                        if (u.username !== props.userName && bool)
                            setName(u.username);
                    });                
                }
            }
            catch (error) {
                console.log("Couldn't fetch users for this direct conversation");
            }
        }
        getUsers();
        return () => {bool = false};
    }, [props.directConv.id, props.userName])

    return (
        <Button variant="outlined" size="small" onClick={(e) => checkIfBanned(e, props.chanId)}>{name.length !== 0 ? name : props.userName}</Button>
    )
}

type SideBarDirectConvsProps = {
    userId: number;
    userName: string;
    currentChannelId: number;
    setCurrentChannelId: Function;
}

const SideBarDirectConvs = (props: SideBarDirectConvsProps) => {
    const [directConvs, setDirectConvs] = useState<Array<Chan>>([]);

    useEffect(() => {
        const getChans = async () => {
            try {
                const {data} = await axios.post('chat/getChansByUserId', {userId: props.userId})
                if (data) {
                    let res: Chan[];
                    res = data.filter((channel: any) => channel.isDirectConv);
                    setDirectConvs(res);
                }
            }
            catch (error) {
                console.log("Couldn't fetch channels where user belongs");
            }
        }
        getChans();
    }, [props.userId]);

    return (
        <div>
            <Divider orientation="center" style={{ color: "#6281ca"}}>
                Direct Messages
            </Divider>
            <Col>
                {directConvs.map((conv: Chan) => (
                    <Row justify="center" key={conv.id} style={{marginLeft: "25px", padding: "5px"}}>
                        <RenderDirectConvs key={conv.id} setCurrentChannelId={props.setCurrentChannelId} userName={props.userName} directConv={conv} userId={props.userId} chanId={conv.id} />
                    </Row>
                ))}
            </Col>
        </div>
    )
}

type SideBarProps = {
    userName: string;
    userId: number;
    currentChannelId: number;
    setCurrentChannelId: Function;
};

export const SideBar = (props: SideBarProps) => {
    return (
        <div className="sideBar">
            <SideBarChannels setCurrentChannelId={props.setCurrentChannelId} userId={props.userId} />
            <SideBarDirectConvs userId={props.userId} userName={props.userName} currentChannelId={props.currentChannelId} setCurrentChannelId={props.setCurrentChannelId} />
            <Divider orientation="center" style={{ color: "#6281ca"}}>
                <Link to="createConv">
                    <AddIcon color="primary" />
                </Link>
            </Divider>
        </div>
    )

}