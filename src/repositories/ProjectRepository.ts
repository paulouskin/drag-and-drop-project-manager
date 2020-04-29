import { Project } from "../model/project";
import { ProjectStatus } from "../model/projectStatus";

export class ProjectRepository{

    private projects: Project[];
    private static instance: ProjectRepository;
    private key: string = 'projects';

    private constructor() {
        this.projects = this.parsedProjects();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectRepository();
        return this.instance;
    }

    getProjects() {
        return this.projects;
    }

    addProject(prj: Project) {
        this.projects.push(prj);
        this.persistProjects();
    }

    removeProject(prjId: string) {
        this.projects = this.projects.filter(prj => {
            return prj.id !== prjId;
        })
        this.persistProjects();
    }

    changeProjectStatus(prjId: string, newStatus: ProjectStatus){
        const prj = this.getProjects().find(prj => prj.id === prjId);
        if (prj && prj.status !== newStatus) {
            prj.status = newStatus;
        }
        this.persistProjects();
    }

    persistProjects() {
        localStorage.removeItem(this.key);
        localStorage.setItem(this.key, this.stringifiedProjects());
    }

    private stringifiedProjects() {
        return JSON.stringify(this.projects);
    }

    private parsedProjects() {
        return JSON.parse(localStorage.getItem(this.key)!) || [];
    }

}