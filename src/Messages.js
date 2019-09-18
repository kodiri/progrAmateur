import React from "react";
import { getDiffieHellman } from "crypto";

export default function Messages(props) { 
    function getFinalColor() {
        let originColors = [0, 124,195];
        function ChatBoxColors() {
          const getRGB = (num) => {
            console.log(Math.round(Math.random() * num))
            return Math.round(Math.random() * num);
          };
          return [getRGB(3), getRGB((179-134)), getRGB((192-195))];
        
        }
      
        console.log(ChatBoxColors().map((color, i) => originColors[i]+color))
        return ChatBoxColors().map((color, i) => originColors[i]+color)
      }
    return (
        props.data.map(m => m[0] !=="" ?
            (<li className='newMessage' style={{backgroundColor: `rgb(${getFinalColor()[0]}, ${getFinalColor()[1]}, ${getFinalColor()[2]})`}}><strong>{m[0]}</strong> :
            <div className="innerMsg">{m[1]}</div></li>) :
            (<li className="update">{m[1]}</li>))
    );
}