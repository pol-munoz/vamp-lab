import {app, BrowserWindow, dialog, ipcMain} from 'electron'
import {promises as fs} from 'fs'
import {SKIP_CONFIRM_DELETE_SONG_STORE_KEY, store} from './store'

const prompt = __non_webpack_require__('custom-electron-prompt')

async function saveActiveProject(_, project) {
    const json = JSON.stringify(project, null, 2)

    void fs.writeFile(project.path, json,  {
        encoding: 'utf8',
        mode: 0o600
    })
}
async function promptSongName() {
    return await prompt({
        title: "Enter the song's name",
        label: "Enter the song's name:",
        customStylesheet: 'resources/prompt.css',
    }, BrowserWindow.getFocusedWindow())
}
async function promptSongRename(_, name) {
    return await prompt({
        title: "Enter the song's new name",
        label: "Enter the song's new name:",
        customStylesheet: 'resources/prompt.css',
        value: name
    }, BrowserWindow.getFocusedWindow())
}
async function promptConfirmDeleteSong(_, song) {
    if (store.get(SKIP_CONFIRM_DELETE_SONG_STORE_KEY)) {
        return true
    }
    const result = await dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
        type: 'question',
        title: 'Delete the song?',
        message: `Delete ${song}?`,
        detail: "This can't be undone",
        checkboxLabel: "Don't ask me again",
        buttons: [
            'Yes',
            'No'
        ]
    })

    if (result.checkboxChecked) {
        store.set(SKIP_CONFIRM_DELETE_SONG_STORE_KEY, true)
    }
    return result.response === 0
}
app.whenReady().then(() => {
    ipcMain.on('activeProject:save', saveActiveProject)
    ipcMain.handle('activeProject:promptSongName', promptSongName)
    ipcMain.handle('activeProject:promptSongRename', promptSongRename)
    ipcMain.handle('activeProject:promptConfirmDeleteSong', promptConfirmDeleteSong)
})