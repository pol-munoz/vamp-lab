// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system'),
})

contextBridge.exposeInMainWorld('projects', {
    create: () => ipcRenderer.invoke('projects:create'),
    open: () => ipcRenderer.invoke('projects:open'),
    openRecent: recentProject => ipcRenderer.invoke('projects:openRecent', recentProject),
    deleteRecent: recentProject => ipcRenderer.invoke('projects:deleteRecent', recentProject),
    getRecent: () => ipcRenderer.invoke('projects:getRecent'),
})
