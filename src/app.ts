/// <reference path="./models/drag-drop.ts" />
/// <reference path="./models/project.ts" />
/// <reference path="./state/project.ts" />
/// <reference path="./utils/validation.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-input.ts" />

namespace App {
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('completed');
}
