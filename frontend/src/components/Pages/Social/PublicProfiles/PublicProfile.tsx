import { Button, Grid, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GameData } from "../../../../datamodels/game";
import axios from "axios";
import { Col, Row } from "antd";

export const PublicProfile = (props: any) => {    
    const [user, setUser] = useState({username: "", avatar:"", id: 0});
    const [played, setPlayed] = useState(0);
    const [wins, setWins] = useState(0);
    const [looses, setLooses] = useState(0);
    const [rank, setRank] = useState('');
    const [publicUser, setPublicUser] = useState({username: "", avatar:"", id: -1});
    const [games, setGames] = useState<any>([]);
    const publicUserName = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        let bool = true;
        const getUser = async () => {
            const {data} = await axios.get('userData')
            if (bool)
                setUser(data);
        }
        getUser();
        return () => {bool = false};
    }, []);

    useEffect(() => {
        let bool = true;
        const getPublicUser = async () => {
            const {data} = await axios.get(`user/findUser${publicUserName}`)
            if (bool)
                setPublicUser(data);
        }
        getPublicUser();
        return () => {bool = false};
    }, [publicUserName]);

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
                if (gameData.winner_id === publicUser.id)
                    win_count++;
                else if (gameData.looser_id === publicUser.id)
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
    }, [publicUser.id, games]);

    const sendInvite = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        return navigate("/game/playing", {state: { userId: user.id, type: 1, gameId: -1, invitationId: publicUser.id, canvasX: 600 }});
    }

    const addFriend = async (e: SyntheticEvent, userId: number, friendId: number) => {
        e.preventDefault();
        try {
            await axios.post("user/addFriend", {userID: userId, friendID: friendId})
            alert("You added a new friend");
        }
        catch (error) {
            console.log("error occurred while adding this friend");
        }
    }

    return (
        <div className="container profilepage">
            <div className="row">
                <Row align="middle" justify="center">
                    <Col span={8}>
                        <div className="nameAvatar">
                            <div>
                                <img className="avatarPublicProfile" src={publicUser.avatar} alt=""></img>
                                <Typography fontSize={32} fontStyle="italic">{publicUser.username}</Typography>
                            </div>
                        </div>
                        <Grid container direction="row" justifyContent="space-around" alignItems="center" >
                            <Button variant="contained" size="small" onClick={(e) => {sendInvite(e, publicUser.id)}}>Invite for a game</Button>
                            <Button variant="contained" size="small" onClick={(e) => {addFriend(e, user.id, publicUser.id)}}>Invite as friend</Button>
                        </Grid>
                    </Col>
                    <Col span={1}>
                        <div></div>
                    </Col>
                    <Col span={8}>
                        <div className="row profile-content">
                            <div className="row">
                                    <Typography fontSize={32} fontStyle="italic">Player Games Statistics</Typography>
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
                                    <Typography fontSize={32} fontStyle="italic">Player Games History</Typography>
                                </div>
                                <div className="row">
                                    <table className="customTable">
                                        <thead>
                                            <tr>
                                                <th>Game ID</th>
                                                <th>Player 1</th>
                                                <th></th>
                                                <th>Player 2</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {games.filter((game: GameData) => (game.winner_id === user.id || game.looser_id === user.id) && (game.winner_point === 5)).map((gameData: GameData) => 
                                            <tr key={gameData.id}>
                                                <td>#{gameData.id}</td>
                                                <td>{gameData.winner_name}: {gameData.winner_point} pts</td>
                                                <td></td>
                                                <td>{gameData.looser_name}: {gameData.looser_point} pts</td>
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
        </div>
    )
}