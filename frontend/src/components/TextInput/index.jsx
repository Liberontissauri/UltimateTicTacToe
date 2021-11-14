import React from 'react'
import styles from "./TextInput.module.css"

function TextInput(props) {
    return (
    <div>
        <input className={styles.input} value={props.value} onChange={props.onChange} placeholder={props.placeholder}></input>
    </div>
    )
}

export default TextInput