import {app, ipcMain, dialog, BrowserWindow} from "electron";
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
                openProject(project)
            })
        }
    })
}

function onOpen() {
    dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        filters: [VAMP_FILE_TYPE],
    }).then(res => {
        if (!res.canceled) {
            openProjectFromFile(res.filePaths[0]);
        }
    })
}
function nativeOpen(event, filePath) {
    event.preventDefault()

    openProjectFromFile(filePath)
}

function openProjectFromFile(filePath) {
    fs.readFile(filePath, 'utf8').then(text => {
        let data = JSON.parse(text)
        let project = Project.from(data)
        openProject(project)
    })
}

function openProject(project) {
    // TODO figure out what open means
    app.addRecentDocument(project.path)
    console.log(project.name)
}

ipcMain.handle('projects:create', onCreate);
ipcMain.handle('projects:open', onOpen);

app.on('open-file', nativeOpen)