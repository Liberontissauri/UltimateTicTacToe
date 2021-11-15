function checkHorizontalWin(board, win_streak, x, y) {
    let streak_counter = 0;
    let pointer_x = x;
    let pointer_y = y;
    const player_piece = board[y][x].piece;
    const board_length = board.length;

    while(true) {
        pointer_x -= 1;
        if(pointer_x < 0) {
            pointer_x = 0;
            break;
        };
        if(board[pointer_y][pointer_x].piece != player_piece) {
            pointer_x += 1;
            break;
        }
    }
    while(true) {
        if(pointer_x >= board_length) {
            break
        }
        if(board[pointer_y][pointer_x].piece != player_piece) break;
        streak_counter += 1;
        pointer_x += 1;
        if(streak_counter == win_streak) return true
    }
    return false
}
function checkVerticalWin(board, win_streak, x, y) {
    let streak_counter = 0;
    let pointer_x = x;
    let pointer_y = y;
    const player_piece = board[y][x].piece;
    const board_length = board.length;

    while(true) {
        pointer_y -= 1;
        if(pointer_y < 0) {
            pointer_y = 0;
            break;
        };
        if(board[pointer_y][pointer_x].piece != player_piece) {
            pointer_y += 1;
            break;
        }
    }
    while(true) {
        if(pointer_y >= board_length) {
            break
        }
        if(board[pointer_y][pointer_x].piece != player_piece) break;
        streak_counter += 1;
        pointer_y += 1;
        if(streak_counter == win_streak) return true
    }
    return false
}
function checkDiagonalRightWin(board, win_streak, x, y) {
    let streak_counter = 0;
    let pointer_x = x;
    let pointer_y = y;
    const player_piece = board[y][x].piece;
    const board_length = board.length;

    while(true) {
        pointer_y += 1;
        if(pointer_y >= board_length) {
            pointer_y = board_length - 1;
            break
        };
        pointer_x -= 1;
        if(pointer_x < 0) {
            pointer_x= 0;
            break
        };
        if(board[pointer_y][pointer_x].piece != player_piece) {
            pointer_x += 1;
            pointer_y -= 1;
            break;
        }
    }
    while(true) {
        if(pointer_y >= board_length || pointer_x >= board_length) {
            break
        }
        if(board[pointer_y][pointer_x].piece != player_piece) break;
        streak_counter += 1;
        pointer_x += 1;
        pointer_y -= 1;
        if(streak_counter == win_streak) return true
    }
    return false
}
function checkDiagonalLeftWin(board, win_streak, x, y) {
    let streak_counter = 0;
    let pointer_x = x;
    let pointer_y = y;
    const player_piece = board[y][x].piece;
    const board_length = board.length;

    while(true) {
        pointer_y += 1;
        if(pointer_y >= board_length) {
            pointer_y = board_length - 1;
            break
        };
        pointer_x += 1;
        if(pointer_x >= board_length) {
            pointer_x = board_length - 1;
            break
        };
        if(board[pointer_y][pointer_x].piece != player_piece) {
            pointer_x -= 1;
            pointer_y -= 1;
            break;
        }
    }
    while(true) {
        if(pointer_y < 0 || pointer_x < 0) {
            break
        }
        if(board[pointer_y][pointer_x].piece != player_piece) break;
        streak_counter += 1;
        pointer_x -= 1;
        pointer_y -= 1;
        if(streak_counter == win_streak) return true
    }
    return false
}

module.exports.checkHorizontalWin = checkHorizontalWin
module.exports.checkVerticalWin = checkVerticalWin
module.exports.checkDiagonalRightWin = checkDiagonalRightWin
module.exports.checkDiagonalLeftWin = checkDiagonalLeftWin