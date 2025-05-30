import { useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (serverPath: any) => {
  const socket = useMemo(() => io(serverPath), [serverPath]);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};
