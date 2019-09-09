import React, { useState, useEffect } from "react";
import useSocket from "use-socket.io-client";
import { useImmer } from 'use-immer';

export default function Chat() {
    const [nameInput, setNameInput] = useState ("");
    const [room, setRoom] = useState ("");
    const [socket] = useSocket("");

    socket.connect();
    console.log(socket);

    const [messages, setMessages] = useImmer([])
    useEffect(() => { 
        socket.on("update", message => setMessages(draft => {
            draft.push(["", message]);
        }));
    }, 0);

    const handleSubmit = e => {
        e.preventDefault();
        if (!nameInput) {
            return alert("username cannot be empty");
        } 
    }

    return (
        <form onSubmit={event => handleSubmit(event)}>
            <input
                id = "userName"
                onChange = {e => setNameInput(e.target.value.trim())}
                required
                placeholder = "Please enter your username" 
            />
            <br />
            <input 
                id = "chatRoom"
                onChange = {e => setRoom(e.target.value.trim())}
                placeholder = "Please enter your chat room"
            />
            <br />
            <button type="submit">Join Chat!</button>
        </form>
    );
}