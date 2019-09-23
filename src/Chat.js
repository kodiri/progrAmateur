import React, { useState, useEffect } from "react";
import Messages from "./Messages.js";
import Online from "./Online.js";
import useSocket from "use-socket.io-client";
import { useImmer } from "use-immer";
import LandingPage from "./LandingPage.js";

export default function Chat(props) {
  const [room, setRoom] = useState("");
  const [socket] = useSocket("https://programateur.herokuapp.com"); //https://open-chat-naostsaecf.now.sh

  socket.connect();
  console.table(socket);
  const [id, setId] = useState("");
  const [messages, setMessages] = useImmer([]);
  const [online, setOnline] = useImmer([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("update", message => {
      setMessages(draft => {
        draft.push(["", message]);
      })
    })

    socket.on("people-list", people => {
      let newState = [];
      for (let person in people) {
        newState.push([people[person].id, people[person].fakeName]);
      }
      setOnline(draft => {
        draft.push(...newState);
      });
    });

    socket.on("add-person", (fakeName, id) => {
      setOnline(draft => {
        draft.push([id, fakeName]);
      });
    });

    socket.on("remove-person", id => {
      setOnline(draft => draft.filter(m => m[0] !== id));
    });

    socket.on("message queue", (fakeName, message) => {
      setMessages(draft => {
        draft.push([fakeName, message]);
      });
    });
    socket.on("chat message", (nick, message) => {
      setMessages(draft => {
        draft.push([nick, message]);
      });
    });
  }, []);
  const handleSend = e => {
    e.preventDefault();
    if (input !== "") {
      console.log(input);
      socket.emit("chat message", input, room);
      setInput("");
    }
  };

  function talkToLandingPage({nameInput, room}) {
    console.log('in chat name inputs are', nameInput, room);
    setId(nameInput);
    setRoom(room);
  }

  return id ? (
    <section className="chatSection">
       <div className="chatBackground">
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
      </div>
    </section>
  ) : (
    <LandingPage talkToChat={talkToLandingPage} passSocket = {socket}/>
  ) 
}
