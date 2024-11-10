<template>
  <div class="eagle-browser">
    <!-- Show error if Eagle is not connected -->
    <div v-if="!eagleConnected" class="eagle-error">
      <h3>⚠️ Cannot connect to Eagle</h3>
      <p>{{ connectionError }}</p>
      <button @click="retryConnection">Retry Connection</button>
    </div>
    
    <!-- Rest of your component -->
    <div v-else>
      <div class="folders">
        <h3>Eagle Folders</h3>
        <ul>
          <li v-for="folder in folders" 
              :key="folder.id" 
              @click="selectFolder(folder.id)">
            {{ folder.name }}
          </li>
        </ul>
      </div>
      <div class="assets">
        <h3>Assets</h3>
        <div class="asset-grid">
          <div v-for="asset in assets" 
               :key="asset.id" 
               class="asset-item"
               @click="importAsset(asset)">
            <img :src="asset.thumbnail" :alt="asset.name">
            <span>{{ asset.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EagleService } from '../services/eagleService';
import { checkEagleConnection } from '../utils/eagleConnection';

export default {
  name: 'EagleAssetBrowser',
  data() {
    return {
      eagleService: new EagleService(),
      eagleConnected: false,
      connectionError: '',
      folders: [],
      assets: [],
      selectedFolderId: null
    }
  },
  async created() {
    await this.checkConnection();
  },
  methods: {
    async checkConnection() {
      const connection = await checkEagleConnection();
      this.eagleConnected = connection.isConnected;
      
      if (connection.isConnected) {
        // Load folders only if connected
        await this.loadFolders();
      } else {
        this.connectionError = connection.error;
      }
    },
    async retryConnection() {
      await this.checkConnection();
    },
    async loadFolders() {
      try {
        this.folders = await this.eagleService.getFolders();
      } catch (error) {
        console.error('Failed to load Eagle folders');
      }
    },
    async selectFolder(folderId) {
      this.selectedFolderId = folderId;
      try {
        this.assets = await this.eagleService.getImages(folderId);
      } catch (error) {
        console.error('Failed to load folder assets');
      }
    },
    importAsset(asset) {
      // Here we'll need to implement the Penpot extension API call
      // to import the selected asset into the current Penpot document
      window.parent.postMessage({
        type: 'penpot:import-image',
        payload: {
          url: asset.url,
          name: asset.name
        }
      }, '*');
    }
  }
}
</script>

<style scoped>
.eagle-browser {
  display: flex;
  height: 100%;
}

.folders {
  width: 200px;
  border-right: 1px solid #ccc;
  padding: 10px;
}

.assets {
  flex: 1;
  padding: 10px;
}

.asset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.asset-item {
  cursor: pointer;
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.asset-item img {
  width: 100%;
  height: auto;
}

.eagle-error {
  text-align: center;
  padding: 20px;
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin: 20px;
}

.eagle-error button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.eagle-error button:hover {
  background-color: #c82333;
}
</style> 