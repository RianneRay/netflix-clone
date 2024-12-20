import { env_Vars } from '../config/envVars.js';
import axios from 'axios'

export const fetchFromTMDB = async (url) => {
  const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + env_Vars.TMDB_API_KEY
  }
};

const response = await axios.get(url, options)

if(response.status !== 200) {
  throw new Error("error fetching data from TMDB" + response.statusText);
}

return response.data
}

