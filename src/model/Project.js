import { v4 as uuidv4 } from 'uuid';

export default class Project {
    constructor(name, path) {
        this.id = uuidv4()
        this.name = name
        this.path = path
        // songId -> Song
        this.songs = {}
    }

    static from(data){
        return Object.assign(new Project(), data)
    }
}