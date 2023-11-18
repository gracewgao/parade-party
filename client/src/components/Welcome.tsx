
import SceneGif from "../assets/scene.gif";
import styled from "styled-components";
import Modal from "./Modal";

const ParadeScene = styled.div`
  background: linear-gradient(rgba(229, 250, 252, 0), rgba(237, 227, 213, 0.6)),
    url(${SceneGif}) left bottom;
  height: 100vh;
  width: 100%;
  position: fixed;
  overflow: hidden;
`;

function Parade() {
  const createUrl = "parade/new";

  return (
    <ParadeScene>
      <Modal isOpen>
        <p>hey there!</p>
        <p>
          you've found parade party -- a virtual space to march in a
          never-ending parade.
        </p>
        <p>
          <a href={createUrl}>start a party</a>
        </p>
      </Modal>
    </ParadeScene>
  );
}

export default Parade;
