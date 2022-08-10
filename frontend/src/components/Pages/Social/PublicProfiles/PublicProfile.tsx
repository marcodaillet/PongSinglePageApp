import { Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { GameData } from "../../../../datamodels/game";
import axios from "axios";

var GameDataTmp = [
    {
        gameId: 0,
        gameUrl: 'test',
        firstPlayerName: 'jeanjacques',
        firstPlayerId: 0,
        firstPlayerScore: 100,
        secondPlayerName: 'michel',
        secondPlayerId: 1,
        secondPlayerScore: 0,
        winner: 0,
        loser: 1,
        currentlyGoingOn: false,
    },
    {
        gameId: 1,
        gameUrl: 'test',
        firstPlayerName: 'jeanjacques',
        firstPlayerId: 0,
        firstPlayerScore: 3,
        secondPlayerName: 'michel',
        secondPlayerId: 1,
        secondPlayerScore: 72,
        winner: 1,
        loser: 0,
        currentlyGoingOn: false,
    },
    {
        gameId: 2,
        gameUrl: 'test',
        firstPlayerName: 'jeanjacques',
        firstPlayerId: 0,
        firstPlayerScore: 32,
        secondPlayerName: 'michel',
        secondPlayerId: 1,
        secondPlayerScore: 21,
        winner: 0,
        loser: 1,
        currentlyGoingOn: false,
    },
]


export const PublicProfile = (props: any) => {    
    const [user, setUser] = useState({username: "", avatar:"", id: 0});
    const [publicUser, setPublicUser] = useState({username: "", avatar:"", id: -1});
    const [games, setGames] = useState(GameDataTmp);
    const [publicUserName, setPublicUserName] = useState(useLocation().state);
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
            const {data} = await axios.get('user/findUser' + `${publicUserName}`) //await getUserData();
            if (bool)
                setPublicUser(data);
        }
        getPublicUser();
        return () => {bool = false};
    }, []);


    useEffect(() => {
        let bool = true;
        const getGameData = async () => {
            const data = GameDataTmp;
            if (bool)
                setGames(data);
        }
        getGameData();
        return () => {bool = false};
    });

    const sendInvite = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        return navigate("/game/playing", {state: { userId: user.id, type: 1, gameId: -1, invitationId: publicUser.id, canvasX: 800 }});
    }

    const addFriend = async (e: SyntheticEvent, userId: number, friendId: number) => {
        e.preventDefault();
        try {
            const ret = await axios.post("user/addFriend", {userID: userId, friendID: friendId})
            alert("You added a new friend");
        }
        catch (error) {
            console.log("error occurred while adding this friend");
        }
    }

    return (
        <div className="container profilepage">
            <div className="row">
                <div className="row profile-content">
                    <div className="nameAvatar">
                        <div>
                            <img className="avatar" src={publicUser.avatar} alt=""></img>
                        </div>
                        <div>
                        <Typography fontSize={32} fontStyle="italic">{publicUser.username}</Typography>
                        </div>
                    </div>
                    <div className="row">
                        <table className="customTable">
                            <tbody>
                                <tr>
                                    <td><button onClick={(e) => {sendInvite(e, publicUser.id)}}>Invite for a game</button></td>
                                    <td> - </td>
                                    <td><button onClick={(e) => {addFriend(e, user.id, publicUser.id)}}>Invite as friend</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
                                </tr>
                            </thead>
                            {/* <tbody>
                                <tr>
                                    <td>{publicUser.numberWins}</td>
                                    <td> - </td>
                                    <td>{publicUser.numberLosses}</td>
                                    <td> - </td>
                                    <td>{publicUser.numberWins + publicUser.numberLosses}</td>    
                                </tr>
                            </tbody> */}
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
                                        <th> - </th>
                                        <th>Player 2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.filter((game: GameData) => !game.currentlyGoingOn && (game.firstPlayerId === user.id || game.secondPlayerId === user.id)).map((gameData: GameData) => 
                                    <tr key={gameData.gameId}>
                                        <td>#{gameData.gameId}</td>
                                        <td>{gameData.firstPlayerName} - {gameData.firstPlayerScore}</td>
                                        <td> VS </td>
                                        <td>{gameData.secondPlayerName} - {gameData.secondPlayerScore}</td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}