import { useEffect, useRef, useState } from 'react';
import { useAuth } from './useAuth';
import { Message, Notification as CustomNotification } from '../types';

interface UseSocketReturn {
  socket: any | null;
  isConnected: boolean;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  onlineUsers: string[];
}

export const useSocket = (): UseSocketReturn => {
  const { user } = useAuth();
  const socketRef = useRef<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      // Mock socket connection for demo purposes
      const mockSocket = {
        on: (event: string, callback: Function) => {
          // Mock event listeners
        },
        emit: (event: string, data: any) => {
          // Mock emit
        },
        disconnect: () => {
          // Mock disconnect
        }
      };

      socketRef.current = mockSocket;
      setIsConnected(true);

      // Simulate connection
      console.log('Mock socket connected');

      return () => {
        setIsConnected(false);
        socketRef.current = null;
      };
    }
  }, [user]);

  const sendMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (socketRef.current && isConnected) {
      // Mock message sending
      const fullMessage: Message = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      
      // Dispatch custom event for message handling
      window.dispatchEvent(new CustomEvent('newMessage', { detail: fullMessage }));
    }
  };

  const joinRoom = (roomId: string) => {
    if (socketRef.current && isConnected) {
      console.log('Joined room:', roomId);
    }
  };

  const leaveRoom = (roomId: string) => {
    if (socketRef.current && isConnected) {
      console.log('Left room:', roomId);
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    joinRoom,
    leaveRoom,
    onlineUsers
  };
};