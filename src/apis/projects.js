import {app, ipcMain, dialog, BrowserWindow} from 'electron'
import {promises as fs} from 'fs'
import path from 'path'
import Project from '../model/Project'
import RecentProject from '../model/RecentProject'
import {RECENT_PROJECTS_STORE_KEY, store} from './store'

const VAMP_FILE_TYPE = {
    name: 'Vamp Project',
    extensions: ['vamp']
}

// Actually open the project, reused everywhere in the code
function openProject(project) {
    // Update native recent projects
    app.addRecentDocument(project.path)

    // Update "internal" recent projects
    let recentProject = new RecentProject(project.id, project.name, project.path)
    let recentProjects = RecentProject.fromArray(store.get(RECENT_PROJECTS_STORE_KEY))
    recentProjects = recentProjects.filter(e => e.path !== recentProject.path)
    recentProjects = [recentProject, ...recentProjects]
    store.set(RECENT_PROJECTS_STORE_KEY, recentProjects)

    return project
}

// Open the project from a file, reused sometimes in the code
async function openProjectFromFile(filePath) {
    let text = await fs.readFile(filePath, 'utf8')
    let data = JSON.parse(text)
    let project = Project.from(data)
    return openProject(project)
}

async function onCreate() {
    let res = await dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
        buttonLabel: 'Create',
        nameFieldLabel: 'Project Name:',
        filters: [VAMP_FILE_TYPE],
    })

    if (!res.canceled) {
        let filePath = res.filePath
        let name = path.basename(filePath, '.vamp')
        let project = new Project(name, filePath)
        let json = JSON.stringify(project, null, 2)
        await fs.writeFile(filePath, json,  {
            encoding: 'utf8',
            mode: 0o600
        })
        return openProject(project)
    }
    // Returns undefined on cancel
}

async function onOpen() {
    let res = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        filters: [VAMP_FILE_TYPE],
    })

    if (!res.canceled) {
        return openProjectFromFile(res.filePaths[0])
    }
    // Returns undefined on cancel
}

async function nativeOpen(event, filePath) {
    event.preventDefault()

    let project = await openProjectFromFile(filePath)
    BrowserWindow.getFocusedWindow().webContents.send('projects:nativeOpen', project)
    return project
}

async function onOpenRecent(_, recentProject) {
    return await openProjectFromFile(recentProject.path)
}

function onRemoveRecent(_, recentProject) {
    let recentProjects = RecentProject.fromArray(store.get(RECENT_PROJECTS_STORE_KEY))
    recentProjects = recentProjects.filter(e => e.path !== recentProject.path)
    store.set(RECENT_PROJECTS_STORE_KEY, recentProjects)
    return recentProjects
}

function getRecent() {
    return RecentProject.fromArray(store.get(RECENT_PROJECTS_STORE_KEY))
}

app.whenReady().then(() => {
    ipcMain.handle('projects:create', onCreate)
    ipcMain.handle('projects:open', onOpen)
    ipcMain.handle('projects:openRecent', onOpenRecent)
    ipcMain.handle('projects:removeRecent', onRemoveRecent)
    ipcMain.handle('projects:getRecent', getRecent)
})

app.on('open-file', nativeOpen)
