import React from 'react'
import styles from "./RoomsTable.module.css"
import RoomItem from "../RoomItem"

function RoomsTable(props) {
    return (
    <div>
        <h3 className={styles.title}>Public Rooms:</h3>
        {props.rooms.map((room) => <RoomItem onClick={() => {props.onRoomClick(room)}} name={room.name} is_protected={room.is_protected} player_number={room.player_number} player_limit={room.player_limit}></RoomItem>)}
    </div>
    )
}

export default RoomsTable