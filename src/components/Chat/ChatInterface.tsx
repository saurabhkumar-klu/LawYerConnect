import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message, User } from '../../types';
import { useSocket } from '../../hooks/useSocket';
import { format } from 'date-fns';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: User;
  currentUser: User;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  isOpen,
  onClose,
  recipient,
  currentUser
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, isConnected } = useSocket();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Listen for new messages
    const handleNewMessage = (event: CustomEvent<Message>) => {
      const message = event.detail;
      if (message.senderId === recipient.id || message.receiverId === recipient.id) {
        setMessages(prev => [...prev, message]);
      }
    };

    window.addEventListener('newMessage', handleNewMessage as EventListener);
    return () => window.removeEventListener('newMessage', handleNewMessage as EventListener);
  }, [recipient.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isConnected) return;

    const message: Omit<Message, 'id' | 'timestamp'> = {
      senderId: currentUser.id,
      receiverId: recipient.id,
      content: newMessage.trim(),
      read: false,
      messageType: 'text'
    };

    sendMessage(message);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed bottom-4 right-4 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={recipient.avatar}
                alt={recipient.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {recipient.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{recipient.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {recipient.isOnline ? 'Online' : `Last seen ${recipient.lastSeen}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Phone className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Video className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <MoreVertical className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.senderId === currentUser.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === currentUser.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {format(new Date(message.timestamp), 'HH:mm')}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Paperclip className="h-4 w-4" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Smile className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          
          {!isConnected && (
            <p className="text-xs text-red-500 mt-2">Disconnected. Trying to reconnect...</p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatInterface;