import { SyntheticEvent, useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import User from "../../../../datamodels/user";
import "./style/style.css"
import axios from "axios";
import { Button } from "@mui/material";

export const PublicProfiles = () => {
    const [user, setUser] = useState({id: 0,});
    const [users, setUsers] = useState([]);
    const [blocked, setBlocked] = useState<User[]>([]);

    useEffect(() => {
        const getUser = async () => {
            const {data} = await axios.get('userData');
            setUser(data);
        }
        getUser();
    }, []);

    useEffect(() => {
        let bool = true;
        const getIsBlocked = async () => {
            const {data} = await axios.get('user/userBlocked');
            if (bool)
                setBlocked(data.blocked);
        }
        getIsBlocked();
        return () => {bool = false};
    }, [user]);

    useEffect(() => {
        const getUsers = async () => {
            const {data} = await axios.get('user/all');
            setUsers(data);
        }
        getUsers();
    }, []);

    function isBlocked(id: number) {
        let ret = false;
        blocked.forEach((user: User) => {
            if (user.id === id)
                ret = true;
        })
        return (ret)
    }

    const blockUser = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        try {
            await axios.post('user/blockUser', {userId: user.id, blockeeId: id});
            // window.location.reload();
            alert("You successfully blocked this user");
        }
        catch (error) {
            console.log("Error occurred while blocking user");
        }
    }

    const unBlockUser = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        try {
            await axios.post('user/unBlockUser', {userId: user.id, blockeeId: id});
            // window.location.reload();
            alert("You successfully unblocked this user");
        }
        catch (error) {
            console.log("Error occurred while blocking user");
        }
    }

    return (
        <main className="PublicProfilesComponent">
            <div className="profiles">
                <table>
                    <thead></thead>
                    <tbody>
                        {users.map((usersData: User) =>

                            <tr key={usersData.id} className="users-table">
                                <td><img src={usersData.avatar} className="avatarIMG" alt=""></img></td>
                                <td> - </td>
                                <td>{usersData.username}</td>
                                <td> - </td>
                                <td>{ (usersData.id !== user.id) ?
                                        <Link to={"/social/publicprofile"} state={usersData.username} type="button" className="customButton">See profile</Link> 
                                        :
                                        <Link to={"/user/profile"} type="button" className="customButton">See profile</Link>
                                    }   
                                </td>
                                    {
                                        (usersData.id !== user.id) ?
                                        <td>{
                                                isBlocked(usersData.id) ? 
                                                <Button onClick={(e) => {unBlockUser(e, usersData.id)}}>Unblock</Button>
                                                :
                                                <Button onClick={(e) => {blockUser(e, usersData.id)}}>Block</Button>
                                            }   
                                        </td>
                                        :
                                        null
                                    }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}