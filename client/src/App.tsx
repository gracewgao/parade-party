import { createGlobalStyle } from "styled-components";
import SocketWrapper from "./SocketWrapper";
import { Route, Routes, HashRouter } from "react-router-dom";
import Welcome from "./components/Welcome";

const GlobalStyle = createGlobalStyle`
  body{ font-family: 'VT323', monospace; }
`;

function App() {
  return (
    <>
      {/* <HashRouter basename={process.env.PUBLIC_URL}> */}
      <HashRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/parade/:pId" element={<SocketWrapper />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
