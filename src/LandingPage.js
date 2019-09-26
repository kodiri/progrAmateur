import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import JavaScript from "./Images/javaScript.png";
import CPlus from "./Images/c-plus.png";
import Python from "./Images/python.png";
import SQL from "./Images/sql.png";
import Icon from "./Images/Dev-icon.png"

export default function LandingPage(props) {
  const [nameInput, setNameInput] = useState("");
  const [room, setRoom] = useState("");
  const friendOptions = [
    {
      key: "JavaScript",
      text: "JavaScript",
      value: "JavaScript",
      image: { avatar: true, src: JavaScript }
    },
    {
      key: "Python",
      text: "Python",
      value: "Python",
      image: { avatar: true, src: Python }
    },
    {
      key: "C++",
      text: "C++",
      value: "C++",
      image: { avatar: true, src: CPlus }
    },
    {
      key: "SQL",
      text: "SQL",
      value: "SQL",
      image: { avatar: true, src: SQL }
    }
  ];

  const handleSubmit = e => {
    e.preventDefault();
    if (!nameInput) {
      return alert("username cannot be empty");
    }
    let Prom = new Promise(resolve => {
      resolve({ nameInput, room });
    });
    Prom.then(inputs => props.talkToChat(inputs));
    props.passSocket.emit("join", nameInput, room);
  };

  return (
    <section className="landing-Page">
      <div className="landing-Background">
        <div className="landing-Main-Strip">
          <h1 className="landing-Header">{"{ progrAmateur }"} </h1>
          <div className="landing-Intro-Container">
            <h3 className="landing-Intro"> Meet new people who share the passion to join the development world!</h3>
            <img className="Dev-Icon" src={Icon} alt="Developer Icon"></img>
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
                placeholder="Rooms"
                fluid
                selection
                defaultValue="JavaScript"
                onChange={(e, { value }) => setRoom(value)}
                options={friendOptions}
              />
              <button className="log-In-Button" type="submit">Join</button>
            </form>
            <br />
            <div className="rules">
            <h4 className="rules-Header">Chat Rules</h4>
            <ul className="landing-Container">
              <li className="landing-Rules">Please be kind, supportive and respectful to every participant of the chat at all times</li>
              <br />
              <li className="landing-Rules">No bullying</li>
              <br />
              <li className="landing-Rules">No sexism, racism, homophobia or other hate-based chat</li>
              <br />
              <li className="landing-Rules">Please only share relevant links</li>
              <br />
              <li className="landing-Rules">Don’t spam words or use all-caps</li>
              <br />
              <li className="landing-Rules">No spoilers to a game, TV show or film</li> 
              <br />
              <li className="landing-Rules">Don't create multiple logins for the purpose of disrupting the community</li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    </section>  
  );
}
