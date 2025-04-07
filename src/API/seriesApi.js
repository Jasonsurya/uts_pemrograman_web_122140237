import axios from 'axios';

const SERIES_URL = 'https://67f370efec56ec1a36d5ce06.mockapi.io/series';

export const getSeries = async () => {
  const res = await axios.get(SERIES_URL);
  return res.data;
};
