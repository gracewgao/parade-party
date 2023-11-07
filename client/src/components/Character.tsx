import React from "react";

import KaileySprite from "../assets/kailey.png";
import HarrisonSprite from "../assets/harrison.png";
import RichardSprite from "../assets/richard.png";
import SophieSprite from "../assets/sophie.png";
import GraceSprite from "../assets/grace.png";
import styled, { keyframes } from "styled-components";

export interface ICharacter {
  spriteId: number;
}

export const SPRITES = [
  KaileySprite,
  HarrisonSprite,
  RichardSprite,
  SophieSprite,
  GraceSprite,
];
export const PARADER_WIDTH = 64;

const animation = keyframes`
  100% { 
    background-position: -576px -704px;
  }
`;

export const CharacterSprite = styled.div<ICharacter>`
  height: ${PARADER_WIDTH}px;
  width: ${PARADER_WIDTH}px;
  transform: scale(3) translate(0%, -30%);
  background: url(${(props) => SPRITES[props.spriteId]}) left -704px;
  animation: ${animation} 0.5s steps(9) infinite;
`;

function Character(props: ICharacter) {
  return <CharacterSprite {...props} />;
}

export default Character;
