import { Button } from "@mui/material";
import { Divider, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../../../../datamodels/user";
import { PasswordSettings } from "./PasswordSettings";
import "./chatFeed.css"

type AdminPanelProps = {
    currentChannelId: number;
    userId: number;
}

export const AdminPanel = (props: any) => {
    const navigate = useNavigate();
    const [redi, setRedi] = useState(false);
    const [chanUsers, setChanUsers] = useState<User[]>([]);
    const [notAdmin, setNotAdmin] = useState(false)
    const loc = useLocation();
    const sta = loc.state as AdminPanelProps;
    const chanId = sta.currentChannelId;
    const userId = sta.userId

    useEffect(() => {
        let bool = true;
        const getChanUsers = async() => {
            try {
                const {data} = await axios.post('chat/getChanUsers', {chanId: chanId});
                if (bool)
                    setChanUsers(data)
            }
            catch (error) {
                console.log("Couldn't fetch channel users");
            }
        }
        getChanUsers();
        return () => {bool = false};
    }, [chanId]);

    useEffect(() => {
        const isAdmin = async() => {
                chanUsers.forEach((user: User) => {
                    if (user.id === userId) {
                        if (user.userType !== 0 && user.userType !== -1) {
                            setNotAdmin(true);
                        }
                    } 
                })
        }
        isAdmin();
    }, [chanUsers, userId]);

    useEffect(() => {
        if (notAdmin)
            return (navigate('/social/chat'))
    })

    async function updateUserStatus(userId: number, status: number) {
        try {
            const {data} = await axios.post('chat/isAdmin', {userId: props.userId, chanId: props.currentChannelId})
            if (data.data === false) {
                alert("You are not an admin anymore");
                window.location.reload();
            }
            await axios.post('chat/updateUserStatus', {userId: userId, status: status, chanId: chanId});
            if (status === 0)
                alert("User is now an admin on this channel")
            else if (status === 1)
                alert("User is now a normal user")
            else if (status === 2)
                alert("User is now muted, you can unmute him wheneven you want");
            else if (status === 3)
                alert("User is now banned, you can unban him wheneven you want")
            window.location.reload();
        }
        catch (error) {
            console.log("Couldn't update user status");
        }
    }

    useEffect(() => {
        if (redi)
            return navigate('/social/chat');
    }, [redi, navigate])

    return (
        <div>
            <Divider>
                <Typography> Admin Panel </Typography>
            </Divider>
            <div className="tableDiv">
                <table className="userAdminTable">
                    <thead/>
                    <tbody>
                        {chanUsers.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                {user.userType === -1 ? <td>Cannot modify channel owner</td> : null}
                                {user.userType !== 1 ? <td></td> : <td><Button size="small" variant="contained" onClick={() => updateUserStatus(user.id, 0)}>Make Admin</Button></td>}
                                {user.userType !== 0 ? <td></td> : <td><Button size="small" variant="contained" onClick={() => updateUserStatus(user.id, 1)}>UnMake Admin</Button></td>}
                                {user.userType !== 1 ? <td></td> : <td><Button size="small" variant="contained" onClick={() => updateUserStatus(user.id, 2)}>Mute</Button></td>}
                                {user.userType !== 2 ? <td></td> : <td><Button size="small" variant="contained" onClick={() => updateUserStatus(user.id, 1)}>UnMute</Button></td>}
                                {user.userType !== 1 && user.userType !== 2 ? <td></td> : <td><Button size="small" variant="contained" onClick={() => updateUserStatus(user.id, 3)}>Ban</Button></td>}
                                {user.userType !== 3 ? <td></td> : <td><Button size="small" variant="contained" onClick={() => updateUserStatus(user.id, 1)}>UnBan</Button></td>}
                            </tr>     
                        ))}
                    </tbody>
                </table>
            </div>
            <Divider>
                <Typography> Password Settings </Typography>
            </Divider>
                <PasswordSettings currentChanId={chanId}></PasswordSettings>
            <Divider>
                <Button size="medium" variant="contained" onClick={() => {setRedi(!redi)}}> Back </Button>
            </Divider>
        </div>
    )
}