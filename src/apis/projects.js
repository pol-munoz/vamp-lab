import {ipcMain, dialog, BrowserWindow} from "electron";
import {promises as fs} from 'fs';
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
            let path = res.filePath
            let parts = path.split('/')
            let name = parts[parts.length - 1].replace('.vamp', '')
            let project = new Project(name, path)
            let json = JSON.stringify(project, null, 2)
            fs.writeFile(path, json,  {
                encoding: 'utf8',
                mode: 0o600
            }).then(() => {
                // TODO add to recents and open
                console.log(path)
            })
        }
    })
}

function onOpen() {
    dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        filters: [VAMP_FILE_TYPE],
    }).then(res => {
        if (!res.canceled) {
            let path = res.filePaths[0]
            fs.readFile(path, 'utf8').then(text => {
                let data = JSON.parse(text)
                let project = Project.from(data)
                // TODO open
                console.log(project.name)
            })
        }
    })
}

function openProject() {

}

ipcMain.handle('projects:create', onCreate);
ipcMain.handle('projects:open', onOpen);