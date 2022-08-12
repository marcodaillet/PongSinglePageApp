import axios from "axios";
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap";
import { ChatFeed } from "./ChatFeed/ChatFeed";
import { SideBar } from "./SideBar/SideBar";
import { UserBar } from "./UserBar/UserBar";

export const Chat = () => {
    const [currentChannelId, setCurrentChannelId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        let bool = true;
        const getUser = async () => {
            const {data} = await axios.get('userData');
            if (bool) {
                setUserName(data.username)
                setAvatar(data.avatar);
                setUserId(data.userId)
            }
        }
        getUser();
        return () => {bool = false};
    }, []);

    return (
        <div>
            <UserBar Avatar={avatar} UserName={userName}></UserBar>
            <Row>
                <Col className="gutter-row" span={18}>
                    <ChatFeed userId={userId} currentChannelId={currentChannelId} setCurrentChannelId={setCurrentChannelId} />
                </Col>
                <Col className="gutter-row" span={3}>
                    <SideBar userName={userName} userId={userId} currentChannelId={currentChannelId} setCurrentChannelId={setCurrentChannelId} />
                </Col>
            </Row>
        </div>
    )
}