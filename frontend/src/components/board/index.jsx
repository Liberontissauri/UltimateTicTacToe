import React from 'react'
import styles from "./Board.module.css"
import BoardSquare from '../boardSquare';

function generateTemplateText(gridSize) {
    let template_text = "";
    let percentage = 100/gridSize + "% "
    for (let index = 0; index < gridSize; index++) {
        template_text += percentage;
    }
    return template_text;
}

function Board(props) {
    // the props square action argument will execute the function passed giving as arguments the square's position

    let board_squares = [];
    let grid_size = props.content.length;
    let location = {x: 0, y: 0}
    props.content.forEach(row => {
        row.forEach(square => {
            board_squares.push(<BoardSquare location={{x: location.x, y: location.y}} onClick={props.squareAction} icon={square.piece}></BoardSquare>)
            location.x += 1;
        });
        location.x = 0;
        location.y += 1;
    });
    return (
        <div className={styles.board} style={
            {
                gridTemplateColumns: generateTemplateText(grid_size),
                gridTemplateRows: generateTemplateText(grid_size)
            }
        }>
            {board_squares}
        </div>
    )
}

export default Board
