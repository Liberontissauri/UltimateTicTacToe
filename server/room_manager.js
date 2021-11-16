const Room = require("./room").Room

class Room_Manager {
    constructor(io) {
        this.io = io;
        this.room_list = [];
        this.setup()
    }
    setup() {
        setInterval(() => {
            this.io.emit("room_list", this.getPublicRoomList())
        }, 1000)
        this.io.on("connection", socket => {
            socket.emit("room_list", this.getPublicRoomList())
            socket.on("move", data => {
                const x = data.location.x;
                const y = data.location.y;
                const room_id = data.room_id;
                const room = this.room_list.find(room => room.id == room_id);
                const player = room.connected_players.find(player => player.socket.id == socket.id)
                if(!player) return socket.emit("alert-error", "You are not in this room!")
                room.makeMove(socket, x, y)
            })
            socket.on("create_room", data => {
                const name = data.name;
                const password = data.password;
                const board_size = data.board_size;
                const player_limit = data.player_limit;

                this.createRoom(socket, name, password, board_size, player_limit);
                this.io.emit("room_list", this.getPublicRoomList())
            })
            socket.on("leave_room", room_id => {
                if(!this.findRoomBySocketId(socket.id)) return
                this.leaveRoom(socket, room_id)
            })
            socket.on("join_room", data => {
                const room_id = data.id;
                const password = data.password;

                this.joinRoom(socket, room_id, password)
            })
            socket.on("room_id", data => {
                let name = data;
                let room = this.room_list.find(room => room.name == name);

                socket.emit("room_id", room.id)
            })
            socket.on("disconnect", data => {
                if(!this.findRoomBySocketId(socket.id)) return
                this.leaveRoom(socket, this.findRoomBySocketId(socket.id).id)
            })
            socket.on("reset_game", room_id => {
                const room = this.room_list.find(room => room.id == room_id);
                room.resetGame();
            })
        })
    }
    findRoomBySocketId(socket_id) {
        let final_room;
        this.room_list.forEach(room => {
            const player = room.connected_players.find(player => player.socket.id == socket_id)
            if(player != undefined) final_room = room;
        });
        return final_room;
    }
    createRoom(socket, name, password, board_size, player_limit) {
        if(name == "") return socket.emit("app-error", "Your room needs to have a name");
        if(board_size < 3 || board_size > 8) return socket.emit("app-error", "The board size should be between 3x3 and 8x8")
        if(player_limit < 2 || player_limit > 4) return socket.emit("app-error", "The player limit should be between 2 and 4")

        this.room_list.push(new Room(this.io, name, password, board_size, player_limit))
        socket.emit("app-success", "The Room Was Created Successfully!")
    }
    joinRoom(socket, room_id, password) {
        const room = this.room_list.find(room => room.id == room_id)
        if(!room) return socket.emit("alert-error", "The room does not exist")
        room.addPlayer(socket, password)
    }
    leaveRoom(socket, room_id) {
        const room = this.room_list.find(room => room.id == room_id)
        if(!room) return socket.emit("alert-error", "The room does not exist")
        room.removePlayer(socket.id)
        if(room.connected_players.length == 0) this.room_list.splice(this.room_list.indexOf(room), 1)
    }
    getPublicRoomList() {
        return this.room_list.map(room => {
            return {
              name: room.name,
              is_protected: room.isProtected(),
              player_number: room.getPlayerCount(),
              player_limit: room.player_limit
            }
        })
    }
}

module.exports = Room_Manager