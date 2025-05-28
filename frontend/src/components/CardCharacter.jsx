// src/API/characterApi.js
import axios from 'axios';

const API_BASE_URL = 'https://67f370efec56ec1a36d5ce06.mockapi.io/Character';

export const getCharacters = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};
