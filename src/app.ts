class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formElement: HTMLFormElement

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app') as HTMLDivElement;

        // Grab the content from the HTML Template element (HTML Node) and pass in true to make a deep-copy)
        // This creates a document-fragment
        const importedNode = document.importNode(this.templateElement.content, true);

        // Extract the HTML Element (the <form>) from the Fragment
        this.formElement = importedNode.firstElementChild as HTMLFormElement;
        // Add an id-attr to the form, to tie it up with the CSS
        this.formElement.id = 'user-input';

        // Now insert the form element
        this.attach();
    }

    private attach() {
        // Insert the new element just after the opening tag of the targetted hostElement
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
    }
}

const prjInput = new ProjectInput();