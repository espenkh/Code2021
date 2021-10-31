import { useRef } from "react";
import { getRandomColor } from "../getRandomColor";
import { Text } from "@react-three/drei";

const Room = (props) => {
  const { width, height, anchorTopLeftX, anchorTopLeftY, text } = props;

  const meshRef = useRef();
  const position = [
    width / 2 + anchorTopLeftX,
    1.5,
    height / 2 + anchorTopLeftY,
  ];

  return (
    <mesh position={position} ref={meshRef} rotation-x={Math.PI * -0.5}>
      <boxGeometry args={[width, height, 3]} />
      <meshStandardMaterial color={getRandomColor()} />
      <Text scale={[width, width, width]} anchorX="center" anchorY="center">
        {text}
      </Text>
    </mesh>
  );
};

export default Room;
