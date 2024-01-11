
import SceneGif from "../assets/scene.gif";
import styled from "styled-components";
import Modal from "./Modal";

const ParadeScene = styled.div`
  background: linear-gradient(rgba(229, 250, 252, 0), rgba(237, 227, 213, 0.6)),
    url(${SceneGif}) left bottom;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: hidden;
`;

function NotFound() {
  return (
    <ParadeScene>
      <Modal isOpen>
        <p>whoops!</p>
        <p>
          there's no parade here. it might help to double-check you have the right link.
        </p>
        <p>
          <a href={process.env.PUBLIC_URL}>march back home</a>
        </p>
      </Modal>
    </ParadeScene>
  );
}

export default NotFound;
