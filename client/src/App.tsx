import React, { useEffect, useState } from "react";
import Parade from "./components/Parade";
import { SPRITES } from "./components/Character";
import { createGlobalStyle } from "styled-components";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const GlobalStyle = createGlobalStyle`
  body{ font-family: 'VT323', monospace; }
`;

export interface IUser {
  id: string;
  screenSize: number;
  spriteId: number;
}

export interface IParadeUpdate {
  timestamp: number;
  clients: IUser[];
}

function App() {
  const roomId = "123";

  const socket = io(`http://localhost:3001`, {
    path: "/parade/",
    transports: ["websocket"],
  });

  const [userId, setUserId] = useState(uuidv4());
  const [parade, setParade] = useState<IParadeUpdate>({
    timestamp: 0,
    clients: [],
  });

  useEffect(() => {
    function onConnect() {
      const user: IUser = {
        id: userId,
        spriteId: Math.floor(Math.random() * SPRITES.length),
        screenSize: window.innerWidth,
      };
      socket.emit("userUpdate", user);
    }

    function onDisconnect() {
      socket.emit("userDisconnect", userId);
    }

    function onUpdate(paradeUpdate: IParadeUpdate) {
      setParade(paradeUpdate);
    }

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);
    socket.on("update", onUpdate);

    // disconnect on refresh
    window.addEventListener("beforeunload", onDisconnect);
    // update on window resize
    window.addEventListener("resize", onConnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("update", onUpdate);
      window.removeEventListener("beforeunload", onDisconnect);
      window.removeEventListener("resize", onConnect);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Parade update={parade} id={userId} />
    </>
  );
}

export default App;
