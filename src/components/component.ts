export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    insertAtStart: boolean;

    constructor(templateElementId: string, hostElementId: string,
         insertAtStart: boolean, elementId: string) {
             this.templateElement = document.getElementById(templateElementId) as HTMLTemplateElement;
             this.hostElement = document.getElementById(hostElementId)! as T;
             const templateCopy = document.importNode(this.templateElement.content, true);
             this.element = templateCopy.firstElementChild as U;
             this.element.id = elementId; 
             this.insertAtStart = insertAtStart
             this.attach();
         }     
    
    abstract configure():void;
    abstract renderContent():void;

    private attach() {
        this.hostElement.insertAdjacentElement(this.insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

}