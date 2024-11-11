import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const socketUrl = 'http://localhost:8080/ws/notifications'; // Replace with your backend WebSocket endpoint

export const createWebSocketClient = () => {
  const client = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = (frame) => {
    console.log('Connected to WebSocket server:', frame);

    // Subscribe to a topic
    client.subscribe('/topic/return-to', (message) => {
      const notification = JSON.parse(message.body);
      console.log('Received notification:', notification);
      // Handle the notification (e.g., update state, show a toast notification)
    });
  };

  client.onStompError = (frame) => {
    console.error('STOMP error:', frame);
  };

  return client;
};
