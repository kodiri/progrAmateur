import React, { useState } from "react";

export default function LandingPage(props) {
  const [nameInput, setNameInput] = useState("");
  const [room, setRoom] = useState("");


  const handleSubmit = e => {
    e.preventDefault();
    if (!nameInput) {
      return alert("username cannot be empty");
    }
    let Prom = new Promise((resolve) => {
      resolve({nameInput, room})
    })
    Prom.then((inputs)=> props.talkToChat(inputs))
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
              <input
                className="landing-Inputs"
                id="chatRoom"
                onChange={e => setRoom(e.target.value.trim())}
                placeholder="Please enter chat room"
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
