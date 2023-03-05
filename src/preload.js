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
    nativeOpenSubscribe: callback => ipcRenderer.on('projects:nativeOpen', callback),
    nativeOpenUnSubscribe: () => ipcRenderer.removeAllListeners('projects:nativeOpen'),
    openRecent: recentProject => ipcRenderer.invoke('projects:openRecent', recentProject),
    removeRecent: recentProject => ipcRenderer.invoke('projects:removeRecent', recentProject),
    getRecent: () => ipcRenderer.invoke('projects:getRecent'),
})

contextBridge.exposeInMainWorld('activeProject', {
    save: project => ipcRenderer.send('activeProject:save', project),
    promptSongName: () => ipcRenderer.invoke('activeProject:promptSongName'),
    promptSongRename: name => ipcRenderer.invoke('activeProject:promptSongRename', name),
    promptConfirmDeleteSong: name => ipcRenderer.invoke('activeProject:promptConfirmDeleteSong', name),
})