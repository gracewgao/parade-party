import React, { useState } from "react";

import SceneGif from "../assets/scene.gif";
import styled, { keyframes } from "styled-components";
import Character, { PARADER_WIDTH } from "./Character";
import Spacer from "./Spacer";
import Bubbles from "./Bubbles";

interface IParade {
  update: IParadeUpdate;
  id: string;
}

interface IUser {
  id: string;
  screenSize: number;
  spriteId: number;
}

interface IParadeUpdate {
  timestamp: number;
  clients: IUser[];
}

const ParadeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-align: center;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

function Parade(props: IParade) {
  const { id, update } = props;
  const numParaders = update.clients.length;
  const paradeWidth = PARADER_WIDTH * numParaders;

  let sceneWidth = 0;
  let curWidth = 0;
  let sceneLeft = 0;

  let index = 0;
  update.clients.forEach((client, i) => {
    if (client.id === id) {
      index = i + 1;
      sceneLeft = sceneWidth;
      curWidth = client.screenSize;
    }
    sceneWidth += client.screenSize;
  });

  const animation = keyframes`
  0% {
    -webkit-transform: translateX(-${sceneLeft + paradeWidth}px);
  }
  100% {
    -webkit-transform: translateX(${sceneWidth - sceneLeft - paradeWidth}px);
  }
  `;

  const ParadeScene = styled.div`
    background: linear-gradient(
        rgba(229, 250, 252, 0),
        rgba(237, 227, 213, 0.6)
      ),
      url(${SceneGif}) left -${sceneLeft}px bottom;
    height: 100vh;
    width: ${curWidth}px;
    position: fixed;
    overflow: hidden;
  `;

  const ParadeAnimation = styled.div`
    animation: ${animation} ${sceneWidth / 100}s linear infinite;
    bottom: 0px;
    position: absolute;
  `;

  const [isNumberModalOpen, setIsNumberModalOpen] = useState(true);

  return (
    <ParadeScene>
      <Bubbles
        index={index}
        isNumberModalOpen={isNumberModalOpen}
        setIsNumberModalOpen={setIsNumberModalOpen}
      />
      <ParadeAnimation>
        <ParadeContainer>
          {update.clients.map((c: IUser) => (
            <Character spriteId={c.spriteId} />
          ))}
          <Spacer width={sceneWidth - paradeWidth} />
          {update.clients.map((c: IUser) => (
            <Character spriteId={c.spriteId} />
          ))}
        </ParadeContainer>
      </ParadeAnimation>
    </ParadeScene>
  );
}

export default Parade;
