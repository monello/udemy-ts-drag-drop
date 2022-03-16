namespace App {
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

    export class ProjectState extends State<Project>{
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
            this.updateListeners();
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }

        private updateListeners() {
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
    export const projectState = ProjectState.getInstance();
}