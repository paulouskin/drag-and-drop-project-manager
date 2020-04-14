import { Component } from "./component.js";
import { Draggable } from "../model/drag-drop.js";
import { Project } from "../model/project.js";
import { autobind } from "../decorators/autobind.js";


export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.numOfPeople === 1) {
            return '1 person';
        } else {
            return `${this.project.numOfPeople} persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(event: DragEvent) {
        console.log('Drag ended');
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler)
    }
    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons.toString();
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}