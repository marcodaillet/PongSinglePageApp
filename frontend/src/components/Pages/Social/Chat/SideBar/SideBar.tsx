import { Divider } from "antd";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Chan } from "./../../../../../datamodels/chan"
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";

type SideBarChannelsProps = {
    setCurrentChannelId: Function;
    userId: number;
};
const SideBarChannels = (props: SideBarChannelsProps) => {
    const [chans, setChans] = useState<Array<Chan>>([])
    useEffect(() => {
        let bool = true;
        let userId: number = props.userId;
        const getChans = async () => {
            try {
                const {data} = await axios.post('chat/getChansByUserId', {userId: userId})
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

    return (
        <div>
            <Divider orientation={"left"} style={{ color: "#6281ca"}}>
                Group Messages
            </Divider>
            {chans.map((chan: Chan) => (
                <ul key={chan.id} onClick={() =>  props.setCurrentChannelId(chan.id)}>
                    <p>{chan.name}</p>
                    <p>{chan.isPrivate ? <LockIcon></LockIcon> : <div></div>}</p>
                </ul>
            ))}
        </div>
    )
}

type RenderDirectConvsProps = {
    setCurrentChannelId: Function;
    userName:string;
    directConv: Chan;
}
const RenderDirectConvs = (props: RenderDirectConvsProps) => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState<any>([]);
    
    useEffect(() => {
        let bool = true;
        const getUsers = async () => {
            let chanId = props.directConv.id;
            try {
                const {data} = await axios.post('chat/getChanUsers', {chanId: chanId});
                if (bool)
                    setUsers(data);
            }
            catch (error) {
                console.log("Couldn't fetch users for this direct conversation");
            }
        }
        getUsers();
        return () => {bool = false};
    }, [props.directConv.id])

    useEffect(() => {
        let bool = true;
        const getChanName = async () => {
            if (users.length == 2) {
                users.forEach((u: any) => {
                    if (u.user.username !== props.userName && bool)
                        setName(u.user.username)
                });
            }
        };
        getChanName();
        return () => {bool = true}
    }, [props.directConv, props.setCurrentChannelId, props.userName, users])

    function setCurentChannelId(event: SyntheticEvent) {
        event.preventDefault();
        props.setCurrentChannelId(props.directConv.id)
    }

    return (
        <ul key={props.directConv.id} onClick={setCurentChannelId}>
            {name}
        </ul>
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
        let bool = true;
        let userId: number = props.userId;
        const getChans = async () => {
            try {
                const {data} = await axios.get('chat/getChansByUserId', {params: {userId}})
                if (data) {
                    let res: Chan[];
                    res = data.filter((channel: any) => channel.isDirectConv);
                    if (bool)
                        setDirectConvs(res);
                }
            }
            catch (error) {
                console.log("Couldn't fetch channels where user belongs");
            }
        }
        getChans();
        return () => {bool = false}
    }, [props.userId]);

    return (
        <div>
            <Divider orientation="left" style={{ color: "#6281ca"}}>
                Direct Messages
            </Divider>
            {directConvs.map((conv: Chan) => (
                <RenderDirectConvs key={conv.id} setCurrentChannelId={props.setCurrentChannelId} userName={props.userName} directConv={conv} />
            ))}
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
        <div>
            <SideBarChannels setCurrentChannelId={props.setCurrentChannelId} userId={props.userId} />
            <SideBarDirectConvs userId={props.userId} userName={props.userName} currentChannelId={props.currentChannelId} setCurrentChannelId={props.setCurrentChannelId} />
            <Divider orientation="left" style={{ color: "#6281ca"}}>
                <Link to="createConv">Create a new conversation</Link>
            </Divider>
        </div>
    )

}