import React from 'react';

import SpritePage from '../images/kailey.png'
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  100% { 
    background-position: -576px -704px;
  }
`;
export const CharacterSprite = styled.div`
  height: 64px;
  width: 64px;
  transform: scale(3) translate(0%, -30%);
  background: url(${SpritePage}) left -704px;
  animation: ${animation} .5s steps(9) infinite; 
`;

function Character() {
  return (
    <CharacterSprite />
  );
}

export default Character;
