import axios from 'axios';

const EAGLE_API_PORT = 41595; // Default Eagle local API port

export class EagleService {
  constructor() {
    this.baseURL = `http://localhost:${EAGLE_API_PORT}/api/`;
  }

  async getFolders() {
    try {
      const response = await axios.get(`${this.baseURL}folder/list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Eagle folders:', error);
      throw error;
    }
  }

  async getImages(folderId) {
    try {
      const response = await axios.get(`${this.baseURL}item/list`, {
        params: { folderId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Eagle images:', error);
      throw error;
    }
  }
} 