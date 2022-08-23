import { ContactPageSharp, IndeterminateCheckBox, SocialDistance, SosOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Divider, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import User from "../../../../../datamodels/user";
import { HeroContainer } from "../../../PlayGame";
import { PasswordSettings } from "./PasswordSettings";

type AdminPanelProps = {
    currentChannelId: number;
}

export const AdminPanel = (props: any) => {
    const navigate = useNavigate();
    const [redi, setRedi] = useState(false);
    const [chanUsers, setChanUsers] = useState<User[]>([]);

    const loc = useLocation();
    const sta = loc.state as AdminPanelProps;
    const chanId = sta.currentChannelId;

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
    }, []);

    useEffect(() => {
        let bool = true;
        const getChanUsersTypes = async() => {
            try {
                chanUsers.forEach(async(user: User) => {
                    const {data} = await axios.post('chat/getUserType', {chanId: chanId, userId: user.id});
                    user.userType = data;
                })
            }
            catch (error) {
                console.log("Couldn't fetch channel user types");
            }
        }
        getChanUsersTypes();
        return () => {bool = false};
    }, [chanUsers]);

    async function updateUserStatus(userId: number, status: string) {
        try {
            await axios.post('chat/updateUserStatus', {userId: userId, status: status, chanId: props.locations.state.currentChanId});
            if (status == "NORMAL")
                alert("User parameters reseted")
            else if (status == "ADMIN")
                alert("User is now an admin on this channel")
            else if (status == "MUTED")
                alert("User is now muted");
        }
        catch (error) {
            console.log("Couldn't update user status");
        }
    }

    async function kickUser(userId: number) {
        try {
            await axios.post('chat/kickUser', {userId: userId, chanId: chanId});
            alert("User has been kicked from this channel");
            window.location.reload();
        }
        catch (error) {
            console.log("Couldn't kick user from this channel");
        }
    }

    useEffect(() => {
        if (redi)
            return navigate('/social/chat');
    })

    console.log(chanUsers)
    return (
        <div>
            <Divider>
                <Typography> Admin Panel </Typography>
            </Divider>
            <div style={{overflowX: "auto"}}>
                <table style={{width: "100%",textAlign: "center"}}>
                    <thead></thead>
                    <tbody>
                        {chanUsers.map((item: User) => (
                            <tr style={{borderBottom: "1px solid #ddd"}} key={item.id}>
                                <td >{item.username}</td>
                                <td>User Type is {item.userType}</td>
                                <td>{item.userType === 0 || item.userType === 2 || item.userType === 4 ? "" : <Button size="small" variant="contained" onClick={() => kickUser(item.id)}>Kick</Button>}</td>
                                <td>{item.userType === 1 || item.userType === 2 || item.userType === 3 ? "" : <Button size="small" variant="contained" onClick={() => updateUserStatus(item.id, "MUTE")}>Mute</Button>}</td>
                                <td>{item.userType === 1 || item.userType === 2 || item.userType === 4 ? "" : <Button size="small" variant="contained" onClick={() => updateUserStatus(item.id, "ADMIN")}>Make Admin</Button>}</td>
                                <td>{item.userType === 2 ? "" : <Button size="small" variant="contained" onClick={() => updateUserStatus(item.id, "NORMAL")}>UnMake Admin</Button>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Divider>
                <Typography> Password Settings </Typography>
            </Divider>
                <PasswordSettings currentChanId={chanId}></PasswordSettings>
        </div>
    )
}