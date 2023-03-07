import {v4 as uuidv4} from 'uuid'

export default class Vamp {
    constructor(start, end) {
        this.id = uuidv4()
        this.start = start
        this.end = end
        this.loops = false
    }
}