import {app, ipcMain, dialog, BrowserWindow} from 'electron'
const prompt = __non_webpack_require__('custom-electron-prompt')

import {promises as fs} from 'fs'


async function saveActiveProject(project) {
    void fs.writeFile(project.path, project,  {
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
app.whenReady().then(() => {
    ipcMain.on('activeProject:save', saveActiveProject)
    ipcMain.handle('activeProject:promptSongName', promptSongName)
})