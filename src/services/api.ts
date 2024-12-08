import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = {
  getFiles: () => axios.get(`${API_URL}/files`),
  createFile: (data: { name: string; content: string; language: string }) =>
    axios.post(`${API_URL}/files`, data),
  updateFile: (id: string, data: { content?: string; language?: string }) =>
    axios.patch(`${API_URL}/files/${id}`, data),
  deleteFile: (id: string) => 
    axios.delete(`${API_URL}/files/${id}`),
  runCode: (id: string) =>
    axios.post(`${API_URL}/files/${id}/run`),
};