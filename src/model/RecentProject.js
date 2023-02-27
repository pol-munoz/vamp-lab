export default class RecentProject {
    constructor(name, path) {
        this.name = name;
        this.path = path;
        this.lastOpened = new Date().getTime()
    }

    static from(data) {
        return Object.assign(new RecentProject(), data);
    }

    static fromArray(array) {
        console.log(array)
        if (!array) {
            return []
        }
        return array.map(RecentProject.from);
    }
}