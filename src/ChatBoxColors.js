export default function ChatBoxColors() {
  const getRGB = () => {
    return Math.round(Math.random() * 256);
  };
  return [getRGB(), getRGB(), getRGB()];
}

