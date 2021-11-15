import React from 'react'
import styles from "./BoardSquare.module.css"

function BoardSquare(props) {
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
        <div onClick={() => props.onClick(props.location)} className={styles.square}>
            <img src={selectImage(props.icon)} alt="" srcset="" className={styles.squareItem}/>
        </div>
    )
}

export default BoardSquare
