import { definePlugin } from '@penpot/plugin-types'
import { createApp } from 'vue'
import App from './App.vue'

export default definePlugin({
  name: "eagle-assets",
  register: (api) => {
    console.log("Eagle plugin registered!");
    
    api.registerCommand({
      id: "eagle-assets",
      name: "Eagle Assets",
      shortcut: ["Ctrl+Shift+E"],
      showInContextMenu: true,
      run: () => {
        const panel = api.createPanel({
          name: "Eagle Assets",
          component: () => {
            const container = document.createElement('div')
            createApp(App).mount(container)
            return container
          }
        })
        panel.show()
      }
    })
  }
}) 