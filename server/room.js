class Room {
    constructor(io, name, password, board_size, player_limit) {
        this.io = io;
        this.name = name;
        this.id = this.generateId();
        this.password = password;
        this.board = this.generate_board(board_size);
        this.player_limit = player_limit;
        this.connected_players = [];
        this.possible_pieces = [
            "cross",
            "circle",
            "triangle",
            "square"
        ];
        this.turn = 0;
        setInterval(() => {
            this.updateClients()
        }, 500)
    }
    getCurrentPlayer() {
        if(this.connected_players.length == 0) return "none"
        let turn = this.turn;
        while (turn > 0) {
            turn -= this.connected_players.length
        }
        return this.connected_players[turn * -1].piece
    }
    getNextPlayer() {
        if(this.connected_players.length == 0) return "none"
        let turn = this.turn;
        while (turn > 0) {
            turn -= this.connected_players.length
        }
        turn = turn * -1
        turn += 1
        if(turn > this.connected_players.length - 1) turn = 0;
        
        return this.connected_players[turn].piece
    }
    generateId() {
        let id = "";
        for (let index = 0; index < 8; index++) {
            id += Math.floor(Math.random() * 10)
        }
        return id;
    }
    generate_board(size) {
        let board = []
        for (let y = 0; y < size; y++) {
            board.push([])
            for (let x = 0; x < size; x++) {
                board[y].push({
                    piece: "none"
                })
                
            }
        }
        return board
    }
    getPlayerBySocketId(socket_id) {
        let player = this.connected_players.find(element => element.socket.id == socket_id)
        return player
    }
    getAvailablePieces() {
        let available_pieces = this.possible_pieces.slice();
        this.connected_players.forEach(player => {
            const piece = player.piece;
            let piece_index = available_pieces.indexOf(piece)
            available_pieces.splice(piece_index, 1)
        });
        return available_pieces;
    }
    addPlayer(socket, password) {
        if(this.connected_players.length >= this.player_limit) return socket.emit("error", "The room is full")
        if(password != password) return socket.emit("wrong_password")
        let available_pieces = this.getAvailablePieces();
        let piece = available_pieces[Math.floor(Math.random() * (Math.abs(available_pieces.length)))]
        
        console.log("Adding...")
        socket.join(this.id)
        this.connected_players.push({socket: socket, piece: piece})
    }
    removePlayer(socket_id) {
        let player_index = this.connected_players.find(player => player.socket.id == socket_id)
        this.connected_players[player_index].socket.leave(this.id)
        this.connected_players.splice(player_index, 1)
    }
    getPlayerCount() {
        return this.connected_players.length
    }
    isProtected() {
        if(this.password.length == 0) return false
        return true
    }
    updateClients() {
        this.io.to(this.id).emit("game_update", {
            
            board: this.board,
            current_player: this.getCurrentPlayer(),
            next_player: this.getNextPlayer()
        })
    }
    makeMove(socket, x, y) {
        const player = this.getPlayerBySocketId(socket.id);
        if(this.board[y][x].piece != "none") socket.emit("alert-error", "You can't play in occupied squares");
        this.board[y][x].piece = player.piece;
    }
}

module.exports.Room = Room;