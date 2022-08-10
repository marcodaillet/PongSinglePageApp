import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TwoFactor = () => {
    const [redirectEnable, setRedirectEnable] = useState(false);
    const [redirectDisable, setRedirectDisable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getRedirect = async () => {
            try {
                const user = await axios.get('userData');
                console.log(user);
                if (user.data.twofa === true) {
                    setRedirectDisable(true);
                }
                else {
                    setRedirectEnable(true);
                }
            }
            catch (error) {
                console.log('error occured getting user data')
            }
        }
        getRedirect();
    }, [redirectEnable, redirectDisable]);

    useEffect(() => {
        if (redirectEnable){
            return navigate("/user/enabletwofactor");
        }
        else if (redirectDisable) {
            return navigate("/user/disabletwofactor")
        }
    },[redirectEnable, redirectDisable]);

    return (
        <div></div>
    )
}

export default TwoFactor;