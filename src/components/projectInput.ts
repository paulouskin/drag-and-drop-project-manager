import { projectState } from "../state/projectState";
import { Component } from "./component";
import { autobind } from "../decorators/autobind";

type Predicate = (argument: string | number) => boolean;

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
    }
    
    configure() {
        this.element.addEventListener('submit', this.submitHandler);    
    }

    renderContent() {}

    private validate(properties:(string | number)[], predicates: Array<Predicate>){
        let isValid = true;
        for(const predicate of predicates){
            isValid = isValid && 
                (properties.filter(prop => predicate(prop)).length === properties.length);
        }
        return isValid;
    }

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = +this.peopleInputElement.value;
        const predicates:Array<Predicate> = [
            (x:string | number)=>{return x.toString().trim().length !== 0},
            (x:string | number)=>{return typeof x === 'number' ? x > 0 : true},
        (x: string | number) => { return typeof x === 'string' ? x.trim().length > 2 : true },
        (x: string | number) => { return typeof x === 'string' ? x.trim().length < 20 : true},
     ]
        if (!this.validate([title, description, people], predicates)) {
            alert('Invalid project object');
            return;
        } else {
            return [title, description, people];
        }
    }

    private clearUserInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            console.log(title, description, people);
        }
        this.clearUserInput();
    }
}
