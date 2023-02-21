import React from "react";

import SceneGif from "../images/scene.gif";
import styled, { keyframes } from "styled-components";
import Character from "./Character";

interface ICharacter {
  screenId: number;
  characterId: number;
  screenPosition: number;
  isUser: boolean;
}

const characters: ICharacter[] = [
  { screenId: 1, characterId: 1, screenPosition: 0, isUser: true },
  { screenId: 1, characterId: 1, screenPosition: 0, isUser: false },
  { screenId: 1, characterId: 1, screenPosition: 0, isUser: false },
];
const position = 0;

const animation = keyframes`
0% {
    -webkit-transform: translateX(-50%);
}
100% {
    -webkit-transform: translateX(50%);
}
`;

const ParadeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-align: center;
  animation: ${animation} 10s linear infinite;
  bottom: 0px;
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ParadeScene = styled.div`
  background: linear-gradient(rgba(229, 250, 252, 0), rgba(237, 227, 213, 0.6)),
    url(${SceneGif}) left bottom;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: absolute;
`;

const ParadeNumber = styled.p`
  font-size: 96px;
  text-align: center;
  color: black;
  -webkit-text-stroke: 4px;
`;

function Parade() {
  return (
    <ParadeScene>
      <ParadeNumber>2</ParadeNumber>
      <ParadeContainer>
        {characters.map((c: ICharacter) => (
          <Character />
        ))}
      </ParadeContainer>
    </ParadeScene>
  );
}

export default Parade;
