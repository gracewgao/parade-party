import { useEffect, useState } from "react";
import Parade from "./components/Parade";
import { SPRITES } from "./components/Character";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";

export interface IUser {
  id: string;
  screenSize: number;
  spriteId: number;
}

export interface IParadeUpdate {
  timestamp: number;
  clients: IUser[];
}

function SocketWrapper() {
  const { pId } = useParams();
  const navigate = useNavigate();

  const socket = io(process.env.REACT_APP_SERVER_URL, {
    transports: ["websocket"],
    path: "/parade/",
    forceNew: true,
    reconnectionAttempts: 3,
    timeout: 2000,
  });

  const [showWelcome, setShowWelcome] = useState(true);
  const [isSocketLoading, setIsSocketLoading] = useState(true);
  const [paradeId, setParadeId] = useState(pId);
  const [userId, setUserId] = useState(uuidv4());
  const [parade, setParade] = useState<IParadeUpdate>({
    timestamp: 0,
    clients: [],
  });

  useEffect(() => {
    function onConnect() {
      setIsSocketLoading(true);
      if (paradeId == "new") {
        console.log("creating new parade...");
        socket.emit("newParade");
      } else {
        console.debug(`joining parade ${paradeId}...`);
        socket.emit("join", paradeId);
        userUpdate();
      }
    }

    function userUpdate() {
      const user: IUser = {
        id: userId,
        spriteId: Math.floor(Math.random() * SPRITES.length),
        screenSize: window.innerWidth,
      };
      socket.emit("userUpdate", paradeId, user);
      console.debug(`sending update for parade ${paradeId}...`);
    }

    function onParadeCreate(id: string) {
      navigate(`/parade/${id}`);
      window.location.reload();
    }

    function onDisconnect() {
      socket.emit("userDisconnect", paradeId, userId);
    }

    function onUpdate(paradeUpdate: IParadeUpdate) {
      setIsSocketLoading(false);
      setParade(paradeUpdate);
    }

    function onInvalid() {
      setIsSocketLoading(false);
      navigate(`/404`);
      window.location.reload();
    }

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);
    socket.on("update", onUpdate);
    socket.on("paradeCreate", onParadeCreate);
    socket.on("invalidId", onInvalid);

    // disconnect on refresh
    window.addEventListener("beforeunload", onDisconnect);
    // update on window resize
    window.addEventListener("resize", userUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("update", onUpdate);
      socket.off("paradeCreate", onParadeCreate);
      window.removeEventListener("beforeunload", onDisconnect);
      window.removeEventListener("resize", userUpdate);
    };
  }, []);

  return <Parade
    update={parade}
    id={userId}
    showWelcome={showWelcome}
    setShowWelcome={setShowWelcome}
    isSocketLoading={isSocketLoading} />;
}

export default SocketWrapper;
