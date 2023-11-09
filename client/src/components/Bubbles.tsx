import styled from "styled-components";

import Bubble from "../assets/bubble.png";
import HeartBubble from "../assets/heart-bubble.png";
import Spacer from "./Spacer";
import { useState } from "react";
import Modal from "./Modal";
import Toggle from "./Toggle";

interface IBubbles {
  index: number;
}

const ParadeLeft = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const ParadeNumberBubble = styled.button`
  height: 77px;
  width: 64px;
  postion: relative;
  background: url(${Bubble});
  background-size: contain;

  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: none;
`;

const ParadeHeartBubble = styled.button`
  height: 77px;
  width: 64px;
  background: url(${HeartBubble});
  background-size: contain;

  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: none;
`;

const ParadeNumber = styled.p`
  margin-top: 0px;
  font-size: 52px;
  text-align: center;
  color: black;
`;

// const ModalTitle = styled.h3`
//     font-weight: 400;
// `

function Bubbles(props: IBubbles) {
  const [isNumberModalOpen, setIsNumberModalOpen] = useState(false);
  const [isHeartModalOpen, setIsHeartModalOpen] = useState(false);

  return (
    <ParadeLeft>
      <ParadeNumberBubble onClick={() => setIsNumberModalOpen(true)}>
        <Spacer height={4} />
        <ParadeNumber>{props.index}</ParadeNumber>
      </ParadeNumberBubble>
      <Spacer height={8} />
      <ParadeHeartBubble onClick={() => setIsHeartModalOpen(true)} />
      <Modal
        isOpen={isNumberModalOpen}
        onClose={() => setIsNumberModalOpen(false)}
      >
        <p>welcome to the party!</p>
        <p>
          to invite your friends, share this link:{" "}
          <a href="https://localhost:3000/">https://localhost:3000/</a>
        </p>
        <p>
          to watch the parade, gather 'round and put your devices side-by-side
          according to the order in the top left corner.
        </p>
      </Modal>
      <Modal
        isOpen={isHeartModalOpen}
        onClose={() => setIsHeartModalOpen(false)}
      >
        <p>about parade party</p>
        <p>this site was made with react.js, socket.io</p>
        <Toggle title="art credits">
          <ul>
            <li>
              character sprites from{" "}
              <a href="https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator">
                LPC Spritesheet Character Generator
              </a>{" "}
              (detailed credits <a href="credits.csv">here</a>){" "}
            </li>
            <li>
              background art from{" "}
              <a href="https://ics_de.artstation.com/">@ics_de</a>
              <br />(
              <a href="https://cdnb.artstation.com/p/assets/images/images/051/401/221/original/oriol-colomer-city-scene-export.gif?1657198028">
                link to asset
              </a>
              )
            </li>
          </ul>
        </Toggle>
        <Toggle title="want to contribute?">
          <ul>
            <li>this is the github link</li>
          </ul>
        </Toggle>
      </Modal>
    </ParadeLeft>
  );
}

export default Bubbles;
