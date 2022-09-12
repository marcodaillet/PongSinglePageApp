import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import User from "../../../../../datamodels/user"
import { Typography } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";

export const CreateDirectConv = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(-1);
    const [allUsers, setAllUsers] = useState<Array<User>>([]);
    const [chanUsers, setChanUsers] = useState<Array<User>>([]);
    const [chanAdmin, setChanAdmin] = useState<Array<User>>([]);
    const [success, setSuccess] = useState(true);
    const [redirection, setRedirection] = useState(false);

    useEffect(() => {
        let bool = true;
        const getAllUsers = async () => {
            try {
                const {data} = await axios.get('user/all');
                if (bool)
                    setAllUsers(data);
            }
            catch (error) {
                console.log("Failed to fetch all users");
            }
        }
        getAllUsers();
        return() => {bool = false};
    }, []);

    useEffect(() => {
        let bool = true;
        const getUserId = async () => {
            try {
                const {data} = await axios.get('user/getUserId');
                if (bool)
                    setUserId(data.userId)
                allUsers.forEach((user: User) => { if (user.id === data.userId) setChanAdmin([user]);});
            }
            catch (error) {
                console.log("Failed to fetch userId");
            }
        }
        getUserId();
        return () => {bool = false};
    }, [allUsers]);

    const submit = async(event: SyntheticEvent) => {

        event.preventDefault();
        if (success) {
            try {
                await axios.post('chat/newChan', {name: "Direct Conversation", isPrivate: false, isDirectConv: true, adminId: userId, users: chanUsers, password: ""}); 
                setRedirection(true);
            }
            catch (error) {
                console.log("Failed to create a direct conversation");
            }
        }
    };

    function selectUser(selected: User[]) {
        if (selected.length !== 2) {
            setSuccess(false);
            return ;
        }
        else {
            setSuccess(true);
            setChanUsers(selected);
        }
        console.log(selected);
    }

    useEffect(() => {
        if (redirection && success)
            return (navigate('/social/chat'));
    })

    return (
        <main>
            <form onSubmit={submit}>
                <Typography fontSize={32} color="textSecondary" align="center" marginTop="30px" fontStyle={"italic"} >Choose the users for this direct chat</Typography>

                {chanAdmin && (
                    <>
                        <Multiselect options={allUsers} selectedValues={chanAdmin} displayValue="username" placeholder="Add one user here" onSelect={selectUser} onRemove={selectUser} />
                    </>
                )}
                <button>Submit</button>
            </form>
        </main>
        )
}