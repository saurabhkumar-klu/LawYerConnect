import { useState, useEffect } from 'react';
import { Notification as CustomNotification } from '../types';
import toast from 'react-hot-toast';

interface UseNotificationsReturn {
  notifications: CustomNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  requestPermission: () => Promise<boolean>;
  showNotification: (title: string, body: string, options?: NotificationOptions) => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<CustomNotification[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check current permission status
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Listen for new notifications from socket
    const handleNewNotification = (event: CustomEvent<CustomNotification>) => {
      const notification = event.detail;
      setNotifications(prev => [notification, ...prev]);
      
      // Show toast notification
      toast(notification.message, {
        icon: getNotificationIcon(notification.type),
        duration: 4000,
      });

      // Show browser notification if permission granted
      if (permission === 'granted') {
        showBrowserNotification(notification.title, notification.message);
      }
    };

    window.addEventListener('newNotification', handleNewNotification as EventListener);

    return () => {
      window.removeEventListener('newNotification', handleNewNotification as EventListener);
    };
  }, [permission]);

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  };

  const showBrowserNotification = (title: string, body: string, options?: NotificationOptions) => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        ...options
      });
    }
  };

  const showNotification = (title: string, body: string, options?: NotificationOptions) => {
    showBrowserNotification(title, body, options);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    requestPermission,
    showNotification
  };
};

const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'consultation':
      return '📅';
    case 'message':
      return '💬';
    case 'payment':
      return '💳';
    case 'review':
      return '⭐';
    default:
      return '🔔';
  }
};