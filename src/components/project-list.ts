import { projectState } from "../state/project";
import Component from "./component";
import ProjectItem from "./project-item";
import Project, { ProjectStatus } from "../models/project";
import { DragTarget } from "../models/drag-drop";

// Project Lists
export default class ProjectList extends Component<HTMLElement, HTMLDivElement> implements DragTarget {
    currentProjects: Project[];

    // Creating a class property with the "shortcut" method by adding the property's accessor and property defnition
    //  in the constructor argument list instead of the class body (as the other props above)
    // Using a literal type (hardcoded text) as a type.
    // Combining two literal types using a union
    constructor(private type: 'active' | 'completed') {
        super('project-list', 'app', false, `${type}-projects`);
        this.currentProjects = [];
        this.configure();
        this.renderContent();
    }

    // give a visual clue to the user when he/she is dragging over a valid drop-target
    dragOverHandler = (event: DragEvent) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            // In JS a drop is ONLY ALLOWED if the if the drag-over handler on the SAME event has preventDefault()
            // The DEFAULT of JS Drag & Drop events is not NOT allow dropping, so you have to prevent this default explicitly
            event.preventDefault();

            const listElement = this.element.querySelector('ul')!;
            // Adding a class to an element (this is normal JS not TS specific)
            listElement.classList.add('droppable');
        }

    }

    dropHandler = (event: DragEvent) => {
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            prjId,
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Complete
        );
    }

    dragLeaveHandler = (_: DragEvent) => {
        const listElement = this.element.querySelector('ul')!;
        // Adding a class to an element (this is normal JS not TS specific)
        listElement.classList.remove('droppable');
    }

    // PUBLIC METHODS

    configure() {
        // add an event listener for the dragover event
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        // add an event listener to the ProjectState
        // - listeners are functions
        // - we pass in the projects. This will be the list of projects AT THE TIME when this listener is called
        projectState.addListener((projects: Project[]) => {
            // Filter the projects by status.
            // .filter() return a new array (ie. not a reference to the original array we are enumerating)
            const filteredProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active
                }
                return prj.status === ProjectStatus.Complete
            })

            // override the currentProjects with the lastest list of projects
            this.currentProjects = filteredProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    // PRIVATE METHODS

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        // a very basic solution to the problem of projects getting repeated to the list is to just
        //   empty out the list element before we append the projects
        // In real-life a more elegant sultion can be done, but we're going with a simple one to keep the
        //   focus on the learning points of this course
        listEl.innerHTML = '';
        // now loop through all the currentprojects en add them to the listEl
        for (const prjItem of this.currentProjects) {
            // now build the new project list-item
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem)
        }
    }
}
