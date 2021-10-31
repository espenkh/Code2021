import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, OrthographicCamera, Stats } from "@react-three/drei";
import Room from "./jsx-objects/Room";
import Boundary from "./jsx-objects/Boundary";

const Renderer = (props) => {
  const { jsonValue } = props;
  let jsonObject;
  try {
    jsonObject = JSON.parse(jsonValue); // A javascript object containing the properties of jsonValue
  } catch (e) {
    // JSON.Parse only works on valid JSON code.
    // This error is thrown whenever the JSON is not valid, e.g. while editing it in the textarea
    console.info("JSON is not currently valid ", e);
  }

  // The rooms in jsonObject.rooms are turned into a list of <Room> components.
  let RoomsListHOC = [];
  try {
    for (const [key, value] of Object.entries(jsonObject.rooms)) {
      RoomsListHOC.push(
        <Room
          key={key}
          width={value.width}
          height={value.height}
          anchorTopLeftX={value.anchorTopLeftX}
          anchorTopLeftY={value.anchorTopLeftY}
          text={value.type}
        />
      );
    }
  } catch (e) {
    // JSON.Parse only works on valid JSON code.
    // This error is thrown whenever the JSON is not valid, e.g. while editing it in the textarea
    console.info("JSON is not currently valid ", e);
  }

  return (
    <div>
      <React.Fragment>
        <Canvas
          style={{
            height: 1024,
            width: 1024,
            backgroundColor: "white",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.25} />
          <pointLight intensity={0.75} position={[500, 500, 1000]} />

          {/* Creates a 200x200 grid with 20 segments */}
          <gridHelper
            args={[
              jsonObject ? 2 * jsonObject.planBoundary.x : 200,
              jsonObject ? 2 * jsonObject.planBoundary.x : 20,
            ]}
          />

          {/* Drawing the floorplan boundary */}
          <Boundary
            width={jsonObject ? jsonObject.planBoundary.x : 0}
            height={jsonObject ? jsonObject.planBoundary.y : 0}
          />
          {/* Displaying the rooms */}
          {RoomsListHOC}

          {/* Our Camera. Feel free to experiment (or change out to a PerspectiveCamera 👀?) */}
          <OrthographicCamera
            makeDefault
            zoom={jsonObject ? jsonObject.planBoundary.x / 2 : 0}
            top={512}
            bottom={-512}
            left={512}
            right={-512}
            near={1}
            far={20000}
            position={[512, 512, 512]}
          />

          {/* Our Controls. Allows us to drag the view and pan around. Try holding down Shift when dragging. */}
          <OrbitControls />

          {/* FPS counter */}
          {/* <Stats /> */}
        </Canvas>
      </React.Fragment>
    </div>
  );
};

export default Renderer;
