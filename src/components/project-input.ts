import Component from "./component.js";
//import { validate, foobar } from "../utils/validation";
import * as validation from "../utils/validation.js";   // example of a bundled import using an alias
import { projectState as ProjectState } from "../state/project.js"; // Example of aliasing a single import

validation.foobar();

// Project Input and Data Gethering
export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElemet: HTMLInputElement;
    peopleInputElemet: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        // Accessing the input element in the form
        // Interrestingly TSC does not require the Null Assertion Operator
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElemet = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElemet = this.element.querySelector('#people') as HTMLInputElement;

        // Attach the events to the form element
        this.configure();
    }

    // PUBLIC METHODS

    // Adds an events to the form
    configure() {
        // Remember to bind the 'this' context to the submit-handler, else the submit handler's default 'this'
        //  context will be the HTML element it is attached to and not the class in which the event-handler function
        //  is defined (Just one of those lovely JS quirks)
        this.element.addEventListener('submit', this.submitHandler)
    }

    // This function is added to satisfy the abstract non-option method requirement from the `Component` base class
    renderContent(): void { }

    // PRIVATE METHODS

    // This function gets all the input data from the form elements and returns it as a Tuple
    // - example use of a Tuple return type for a function
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElemet.value;
        const enteredPeople = +this.peopleInputElemet.value;

        // Set up some validatableInput objects to send to the valdate() function
        const titleValidatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
            maxLength: 100
        }
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 10
        }

        // This very basic validation will improved in the next lecture
        if (
            !validation.validate(titleValidatable) ||
            !validation.validate(descriptionValidatable) ||
            !validation.validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription, enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElemet.value = '';
        this.peopleInputElemet.value = '';
    }

    // The on-submit handler function for the form
    private submitHandler = (event: Event) => {
        // Prevent the form from sending an HTTPRequest (it's default behaviour on-submit)
        event.preventDefault();
        const userInput = this.gatherUserInput();
        // Check if the return type is a Tuple
        // - keep in mind TS gets compiled to JS and JS does not have a Tuple type, so we can use 'userInput instanceof Tuple'
        // - Tuples get compiled to arrays in JS (that is why it has the sntax it has in TS) and we can check for arrays:
        //      Option 1: userInput instanceof Array
        //      Option 2: Array.isArray(userInput) // The lecturer went with this option
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            ProjectState.addProject(title, description, people); // need to update ProjectState here as it was alliased in the import
            this.clearInputs();
        }
    }
}
