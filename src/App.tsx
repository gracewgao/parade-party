import React from "react";
import logo from "./logo.svg";
import Parade from "./components/Parade";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{ font-family: 'VT323', monospace; }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Parade />
    </>
  );
}

export default App;
