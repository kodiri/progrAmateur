import React, { useState } from "react";
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import JavaScript from './Images/javaScript.png';
import CPlus from './Images/c-plus.png';
import Python from './Images/python.png';
import SQL from './Images/sql.png';

export default function LandingPage(props) {
  const [nameInput, setNameInput] = useState("");
  const [room, setRoom] = useState("");
  const friendOptions = [
    {
      key: 'JavaScript',
      text: 'JavaScript',
      value: 'JavaScript', 
      image: { avatar: true, src: JavaScript},
    },
    {
      key: 'Python',
      text: 'Python',
      value: 'Python',
      image: { avatar: true, src: Python },
    },
    {
      key: 'C++',
      text: 'C++',
      value: 'C++',
      image: { avatar: true, src: CPlus },
    },
    {
      key: 'SQL',
      text: 'SQL',
      value: 'SQL',
      image: { avatar: true, src: SQL}
    }]


  const handleSubmit = e => {
    e.preventDefault();
    if (!nameInput) {
      return alert("username cannot be empty");
    }
    let Prom = new Promise((resolve) => {
      resolve({ nameInput, room })
    })
    Prom.then((inputs) => props.talkToChat(inputs))
    props.passSocket.emit("join", nameInput, room);
  };

  return (
    <section className="landing-Page">
      <div className="landing-Background">
        <div className="landing-Main-Strip">
          <h1 className="landing-Header">{"{ progrAmateur }"} </h1>
          <div className="landing-Intro-Container">
            <h3 className="landing-Intro">
              Meet new people who share the passion to join the development
              world!
            </h3>
            <br />
            <form className="log-In" onSubmit={event => handleSubmit(event)}>
              <p className="log-In-Key">Log In</p>
              <input
                className="landing-Inputs"
                id="userName"
                onChange={e => setNameInput(e.target.value.trim())}
                placeholder="Please enter username"
                required
              />
              <br />
              <Dropdown
                placeholder='Rooms'
                fluid
                selection
                onChange={(e, { value }) => setRoom(value)}
                options={friendOptions}
              />

              <br />
              <br />
              <button type="submit">Join</button>
            </form>
            <br />
            <p className="landing-Details">
              Make your own chat room with full control over it.
              <br />
              <br />
              Access to useful links such as StackOverflow etc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
