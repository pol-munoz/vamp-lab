import {ipcMain, dialog, BrowserWindow} from "electron";
import {promises as fs} from 'fs';
const path = require('path');
import Project from "../model/Project";

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
            let filePath = res.filePath
            let name = path.basename(filePath, '.vamp')
            let project = new Project(name, filePath)
            let json = JSON.stringify(project, null, 2)
            fs.writeFile(filePath, json,  {
                encoding: 'utf8',
                mode: 0o600
            }).then(() => {
                // TODO add to recents and open
                console.log(filePath)
            })
        }
    })
}

function onOpen() {
    dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        filters: [VAMP_FILE_TYPE],
    }).then(res => {
        if (!res.canceled) {
            let filePath = res.filePaths[0]
            fs.readFile(filePath, 'utf8').then(text => {
                let data = JSON.parse(text)
                let project = Project.from(data)
                // TODO open
                console.log(project.name)
            })
        }
    })
}

// TODO
function openProject() {

}

ipcMain.handle('projects:create', onCreate);
ipcMain.handle('projects:open', onOpen);