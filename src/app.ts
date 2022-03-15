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
    ) { }
}

// Project State Mangement
// -----------------------------------------------------------------------------------------------------------

// Now that we are refactoring the code to be more generic and have state applied to potentially more than just Project State
//  we need to also make the- Listener Generic as it might not always return an array of projects `Project[]`
type Listener<T> = (items: T[]) => void;

class State<T> {
    // An array that will list all the event-listeners
    // - we now "forward" the generic type <T> to our Listener
    // - we set the visibility to `protected` to make the listeners property available to child classes (classes that inherit from State ie. extends State)
    protected listeners: Listener<T>[] = [];

    // This function adds listener functions to the listeners array
    // Accepts a function as an argument.
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    // The list of all projects
    private projects: Project[] = [];
    // instance will hold the instance of this class' object once instantiated.
    // - has to be 'static' to be available in the static getInstance() method
    private static instance: ProjectState;

    // Add a private constructor (even if you don't have a body for it), as this will avoid the default
    //   of a public constructor when you don't add one.
    // You want to avoid a public constructor when you build a Singleton, else the class can still be instantiated
    //   multiple times - thus the class would NOT be a Singleton
    private constructor() {
        super();
    }

    // This method insures that only a single instance of this class can be created
    // Its has to be statis so that you can call it without instantiating the class first.
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
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

// Component Base Class
// -----------------------------------------------------------------------------------------------------------

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newlementId?: string
    ) {
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newlementId) {
            this.element.id = newlementId;
        }

        this.attach(insertAtStart);
    }

    // PUBLIC METHODS

    abstract configure(): void;
    abstract renderContent(): void;

    // PRIVATE METHODS

    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }


}

// Project Item
// -----------------------------------------------------------------------------------------------------------

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }

    configure() { }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.people.toString();
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

// Project Lists
// -----------------------------------------------------------------------------------------------------------

class ProjectList extends Component<HTMLElement, HTMLDivElement> {
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

    // PUBLIC METHODS

    configure() {
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

// Project Input and Data Gethering
// -----------------------------------------------------------------------------------------------------------

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}

const prjInput = new ProjectInput();
const activeProjects = new ProjectList('active');
const completedProjects = new ProjectList('completed');
