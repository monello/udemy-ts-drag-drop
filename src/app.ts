// Project Type
// -----------------------------------------------------------------------------------------------------------

enum ProjectStatus { Active, Complete };

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {

    }
}

// Project State Mangement
// -----------------------------------------------------------------------------------------------------------

type Listener = (items: Project[]) => void;

class ProjectState {
    // The list of all projects
    private projects: Project[] = [];
    // instance will hold the instance of this class' object once instantiated.
    // - has to be 'static' to be available in the static getInstance() method
    private static instance: ProjectState;
    // An array that will list all the event-listeners
    private listeners: Listener[] = [];

    // This method insures that only a single instance of this class can be created
    // Its has to be statis so that you can call it without instantiating the class first.
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    // This function adds listener functions to the listeners array
    // Accepts a function as an argument.
    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    // This method adds projects to the "projects" list property
    addProject(title: string, description: string, peopleCount: number) {
        // Create the stucture of a new project
        // id must be unique per project - Math.random() was just use, quick and dirty for this demo project to avoid getting distracted from the lecture topic
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            peopleCount,
            ProjectStatus.Active
        );

        // Add the new project to the projects list
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            // Seeing as the listeners are in the ProjectState class it means it needs to manage the state of our projects for us
            //    to do that we need to send it the list of our projects as an argument
            // We send a copy of our projects list, so that we don't accidentaly change it somewhere else in our code and get unexpected weird bugs
            // (see making a true copy of an array here: https://codesandbox.io/s/easy-true-copy-an-array-with-slice-lerf22?file=/src/index.js)
            listenerFn(this.projects.slice());
        }
    }
}

// Instantiate the global Project state object
const projectState = ProjectState.getInstance();



// Validation
// -----------------------------------------------------------------------------------------------------------

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

const validate = (validatableInput: Validatable) => {
    let isValid = true;

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    // check if minLength is set and not 0.
    // !== undefined will not check for null, but != null will check for both undefined and null
    // This check only makes sense for strings, so a Type Guard was added to make sure this if statement only executes for strings
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        // if isValid was false during the previous check the next statement will eval to false and won't even check the right-side of '&&'
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}

// Project Lists
// -----------------------------------------------------------------------------------------------------------

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    sectionElement: HTMLElement; // There is no type like HTMLSectionElement - so it's parent type HTMLElement will do
    currentProjects: Project[];

    // Creating a class property with the "shortcut" method by adding the property's accessor and property defnition
    //  in the constructor argument list instead of the class body (as the other props above)
    // Using a literal type (hardcoded text) as a type.
    // Combining two literal types using a union
    constructor(private type: 'active' | 'completed') {
        this.templateElement = document.getElementById('project-list') as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;
        this.currentProjects = [];

        const importedNode = document.importNode(this.templateElement.content, true);

        this.sectionElement = importedNode.firstElementChild as HTMLElement;
        // Create dynamic id for each list item, based on the project "type"
        this.sectionElement.id = `${this.type}-projects`;

        // add an event listener to the ProjectState
        // - listeners are functions
        // - we pass in the projects. This will be the list of projects AT THE TIME when this listener is called
        projectState.addListener((projects: Project[]) => {
            // override the currentProjects with the lastest list of projects
            this.currentProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        // now loop through all the currentprojects en add them to the listEl
        for (const prjItem of this.currentProjects) {
            // now build the new project list-item
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.sectionElement);
    }

    private renderContent() {
        const listId = `${this.type}-project-list`;
        this.sectionElement.querySelector('ul')!.id = listId;
        this.sectionElement.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}

// Project Input and Data Gethering
// -----------------------------------------------------------------------------------------------------------

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formElement: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElemet: HTMLInputElement;
    peopleInputElemet: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;

        // Grab the content from the HTML Template element (HTML Node) and pass in true to make a deep-copy)
        // This creates a document-fragment
        const importedNode = document.importNode(this.templateElement.content, true);

        // Extract the HTML Element (the <form>) from the Fragment
        this.formElement = importedNode.firstElementChild as HTMLFormElement;
        // Add an id-attr to the form, to tie it up with the CSS
        this.formElement.id = 'user-input';

        // Accessing the input element in the form
        // Interrestingly TSC does not require the Null Assertion Operator
        this.titleInputElement = this.formElement.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElemet = this.formElement.querySelector('#description') as HTMLInputElement;
        this.peopleInputElemet = this.formElement.querySelector('#people') as HTMLInputElement;

        // Attach the events to the form element
        this.configure();

        // Now insert the form element
        this.attach();
    }

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
            maxLength: 10
        }
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 10
        }

        // This very basic validation will improved in the next lecture
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
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
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

    // Adds an events to the form
    private configure() {
        // Remember to bind the 'this' context to the submit-handler, else the submit handler's default 'this'
        //  context will be the HTML element it is attached to and not the class in which the event-handler function
        //  is defined (Just one of those lovely JS quirks)
        this.formElement.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        // Insert the new element just after the opening tag of the targetted hostElement
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
    }
}

const prjInput = new ProjectInput();
const activeProjects = new ProjectList('active');
const completedProjects = new ProjectList('completed');
