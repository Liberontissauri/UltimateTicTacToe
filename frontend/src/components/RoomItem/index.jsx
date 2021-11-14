import React from 'react'
import styles from "./RoomItem.module.css"

function RoomsItem(props) {
    function isProtectedText(isProtected) {
        if(isProtected) return "Password Protected";
        return "No Password"
    }
    return (
    <div className={styles.container} onClick={props.onClick}>
        <div className={styles.itemContainer}><h3 className={`${styles.text} ${styles.left}`}>{props.name}</h3></div>
        <div className={styles.itemContainer}><h3 className={`${styles.text} ${styles.center}`}>{isProtectedText(props.is_protected)}</h3></div>
        <div className={styles.itemContainer}><h3 className={`${styles.text} ${styles.right}`}>{props.player_number}/{props.player_limit}</h3></div>
    </div>
    )
}

export default RoomsItem