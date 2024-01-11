import { createGlobalStyle } from "styled-components";
import SocketWrapper from "./SocketWrapper";
import { Route, Routes, HashRouter } from "react-router-dom";
import Welcome from "./components/Welcome";
import NotFound from "./components/NotFound";

const GlobalStyle = createGlobalStyle`
  body{ font-family: 'VT323', monospace; }
`;

function App() {
  return (
    <>
      <HashRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/parade/:pId" element={<SocketWrapper />} />
          <Route path="/" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
