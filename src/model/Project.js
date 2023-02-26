export default class Project {
    constructor(name, path) {
        this.name = name;
        this.path = path;
        // Songs[]
        this.songs = [];
    }

    static from(data){
        return Object.assign(new Project(), data);
    }
}