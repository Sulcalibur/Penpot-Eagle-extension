import axios from 'axios';

const EAGLE_API_PORT = 41595;
const EAGLE_API_URL = `http://localhost:${EAGLE_API_PORT}/api/application/info`;

export async function checkEagleConnection() {
  try {
    const response = await axios.get(EAGLE_API_URL, { timeout: 2000 }); // 2 second timeout
    return {
      isConnected: true,
      version: response.data.version
    };
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return {
        isConnected: false,
        error: 'Eagle app is not running or API is not accessible'
      };
    }
    return {
      isConnected: false,
      error: error.message
    };
  }
} 