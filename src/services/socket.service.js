import { io } from 'socket.io-client';

const { VITE_API_URL: apiUrl } = import.meta.env;
const url = apiUrl || 'http://localhost:3000';
const socket = io(url, { transports: ['websocket'] });

export default socket;
