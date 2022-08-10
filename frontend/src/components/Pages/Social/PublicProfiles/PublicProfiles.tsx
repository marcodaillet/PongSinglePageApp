import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import User from "../../../../datamodels/user";
import "./style/style.css"
import DefaultAvatar from "../../../../images/DefaultAvatar.png"
import axios from "axios";

export const PublicProfiles = () => {
    const [user, setUser] = useState({id: 0,});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let bool = false;
        const getUser = async () => {
            const {data} = await axios.get('userData');
            setUser(data);
        }
        getUser();
        return () => {bool = false;}
    }, []);

    useEffect(() => {
        let bool = false;
        const getUsers = async () => {
            const {data} = await axios.get('user');
            console.log(data);
            setUsers(data);
        }
        getUsers();
        return () => {bool = false;}
    }, []);

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
                                <td><Link to={"/social/publicprofile"} state={usersData.username} type="button" className="customButton">See profile</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    )
}