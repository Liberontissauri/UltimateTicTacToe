import RoomsTable from './components/RoomsTable';
import TextInput from './components/TextInput';
import styles from './Main.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react"

function App(props) {
  const [room_id, setRoomId] = useState("")
  const [password, setPassword] = useState("")
  const [room_list, setRoomList] = useState([])
  const navigate = useNavigate()
  //If this is not done socket io will keep creating connection each time there is a change in the state
  const [sockets_setted_up, setSocketsSettedUp] = useState(false)

  if(!sockets_setted_up) {
    props.socket.on("room_list", (data) => setRoomList(data))
    props.socket.on("room_id", (data) => setRoomId(data))
    setSocketsSettedUp(true)
  }

  function roomClick(clicked_room) {
    props.socket.emit("room_id", clicked_room.name)
  }
  function joinRoom() {
    navigate(`/games/${room_id}?password=${password}`)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ultimate Tic Tac Toe</h1>
      <h2 className={styles.inputLabel}>Room Code</h2>
      <TextInput value={room_id} onChange={(e) => {setRoomId(e.target.value)}}></TextInput>
      <h2 className={styles.inputLabel}>Room Password</h2>
      <TextInput value={password} onChange={(e) => {setPassword(e.target.value)}}></TextInput>
      <button className={styles.joinBtn} onClick={joinRoom}>Join Room</button>
      <Link to="/create">
        <button className={styles.createBtn}>Create Room</button>
      </Link>
      <RoomsTable rooms={room_list} onRoomClick={roomClick}></RoomsTable>
    </div>
  );
}

export default App;
