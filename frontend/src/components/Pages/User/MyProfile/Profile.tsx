
import { Button, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { GameData } from "../../../../datamodels/game";
import { User } from "../../../../datamodels/user";
import "../style/style.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";

export const Profile = () => {
    const [played, setPlayed] = useState(0);
    const [wins, setWins] = useState(0);
    const [looses, setLooses] = useState(0);
    const [friends, setFriends] = useState([]);
    const [rank, setRank] = useState('');
    const [user, setUser] = useState({username: '', avatar: '', id: 0, privateGame: -1, privatePartner: -1});
    const [games, setGames] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let bool = true;
        const getUser = async () => {
            const {data} = await axios.get('userData');
            if (bool)
                setUser(data);
        }
        getUser();
        return () => {bool = false};
    }, []);

    useEffect(() => {
        let bool = true;
        const getFriends = async () => {
            const {data} = await axios.get('user/userFriends');
            if (bool)
                setFriends(data.friends);                
        }
        getFriends();
        return () => {bool = false};
    }, [user]);

    useEffect(() => {
        let bool = true;
        const getGameData = async () => {
            const data = await axios.get('game/getGameHistoric');
            if (bool)
                setGames(data.data);
        }
        getGameData();
        return () => {bool = false};
    }, []);

    useEffect(() => {
        let bool = true;
        let win_count = 0;
        let lost_count = 0;

        const getGamesStats = async () => {
            games.forEach((gameData: GameData) => {
                if (gameData.winner_id === user.id)
                    win_count++;
                else if (gameData.looser_id === user.id)
                    lost_count++;
            });
            if (bool) {
                setWins(win_count);
                setLooses(lost_count);
                setPlayed(win_count + lost_count)
                if (win_count < 1)
                    setRank("Bronze")
                else if (win_count < 3)
                    setRank("Silver")
                else if (win_count < 5)
                    setRank("Gold")
                else if (win_count < 10)
                    setRank("Platine")
                else if (win_count < 15)
                    setRank("Diamond")
            }
        }
        getGamesStats();
        return () => {bool = false;}
    }, [user.id, games]);

    const acceptInvite = async (e: SyntheticEvent) => {
        e.preventDefault();
        return navigate("/game/playing", {state: { userId: user.id, type: 1, gameId: user.privateGame, invitationId: -1, canvasX: 600 }});
    }

    const removeFriend = async (e: SyntheticEvent, userId: number, friendId: number) => {
        e.preventDefault();
        try {
            await axios.post("user/deleteFriend", {userID: userId, friendID: friendId})
            alert("You deleted this friend");
            window.location.reload();
        }
        catch (error) {
            console.log("error occurred while deleting this friend");
        }
    }

    const spectateFriend = async (e: SyntheticEvent, userId: number, friendId: number) => {
        e.preventDefault();
        try {
            const info = await axios.post("game/spectateFriend", {userID: userId, friendID: friendId})
            return navigate("/game/playing", {state: { userId: user.id, type: -1, gameId: info.data.id, invitationId: -1, canvasX: 600}})
        }
        catch (error) {
            console.log("error occurred while trying to spectate this friend");
        }
    }

    return (
        <div className="container profilepage">
            <Row align="middle" justify="center">
                <Col span={8}>
                    <div className="nameAvatar">
                        <div>
                            <img className="avatarPublicProfile" src={user.avatar} alt=""></img>
                            <Typography fontSize={32} fontStyle="italic">{user.username}</Typography>
                        </div>
                    </div>
                    {
                        user.privateGame !== -1 ? 
                        <div>
                            <Typography>You have a pending game invite</Typography>
                            <Button variant="contained" size="small"  onClick={acceptInvite} type="button">Accept</Button>
                        </div>
                        : null
                    }
                    {
                        friends.length !== 0 ?
                        <div>
                            <div>
                                <Typography fontSize={32} fontStyle="italic">Friends</Typography>
                            </div>
                            <div>
                                <table className="customTable">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Username</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {friends.map((friend: User) =>
                                        <tr key={friend.id}>
                                            <td><img src={`${friend.avatar}`} className="avatar" alt=""></img></td>
                                            <td>{friend.username}</td>
                                            <td>{friend.status}</td>
                                            <td><Button variant="contained" size="small"   onClick={(e) => {removeFriend(e, user.id, friend.id)}} type="button" className="buttonRemove">Remove Friend</Button></td>
                                            {
                                                friend.status === "IN GAME" ? <td><button onClick={(e) => {spectateFriend(e, user.id, friend.id)}} type="button" className="buttonRemove">Spectate Game</button></td> : null
                                            }
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null
                    }
                    </Col>
                    <Col span={1}>
                        <div></div>
                    </Col>
                    <Col span={8}>
                    <div className="row profile-content">
                        <div className="row">
                                <Typography fontSize={32} fontStyle="italic">Games Statistics</Typography>
                        </div>
                        <div className="row">
                            <table className="customTable">
                                <thead>
                                    <tr>
                                        <th>Games won</th>
                                        <th></th>
                                        <th>Games lost</th>
                                        <th></th>
                                        <th>Games Played</th>
                                        <th></th>
                                        <th>Rank</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{wins}</td>
                                        <td></td>
                                        <td>{looses}</td>
                                        <td></td>
                                        <td>{played}</td>  
                                        <td></td>
                                        <td>{rank}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="row">
                                <Typography fontSize={32} fontStyle="italic">Games History</Typography>
                            </div>
                            <div className="row">
                                <table className="customTable">
                                    <thead>
                                        <tr>
                                            <th>Game ID</th>
                                            <th>Player 1</th>
                                            <th></th>
                                            <th>Player 2</th>
                                            <th>Winner</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {games.filter((game: GameData) => (game.winner_id === user.id || game.looser_id === user.id) && (game.winner_point === 5)).map((gameData: GameData) => 
                                        <tr key={gameData.id}>
                                            <td>#{gameData.id}</td>
                                            <td>{gameData.winner_name}: {gameData.winner_point} points</td>
                                            <td> VS </td>
                                            <td>{gameData.looser_name}: {gameData.looser_point} points</td>
                                            {
                                            <td>{gameData.winner_name}</td>
                                            }
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}