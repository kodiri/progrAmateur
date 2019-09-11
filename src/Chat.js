import React, { useState, useEffect } from "react";
import Messages from "./Messages.js";
import Online from "./Online.js";
import useSocket from "use-socket.io-client";
import { useImmer } from "use-immer";

export default function Chat() {
  const [id, setId] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [room, setRoom] = useState("");
  const [socket] = useSocket("https://open-chat-naostsaecf.now.sh");

  socket.connect();
  console.table(socket);

  const [messages, setMessages] = useImmer([]);
  const [online, setOnline] = useImmer([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("update", message =>
      setMessages(draft => {
        draft.push(["", message]);
      })
    );

    socket.on("people-list", people => {
      let newState = [];
      for (let person in people) {
        newState.push([people[person].id, people[person].fakeName]);
      }
      setOnline(draft => {
        draft.push(...newState);
      });
      console.log(online);
    });

    socket.on("add-person", (fakeName, id) => {
      setOnline(draft => {
        draft.push([id, fakeName]);
      });
    });

    socket.on("remove-person", id => {
      setOnline(draft => draft.filter(m => m[0] !== id));
    });

    socket.on("message que", (fakeName, message) => {
      setMessages(draft => {
        draft.push([fakeName, message]);
      });
    });
    socket.on("chat message", (nick, message) => {
      setMessages(draft => {
        draft.push([nick, message]);
      });
    });
  }, 0);

  const handleSubmit = e => {
    e.preventDefault();
    if (!nameInput) {
      return alert("username cannot be empty");
    }
    setId(nameInput);
    socket.emit("join", nameInput, room);
  };

  const handleSend = e => {
    e.preventDefault();
    if (input !== "") {
      socket.emit("chat message", input, room);
      setInput("");
    }
  };

  return id ? (
    <section className="chatSection">
      <ul id="messages">
        <Messages data={messages} />
      </ul>
      <ul id="online">
        {""} : <Online data={online} />{" "}
      </ul>
      <div id="sendform">
        <form className="form" onSubmit={e => handleSend(e)}>
          <input id="m" onChange={e => setInput(e.target.value.trim())} />
          <button type="submit">send</button>
        </form>
      </div>
    </section>
  ) : (
    <body className="landing-Page">
      <div className="background">
        <div className="main-Strip">
          <h1 className="header">progrAmateur</h1>
          <h3>Meet new people who share the passion to join the development world!</h3>
          <form className="log-In" onSubmit={event => handleSubmit(event)}>
            <p className="log-In-Keys">Log-In</p>
            <input
              id="userName"
              onChange={e => setNameInput(e.target.value.trim())}
              required
              placeholder="Please enter your username"
            />
            <br />
            <input
              id="chatRoom"
              onChange={e => setRoom(e.target.value.trim())}
              placeholder="Please enter your chat room"
            />
            <br />
            <button type="submit">Join Chat!</button>
          </form>
          <p>
            Make your own chat room with full control over it.
            <br />
            <br />
            Access to useful links such as StackOverflow etc.
            </p>
        </div>
      </div>
    </body>
  );
}
