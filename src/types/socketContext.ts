
import { ReactNode } from 'react';
import { Socket } from 'socket.io-client';

export interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Record<string, string[]>;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, content: string) => void;
  markRead: (messageId: string, roomId: string) => void;
}

export interface SocketProviderProps {
  children: ReactNode;
}
