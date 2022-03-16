/// <reference path="component.ts" />

namespace App {
    // Project Item
    // -----------------------------------------------------------------------------------------------------------

    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
        implements Draggable {
        private project: Project;

        get peopleAssigned() {
            const people = +this.project.people === 1 ? 'person' : 'people';
            return `${this.project.people} ${people} assigned`;
        }

        constructor(hostId: string, project: Project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }

        dragStartHandler = (event: DragEvent) => {
            // read more on the drag and drop functionality available in JS here: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
            event.dataTransfer!.setData('text/plain', this.project.id);
            // set the cursor during the move
            event.dataTransfer!.effectAllowed = 'move';
        }

        dragEndHandler = (_: DragEvent) => {
            console.log("DRAG ENNDED");

        }

        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }

        renderContent() {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent = this.peopleAssigned;
            this.element.querySelector('p')!.textContent = this.project.description;
        }
    }
}