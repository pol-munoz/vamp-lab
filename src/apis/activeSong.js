import {app, BrowserWindow, dialog, ipcMain} from 'electron'
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
        const { getAudioDurationInSeconds } = __non_webpack_require__('get-audio-duration')
        const ffprobePath = __non_webpack_require__('@ffprobe-installer/ffprobe').path.replace(
            'app.asar',
            'app.asar.unpacked'
        )

        const filePath = res.filePaths[0]
        const name = path.basename(filePath, path.extname(filePath))
        const duration = await getAudioDurationInSeconds(filePath, ffprobePath)
        return new Track(name, filePath, duration)
    }
    // Returns undefined on cancel
}

app.whenReady().then(() => {
    ipcMain.handle('activeSong:promptOpenTrack', promptOpenTrack)
})
