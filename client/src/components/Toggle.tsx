import { useState } from "react";
import styled from "styled-components";
import Spacer from "./Spacer";

interface IToggle {
  title: string;
  children: any;
}

const ToggleTitle = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: none;
`;

const Arrow = styled.p<{ isOpen: boolean }>`
  margin: 0;
  display: inline-block;
  transform: rotate(${(props) => (props.isOpen ? "90" : "0")}deg);
`;

const ToggleContainer = styled.div`
  ul,
  li {
    margin: 0;
  }
`;

function Toggle(props: IToggle) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ToggleContainer>
      <ToggleTitle onClick={toggleDropdown}>
        <Arrow isOpen={isOpen}>{">"}</Arrow>
        {"\t"}
        {props.title}
      </ToggleTitle>
      {isOpen && (
        <>
          <Spacer height={8} />
          {props.children}
        </>
      )}
      <Spacer height={8} />
    </ToggleContainer>
  );
}

export default Toggle;
