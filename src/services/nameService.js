import { httpClient } from '../http/httpClient.js';

function getAll() {
  return httpClient.get('/api')
}


export const nameService = { getAll };
