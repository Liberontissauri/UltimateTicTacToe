import styles from './Create.module.css';
import TextInput from './components/TextInput';
import { useState } from "react"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useNavigate } from "react-router-dom"

Notify.init({
  clickToClose: true
})

function Game(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [board_size, setBoardSize] = useState("");
    const [player_limit, setPlayerLimit] = useState("")
    const navigate = useNavigate()

    //If this is not done socket io will keep creating connection each time there is a change in the state
    const [sockets_setted_up, setSocketsSettedUp] = useState(false)

    function createRoom(name, password, board_size, player_limit) {
      props.socket.emit("create_room", {name, password, board_size, player_limit})
    }

    if(!sockets_setted_up) {
      props.socket.on("app-error", (data) => {
        Notify.failure(data);
      })
      props.socket.on("app-success", (data) => {
        Report.success(
          "Success",
          data,
          "Proceed", () => {
            navigate("/")
          })
        
      })
      setSocketsSettedUp(true)
    }
  
    return (
        <div className={styles.background}>
            <h1 className={styles.title}>Create a Room</h1>
            <h2 className={styles.inputLabel}>Room Name</h2>
            <TextInput onChange={(e) => {setName(e.target.value)}}></TextInput>
            <h2 className={styles.inputLabel}>Room Password</h2>
            <TextInput onChange={(e) => {setPassword(e.target.value)}} placeholder={"No Password"}></TextInput>
            <h2 className={styles.inputLabel}>Board Size</h2>
            <TextInput onChange={(e) => {setBoardSize(e.target.value)}}></TextInput>
            <h2 className={styles.inputLabel}>Player Limit</h2>
            <TextInput onChange={(e) => {setPlayerLimit(e.target.value)}}></TextInput>
          <button className={styles.createBtn} onClick={() => {createRoom(name, password, board_size, player_limit)}}>Create Room</button>
        </div>
        
      );
}
export default Game;