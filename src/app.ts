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
            console.log(title, description, people);
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
