import {app, BrowserWindow, dialog, ipcMain} from 'electron'
import {promises as fs} from 'fs'
import path from 'path'
import Track from '../model/Track'

async function promptOpenTrack() {
    const res = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        buttonLabel: 'Add',
        filters: [
            {
                name: 'Music',
                extensions: ['mp3']
            }
        ],
    })

    if (!res.canceled) {
        const filePath = res.filePaths[0]
        const name = path.basename(filePath, path.extname(filePath))
        return new Track(name, filePath)
    }
    // Returns undefined on cancel
}

app.whenReady().then(() => {
    ipcMain.handle('activeSong:promptOpenTrack', promptOpenTrack)
})
