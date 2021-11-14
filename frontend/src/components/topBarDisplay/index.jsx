import React from 'react'
import styles from "./TopBarDisplay.module.css"

function TopBarDisplay(props) {
    function selectImage(icon) {
        switch (icon) {
            case "circle":
                return "/icons/circle.svg";
            case "cross":
                return "/icons/cross.svg";
            case "none":
                return "";
            default:
                return "";
        }
    }
    return (
        <div className={styles.container}>
            <img src={selectImage(props.icon)} alt="" srcset="" className={styles.containerItem}/>
        </div>
    )
}

export default TopBarDisplay