import { Project } from "../model/project.js";
import { ProjectStatus } from "../model/projectStatus.js";

type Listener<T> = (projects: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

export class ProjectState extends State<Project> {
    private projects: Project[] = [];
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
        this.projects.push(newPrj);
        this.notifyListeners();
    }

    moveProject(prjId: string, newStatus: ProjectStatus) {
        const prj = this.projects.find(prj => prj.id === prjId);
        if (prj && prj.status !== newStatus) {
            prj.status = newStatus;
            this.notifyListeners();
        }
    }

    private notifyListeners() {
        for (const listener of this.listeners) {
            listener(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();