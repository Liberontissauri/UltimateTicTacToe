import styles from './Game.module.css';
import { useState } from "react"
import Board from "./components/board"
import TopBarDisplay from './components/topBarDisplay';
import NextPlayerDisplay from './components/NextPlayerDisplay';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Confirm, Report } from 'notiflix';

function clickSquare(location) {
  console.log("click action at " + location.x + ";" + location.y)
}
function clickGiveUp() {
  console.log("give up clicked")
}

function Game(props) {
  const [current_player, setCurrentPlayer] = useState("cross");
  const [next_player, setNextPlayer] = useState("circle")
  const [board_content, setBoardContent] = useState([[{piece: "none"},{piece: "cross"},{piece: "none"},{piece: "none"}],
                                                      [{piece: "none"},{piece: "none"},{piece: "none"},{piece: "none"}],
                                                      [{piece: "none"},{piece: "none"},{piece: "none"},{piece: "none"}],
                                                      [{piece: "none"},{piece: "none"},{piece: "none"},{piece: "none"}]]);
  
  const { gameId } = useParams()
  let [searchParams, setSearchParams] = useSearchParams()
  const password = searchParams.get("password")

  //If this is not done socket io will keep creating connection each time there is a change in the state
  const [sockets_setted_up, setSocketsSettedUp] = useState(false)

  if(!sockets_setted_up) {
    joinRoom(gameId, password)

    props.socket.on("game_update", gamedata => {
      const board = gamedata.board;
      const next_player = gamedata.next_player;
      const current_player = gamedata.current_player;

      setBoardContent(board)
      setNextPlayer(next_player)
      setCurrentPlayer(current_player)
    })
    props.socket.on("win", () => {
      Confirm.show(
        "You Won",
        "Do you want to play again?",
        "Play again", "Leave Room",
        playAgain, leaveRoom
      )
    })
    props.socket.on("wrong_password", () => {
      Confirm.prompt(
        "Wrong Password",
        "Input a password:",
        password => joinRoom(gameId, password),
        () => leaveRoom(gameId)
      )
    })
    props.socket.on("alert-error", data => {
      Report.failure("Oops...", data, "Proceed")
    })
  }

  function joinRoom(id, password) {
    props.socket.emit("join_room", {id: id, password: password})
  }
  function leaveRoom(id) {

  }
  function playAgain() {

  }

  return (
    <div className={styles.background}>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <div className={styles.headerBar} style={{width: "100%", height: "200px", position: "absolute", top: "0"}}>
            <button onClick={clickGiveUp} className={styles.giveUpButton}>Give Up</button>
            <TopBarDisplay icon={current_player}></TopBarDisplay>
            <NextPlayerDisplay icon={next_player}></NextPlayerDisplay>
        </div>
        <Board squareAction={clickSquare} content={board_content} grid_size={6}></Board>
    </div>
  );
}
export default Game;