import { Project } from "../model/project";
import { ProjectStatus } from "../model/projectStatus";
import { ProjectRepository } from "../repositories/ProjectRepository";

type Listener<T> = (projects: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

export class ProjectState extends State<Project> {
    private projectRepo: ProjectRepository = ProjectRepository.getInstance();
    private static instance: ProjectState;
    
    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newPrj = new Project(Math.random().toString(), title, description,
            numOfPeople, ProjectStatus.Active );  
        this.projectRepo.addProject(newPrj);
        this.notifyListeners();
    }

    moveProject(prjId: string, newStatus: ProjectStatus) {
        this.projectRepo.changeProjectStatus(prjId, newStatus);
        this.notifyListeners();
    }

    private notifyListeners() {
        for (const listener of this.listeners) {
            listener(this.projectRepo.getProjects().slice());
        }
    }
}

export const projectState = ProjectState.getInstance();