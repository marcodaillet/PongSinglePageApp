import { Col, Grid, Row } from "antd";
import "antd/dist/antd.min.css"
import axios from "axios";
import { useEffect, useState } from "react"
import { ChatFeed } from "./ChatFeed/ChatFeed";
import { SideBar } from "./SideBar/SideBar";
import { UserBar } from "./UserBar/UserBar";

export const Chat = () => {
    const [currentChannelId, setCurrentChannelId] = useState(0);
    const [userId, setUserId] = useState<number>(0);
    const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        let bool = true;
        const getUser = async () => {
            if (bool) {
                const {data} = await axios.get('user/getUserId');
                setUserId(data.userId);
            }
        }
        getUser();
        return () => {bool = false};
    }, []);

    useEffect(() => {
        let bool = true;
        const getUserInfo = async () => {
            const {data} = await axios.get('userData');
            if (bool) {
                setUserName(data.username)
                setAvatar(data.avatar);
            }
        }
        getUserInfo();
        return () => {bool = false};
    }, []);

    return (
        <div>
            <UserBar Avatar={avatar} UserName={userName}></UserBar>
            <Row>
                <Col span={20}>
                    <ChatFeed userId={userId} currentChannelId={currentChannelId} setCurrentChannelId={setCurrentChannelId} />
                </Col>
                <Col span={4}>
                    <SideBar userName={userName} userId={userId} currentChannelId={currentChannelId} setCurrentChannelId={setCurrentChannelId} />
                </Col>
            </Row>
        </div>
    )
}