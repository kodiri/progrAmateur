import React, { useState } from 'react';

export default function Chat() {
    return (
        <form>
            <input
                id = "userName"
                onChange = {''}
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