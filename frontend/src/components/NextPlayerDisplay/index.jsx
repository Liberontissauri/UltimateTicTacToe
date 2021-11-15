import React from 'react'
import styles from "./NextPlayerDisplay.module.css"

function NextPlayerDisplay(props) {
    function selectImage(icon) {
        switch (icon) {
            case "circle":
                return "/icons/circle.svg";
            case "cross":
                return "/icons/cross.svg";
            case "triangle":
                return "/icons/triangle.svg";
            case "square":
                return "/icons/square.svg";
            default:
                return "";
        }
    }
    return (
        <div className={styles.container}>
            <img src={selectImage(props.icon)} alt="" srcset="" className={styles.icon}/>
            <h2 className={styles.nextLabel}>is Next</h2>
        </div>
    )
}

export default NextPlayerDisplay