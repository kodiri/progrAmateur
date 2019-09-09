import React, { useState } from 'react';

export default function Chat() {
    const [nameInput, setNameInput] = useState ("");

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
                onChange = {''}
                placeholder = "Please enter your chat room"
            />
            <br />
            <button type="submit">Join Chat!</button>
        </form>
    );
}