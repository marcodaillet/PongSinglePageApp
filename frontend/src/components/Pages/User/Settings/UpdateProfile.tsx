import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroContainer } from "../../PlayGame";
import { Button, Typography } from "@mui/material";
import "../style/style.css"
import UploadIcon from '@mui/icons-material/Upload';
import axios from "axios";

const UploadImg = (props: {uploaded: (url: string) => void}) => {

    const upload = async (files: FileList | null ) => {
        if (files === null) return;

        const formData = new FormData();
        formData.append('avatar', files[0]);

        try {
            const {data} = await axios.post('user/uploadImage', formData);
            props.uploaded(data.url);
        }
        catch (err)
        {
            props.uploaded('http://localhost:3000/api/user/media/DefaultAvatar.png')
        }
    }

    return (
        <div>
            <label className="btn btn-primary">
                <UploadIcon fontSize={"small"} />
                <input placeholder="upload avatar" type="file" hidden onChange={e => upload(e.target.files)}/>
            </label>
        </div>
    );

}

export const UpdateProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [avatar, setAvatar] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        let bool = true;
        const setDefaults = async () => {
            try {
                const {data} = await axios.get('userData');
                if (bool) {
                    setUsername(data.username);
                    setMail(data.email);
                    setPhoneNumber(data.phoneNumber);
                    setAvatar(data.avatar)
                }
            }
            catch (error){
                console.log("Error occured whil fetching user data")
            }
        }
        setDefaults();
        return () => {
            bool = false;
        }
    }, []);

    const submit = async () => {
        try {
            await axios.post('user/updateUser', {username, email, phoneNumber, avatar});
            setRedirect(true);
            setInvalid(false);
        }
        catch (error){
            setInvalid(true);
        }
    }

    useEffect(() => {
        if (redirect && !invalid){
            return navigate("/home");
        }
    },[redirect, invalid, navigate]);
    
    return (
        <HeroContainer>
            <form onSubmit={submit}>
                <Typography fontSize={28}> {invalid ? "Invalid informations, please try again" : "Update your profile informations"} </Typography>
                <div className="form-field">
                    <label>User Name </label>
                    <input required id="floatingInput" onChange={e => setUsername(e.target.value)} placeholder={username}/>
                </div>
                <div className="form-field">
                    <label>Email </label>
                    <input required id="floatingInput" onChange={e => setMail(e.target.value)} placeholder={email}/>
                </div>
                <div className="form-field">
                    <label>Phone Number </label>
                    <input required id="floatingInput" onChange={e => setPhoneNumber(e.target.value)} placeholder={phoneNumber}/>
                </div>
                <div className="form-avatar">
                    <label> Upload avatar </label>
                    <UploadImg uploaded={setAvatar} />
                </div>
                <div>
                    <Button variant="contained" onClick={submit}>Submit</Button>
                </div>
            </form>
        </HeroContainer>
    )
}