import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(roomId: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');
    const socket = socketRef.current;

    socket.emit('join-room', roomId);

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  return socketRef.current;
}