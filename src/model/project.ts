import { ProjectStatus } from "./projectStatus.js";

export class Project {
    constructor(public id: string, public title: string,
        public description: string, public numOfPeople: number, public status: ProjectStatus ) {}
}