import {ipcMain, dialog, BrowserWindow} from "electron";

const VAMP_FILE_TYPE = {
    name: 'Vamp Project',
    extensions: ['vamp']
};

function onCreate() {
    dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
        buttonLabel: 'Create',
        nameFieldLabel: 'Project Name:',
        filters: [VAMP_FILE_TYPE],
    }).then(res => {
        if (!res.canceled) {
            console.log(res.filePath)
            // TODO init file
        }
    })
}

function onOpen() {
    dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        filters: [VAMP_FILE_TYPE],
    }).then(res => {
        if (!res.canceled) {
            console.log(res.filePaths[0])
        }
    })
}

function openProject() {

}

ipcMain.handle('projects:create', onCreate);
ipcMain.handle('projects:open', onOpen);