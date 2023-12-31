import styled from "styled-components";

import Bubble from "../assets/bubble.png";
import HeartBubble from "../assets/heart-bubble.png";
import Spacer from "./Spacer";
import { useState } from "react";
import Modal from "./Modal";
import Toggle from "./Toggle";

interface IBubbles {
  index: number;
  showWelcome: boolean;
  setShowWelcome: (boolean) => void;
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

function Bubbles(props: IBubbles) {
  const [isHeartModalOpen, setIsHeartModalOpen] = useState(false);
  const [isNumberModalOpen, setIsNumberModalOpen] = useState(props.showWelcome);

  const shareUrl = window.location.href;

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
        onClose={() => {
          setIsNumberModalOpen(false)
          props.setShowWelcome(false);
        }}
      >
        <p>welcome to the party :^)</p>
        <p>
          we're so glad you could make it! you are number #{props.index} in the
          parade.
        </p>
        <p>
          to watch with other paraders, gather 'round and align your devices
          side-by-side according to your number.
        </p>
        <p>
          recruit more friends using: <a href={shareUrl}>{shareUrl}</a>
        </p>
        <p>
          you can revisit this guide anytime from the top-left bubble. happy
          marching!
        </p>
      </Modal>
      <Modal
        isOpen={isHeartModalOpen}
        onClose={() => setIsHeartModalOpen(false)}
      >
        <p>about this project</p>
        <p>
          parade party is a silly hackathon concept inspired by my friend kailey.
        </p>
        <p>
          this site was built with react.js, node.js & socket.io; see it on <a href="https://github.com/gracewgao/parade-party">github</a>.
        </p>
        <p>
          enjoy the parade!<br/>
          - <a href="https://gracewgao.me/">grace</a>{" "}
        </p>
        <Toggle title="see art credits">
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
      </Modal>
    </ParadeLeft>
  );
}

export default Bubbles;
