import {app, ipcMain, dialog, BrowserWindow} from 'electron'
import {promises as fs} from 'fs'
import path from 'path'

import Project from '../model/Project'
import {store} from './store'
import RecentProject from '../model/RecentProject'
import {RECENT_PROJECTS_STORE_KEY} from './keys'

const VAMP_FILE_TYPE = {
    name: 'Vamp Project',
    extensions: ['vamp']
}

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
            openProjectFromFile(res.filePaths[0])
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
    // Update native recent projects
    app.addRecentDocument(project.path)

    // Update "internal" recent projects
    let newRecentProject = new RecentProject(project.name, project.path)
    let recentProjects = RecentProject.fromArray(store.get(RECENT_PROJECTS_STORE_KEY))

    recentProjects.filter((a, b) => (a.path === b.path))

    recentProjects = [newRecentProject, ...recentProjects]
    store.set(RECENT_PROJECTS_STORE_KEY, recentProjects)
}

ipcMain.handle('projects:create', onCreate)
ipcMain.handle('projects:open', onOpen)

app.on('open-file', nativeOpen)