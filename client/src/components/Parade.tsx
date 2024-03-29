import React, { useEffect, useState } from "react";

import SceneGif from "../assets/scene.gif";
import styled, { keyframes } from "styled-components";
import Character, { PARADER_WIDTH } from "./Character";
import Spacer from "./Spacer";
import Bubbles from "./Bubbles";
import Modal from "./Modal";

interface IParade {
  update: IParadeUpdate;
  id: string;
  showWelcome: boolean;
  setShowWelcome: (boolean) => void;
  isSocketLoading: boolean;
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(props.isSocketLoading);
  }, [props.isSocketLoading]);

  let sceneWidth = 0;
  let curWidth = window.innerWidth;
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
    height: 100%;
    width: ${curWidth}px;
    position: fixed;
    overflow: hidden;
  `;

  const ParadeAnimation = styled.div`
    animation: ${animation} ${sceneWidth / 100}s linear infinite;
    bottom: 0px;
    position: absolute;
  `;

  return (
    <ParadeScene>
      {isLoading ?
        <Modal isOpen>
          <p>joining the parade...</p>
        </Modal> :
        <>
          <Bubbles
            index={index}
            showWelcome={props.showWelcome}
            setShowWelcome={props.setShowWelcome}
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
        </>
      }
    </ParadeScene>
  );
}

export default Parade;
