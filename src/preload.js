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
})

contextBridge.exposeInMainWorld('electron', {
    store: {
        get(key) {
            return ipcRenderer.sendSync('electron-store-get', key)
        },
        set(property, val) {
            ipcRenderer.send('electron-store-set', property, val)
        },
        // Other method you want to add like has(), reset(), etc.
    },
    // Any other methods you want to expose in the window object.
    // ...
})