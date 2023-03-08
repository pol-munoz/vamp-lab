import { v4 as uuidv4 } from 'uuid'

export default class Song {
    constructor(name) {
        this.id = uuidv4()
        this.name = name
        // trackId -> Track
        this.tracks = {}
        // vampId -> Vamp
        this.vamps = {}
    }
}