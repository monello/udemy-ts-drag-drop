// autobind decorator
//  - The underscore variables tell TS that we don't need these input parameters,
//      but we must add them to get to the parameter(s) we do need.
const autobind = (
    _: any, // target: any,
    _2: string, // methodName: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        // Using a getter "get()", is an alternative way to add a "value" to the new PropertyDescriptor
        // You cannot have a "value" and a "getter" (or "setter") on the same ProprtyDescriptor
        // get() was picked here as it is a function gives us the correct context for the this-keyword (ie the
        //    class/object the property that this ProperyDescriptor describes)
        //    Its is also useful that is ie a function in case we wanted to add som extra logic before return the value.
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;

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

    // The on-submit handler function for the form
    @autobind
    private submitHandler(event: Event) {
        // Prevent the form from sending an HTTPRequest (it's default behaviour on-submit)
        event.preventDefault();
        // Temporatu code to confirm that our submitHandler does indeed fire when the form-submit fires
        console.log(this.titleInputElement.value);

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
