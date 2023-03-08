export default class RecentProject {
    constructor(id, name, path) {
        this.id = id
        this.name = name;
        this.path = path;
        this.lastOpened = new Date().getTime()
    }

    static from(data) {
        return Object.assign(new RecentProject(), data)
    }

    static fromArray(array) {
        if (!array) {
            return []
        }
        return array.map(RecentProject.from)
    }
}