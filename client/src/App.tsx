import { createGlobalStyle } from "styled-components";
import SocketWrapper from "./SocketWrapper";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";

const GlobalStyle = createGlobalStyle`
  body{ font-family: 'VT323', monospace; }
`;

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/parade/:pId" element={<SocketWrapper />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
