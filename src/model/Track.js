import {v4 as uuidv4} from 'uuid'

export default class Track {
    constructor(name, path, duration) {
        this.id = uuidv4()
        this.name = name
        this.path = path
        this.duration = duration
        this.volume = 0.5
        this.device = 'default'
    }
}