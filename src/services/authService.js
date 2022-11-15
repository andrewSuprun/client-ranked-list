import axios from 'axios';
import { API_URL } from '../config.js';
import { authClient } from '../http/authClient.js';

function register({ email, password }) {
  return authClient.post('/registration', { email, password })
}

function login({ email, password }) {
  return authClient.post('/login', { email, password })
}

async function logout(names) {
  await axios.put(API_URL,
    names
  )
  return authClient.post('/logout')
}

function activate(activationToken) {
  return authClient.get(`/activation/${activationToken}`);
}

function refresh() {
  return authClient.get('/refresh');
}

export const authService = { register, login, logout, activate, refresh };
