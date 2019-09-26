export default function getFinalColor() {
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

//rgb(3,179,192)
//rgb(0,134,195)