import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from './Main';
import Create from './Create';
import Game from "./Game"
import { io } from "socket.io-client"

const socket = io("http://localhost:5000");

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main socket={socket}/>}/>
        <Route path="/create" element={<Create socket={socket}/>}/>
        <Route path="/games/:gameId" element={<Game socket={socket}/>}/>
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
