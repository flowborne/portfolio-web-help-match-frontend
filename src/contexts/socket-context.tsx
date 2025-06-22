import  { createContext, FC, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthContext } from './auth-context';
import { SocketContextProps, SocketProviderProps } from '~types/socketContext';

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isConnected: false,
  onlineUsers: {},
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
  markRead: () => {},
});

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const { access_token } = useAuthContext();
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, string[]>>({});
  const socketRef = useRef<Socket | null>(null);
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string;

  useEffect(() => {
    if (!access_token) return;

    const socket = io(SOCKET_URL, {
      auth: { token: `Bearer ${access_token}` },
      autoConnect: false,
    });
    socketRef.current = socket;

    socket.connect();
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('online_users', ({ roomId, users }: { roomId: string; users: string[] }) => {
      setOnlineUsers(prev => ({ ...prev, [roomId]: users }));
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('online_users');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [access_token]);

  const joinRoom = (roomId: string) => {
    socketRef.current?.emit('join_room', roomId);
  };

  const leaveRoom = (roomId: string) => {
    socketRef.current?.emit('leave_room', roomId);
  };

  const sendMessage = (roomId: string, content: string) => {
    socketRef.current?.emit('send_message', { roomId, content });
  };

  const markRead = (messageId: string, roomId: string) => {
    socketRef.current?.emit('message_read', { messageId, roomId });
  };

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, isConnected, onlineUsers, joinRoom, leaveRoom, sendMessage, markRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocketContext must be used within SocketProvider');
  return context;
};
