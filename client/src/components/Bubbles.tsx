import styled from "styled-components";

import Bubble from "../assets/bubble.png";
import HeartBubble from "../assets/heart-bubble.png";
import Spacer from "./Spacer";

interface IBubbles {
  index: number;
}

const ParadeLeft = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const ParadeNumberBubble = styled.div`
  height: 77px;
  width: 64px;
  postion: relative;
  background: url(${Bubble});
  background-size: contain;
`;

const ParadeHeartBubble = styled.div`
  height: 77px;
  width: 64px;
  background: url(${HeartBubble});
  background-size: contain;
`;

const ParadeNumber = styled.p`
  margin-top: 0px;
  font-size: 52px;
  text-align: center;
  color: black;
`;

function Bubbles(props: IBubbles) {
  return (
    <ParadeLeft>
      <ParadeNumberBubble>
        <Spacer height={4} />
        <ParadeNumber>{props.index}</ParadeNumber>
      </ParadeNumberBubble>
      <Spacer height={8} />
      <ParadeHeartBubble />
    </ParadeLeft>
  );
}

export default Bubbles;
