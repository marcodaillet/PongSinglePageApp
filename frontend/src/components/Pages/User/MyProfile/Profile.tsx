
import { Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { GameData } from "../../../../datamodels/game";
import { User } from "../../../../datamodels/user";
import "../style/style.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

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


export const Profile = () => {
    const [played, setPlayed] = useState(0);
    const [wins, setWins] = useState(0);
    const [looses, setLooses] = useState(0);
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState({username: '', avatar: '', id: 0, privateGame: -1, privatePartner: -1});
    const [games, setGames] = useState(GameDataTmp);
    const navigate = useNavigate()

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
            const data = GameDataTmp; //await getGames();
            if (bool)
                setGames(data);
        }
        getGameData();
        return () => {bool = false};
    });

    useEffect(() => {
        let bool = true;
        let count = 0;

        const getGamesWon = async () => {
            games.filter((game: GameData) => !game.currentlyGoingOn && game.winner === user.id).map((gameData: GameData) => 
                count++
            )
            if (bool)
                setWins(count);
        }
        getGamesWon();
        return () => {bool = false;}
    }, [user.id, games]);

    useEffect(() => {
        let bool = true;
        let count = 0;

        const getGamesLost = async () => {
            games.filter((game: GameData) => !game.currentlyGoingOn && game.winner !== user.id).map((gameData: GameData) => 
                count++
            )
            if (bool)
                setLooses(count);
        }
        getGamesLost();
        return () => {bool = false;}
    }, [user.id, games]);

    useEffect(() => {
        let count = 0;
        const getPlayed = async () => {
            count = wins + looses;
            setPlayed(count);
        }
        getPlayed();
    }, [looses, wins]);

    const acceptInvite = async (e: SyntheticEvent) => {
        e.preventDefault();
        return navigate("/game/playing", {state: { userId: user.id, type: 1, gameId: user.privateGame, invitationId: -1, canvasX: 800 }});
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

    return (
        <div className="container profilepage">
            <div className="row">
                <div className="row">
                    <div className="nameAvatar">
                        <div>
                            <img className="avatar" src={user.avatar} alt=""></img>
                        </div>
                        <div>
                        <Typography fontSize={32} fontStyle="italic">{user.username}</Typography>
                        </div>
                    </div>
                    {
                        user.privateGame !== -1 ? 
                        <div className="row">
                            <div>
                                <Typography>You have a pending game invite</Typography>
                                <button onClick={acceptInvite} type="button">Accept</button>
                            </div>
                        </div>
                        : <></>
                    }
                </div>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{wins}</td>
                                    <td> - </td>
                                    <td>{looses}</td>
                                    <td> - </td>
                                    <td>{played}</td>   
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
                                        <th> - </th>
                                        <th>Player 2</th>
                                        <th>Player 1 Score</th>
                                        <th>Player 2 Score</th>
                                        <th>Winner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games.filter((game: GameData) => !game.currentlyGoingOn && (game.firstPlayerId === user.id || game.secondPlayerId === user.id)).map((gameData: GameData) => 
                                    <tr key={gameData.gameId}>
                                        <td>#{gameData.gameId}</td>
                                        <td>{gameData.firstPlayerName}</td>
                                        <td> VS </td>
                                        <td>{gameData.secondPlayerName}</td>
                                        <td>{gameData.firstPlayerScore} points</td>
                                        <td>{gameData.secondPlayerScore} points</td>
                                        {
                                        gameData.firstPlayerScore >  gameData.secondPlayerScore ? 
                                        <td>{gameData.firstPlayerName}</td> : <td>{gameData.secondPlayerName}</td>
                                        }
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <Typography fontSize={32} fontStyle="italic">Friends</Typography>
                    </div>
                    <div className="row">
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
                                    <td><button onClick={(e) => {removeFriend(e, user.id, friend.id)}} type="button" className="buttonRemove">Remove Friend</button></td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}