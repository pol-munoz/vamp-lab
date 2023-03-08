import {v4 as uuidv4} from 'uuid'

export default class Vamp {
    constructor(start, end) {
        this.id = uuidv4()
        this.start = start
        this.end = end
        this.loop = false
    }

    static from(data) {
        const vamp = new Vamp(data.start, data.end)
        vamp.id = data.id
        vamp.loop = data.loop
        return vamp
    }
}