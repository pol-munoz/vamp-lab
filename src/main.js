import {app, BrowserWindow, ipcMain, nativeTheme, protocol} from 'electron'

import {BOUNDS_STORE_KEY, store} from './apis/store'

import {ProgId, Regedit, ShellOption} from 'electron-regedit'

new ProgId({
    description: 'Vamp Project File',
    icon: 'resources/windows/vamp.ico',
    extensions: ['vamp', 'vamplab'],
    shell: [
        new ShellOption({verb: ShellOption.OPEN}),
    ]
})

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit()
}

if (Regedit.squirrelStartupEvent()) {
    app.quit()
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        title: 'VampLab',
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        show: false,
        backgroundColor: '#382e30',
    })

    mainWindow.setBounds(store.get(BOUNDS_STORE_KEY))
    mainWindow.setMinimumSize(500, 350)

    mainWindow.on('close', () => {
        store.set(BOUNDS_STORE_KEY, mainWindow.getBounds())
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
        mainWindow.focus()
    })

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()
}

function ensureWindowExists() {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
}

protocol.registerSchemesAsPrivileged([{
    scheme: 'vamp',
    privileges: {
        standard: true,
        secure: true,
        bypassCSP: true,
        supportFetchAPI: true
    }
}])


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('ready', async () => {
    const protocolName = 'vamp'

    protocol.registerFileProtocol(protocolName, (request, callback) => {
        const url = request.url.replace(`${protocolName}://`, '')
        try {
            return callback(decodeURIComponent(url))
        } catch (error) {
            // Handle the error as needed
            console.error(error)
        }
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', ensureWindowExists)
app.on('open-file', ensureWindowExists)


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
})


// Other configuration, to avoid clutter in this file
import './apis/menu'
import './apis/projects'
import './apis/activeProject'
import './apis/activeSong'

