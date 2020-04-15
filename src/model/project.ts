import { ProjectStatus } from "./projectStatus";

export class Project {
    constructor(public id: string, public title: string,
        public description: string, public numOfPeople: number, public status: ProjectStatus ) {}
}