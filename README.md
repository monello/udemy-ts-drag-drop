# udemy-ts-drag-drop
Course by [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/) | [Understanding typeScript - 2022 Edition](https://www.udemy.com/share/101sTi3@txHQIZUbxFrEWZRvwzklQTDchIc2f_t0A4JBHVRlwzCrfVl9zudwrfkDhRllkFZ-/)

At the bottom of most commits you will find notes about the code changes made during that commit. I only did this for commits with code changes that progress from the previous commit, so any commits to the README.md don't have notes or navigation.
I manually added page-navigation to the commits that show progress in the form of code-changes as applied by following the course.

Some commits deal with key learning points, these I will try to list below in the "Key Commits" section.

# Set-up
1. Clone the repo
2. Install Node.js if you haven't got it installed on your system yet.
3. In the Terminal run `npm install` in the root dir
4. Run `npm install -g typescript`
5. Run `tsc init`
6. Run `npm start` (leave it running)
7. Open a new Terminal and run `tsc -w` (leave it running)
8. In a 3rd teminal run `npx cypress open`

# Key Commits

Comment | Description | Commit Shortcut
| :--- | :--- | :---:
Initial Commit  | Listed here to be able to get to the first commit that starts the pagnation | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/bbda1c9e1b12935ab33d94fcd159493f7e6bc8c4)
Class, Null Assestion, Type-casting | Shows a simple class, how HTML elements are typed and type-casted and how to tell TSC not to warn/error on fetching HTML Elements |  [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/83ead88200d2c1028cd6ec37d0c1d01b2d1813f2)
Extract from a Template and inject into DOM | This commit shows how an HTML element can be extracted from an HTMLTemplateElement and attached/injected into a target element (placeholder) in the DOM. In this case just after the opening tag of the div#app element | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/c72a781f787dc12e967e12c8eb433218404ce692)
Creating and Attaching Event Listeners. Handing the `this` keyword context | This commit show how to create an on-submit handler for a form and how to proeperly attach it to the form element while enfocring the correct `this` keyword context | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/2f9dcebfe951976b30ced296f4bdd30c762e5bc8)
Install and Configure Cypress, First Test Spec | This commit shows how to install Cypress set some basic configurations like baseUrl and setting up Syntax hinting in VSC | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/df7d6c6912080c252cbad02ea69642ce0c82e621)
Spliting Files using namespaces | Show how to split files using TS namespaces Series of 3 commits - use the navigation in the comments at the bottom of each commit) | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/afc4138770676b03d8bbef5db0f7dfcd85505ea7)
Splitting Files using ES Modules | A much better way to split TS (and JS) files. It has better type support and is the recommende route. This does not use WebPack yet. This will be added later | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/b555754339a3eba7f337a8de15ccea0880c4a6c4)
Webpack Installation and initial config | Shows all the changes and steps requited ti get WebPack up and running in the project | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/36676873c67b6bfcee2cc251f7eaa893eb7655e2)
An autobind decorator | An example of inplementing an autobind decorator as was tought in section 9 of the course | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/7d8f0c5b4408e97f145292bde2d1719d5c5e5b54)
Arrow function and `this` keyword context | Here I removed all the code from the previous commit and converted the `submitHanlder()` function to an arrow function to prove how arrow-functions already handle the `this`-keyword context correctly | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/4a2dc12c2efd776e254fdbc48e03564fda044b11)
Gathering User Input | Extracting user input from form input elements and outputting it in a Tuple | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/85ee37147637589ca01fabfe945adde9b8690046)
Data Validation | A basic example of doing data validation. Example usage of an interface to set up a custom Type. Examples of setting up optional properties in an interface (or class) | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/85ee37147637589ca01fabfe945adde9b8690046)
Testing Validation rules with Cypress | Some tests specs to test the validation rules on the form. Some interresting examples of how to asert the content in an alert box and also how to move repeating steps into `Cypress.Commands` | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/50768dfb60e26f85011adced62cf0d9dd9f093ea)
Interface, Literal types, Union types | Example of using an Interface for a custom type. Setting a function's argument type by combining Literal types and Union types | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/6ef6408971c682cd3d63c3086e0d25771b2bdaca)
Singleton classes, Custom Event Listeners and Subscription pattern | This was the most difficult lecture to understand and get through. It deals with managing application state through the help of a Singleton class, Custom Event handlers and triggering the events through a **Subscription** pattern (I still don't have my mind completely wrapped around this concept yet) | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/97d72aa99c4e8c5e6398f93e7c2cf82f3d39b6f3)
Example use of the enum type | Check out lines 4, 12 and 57 in this commit as a easy to follow exampleof how enums can be useful | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/917b8684347b356dd6592ed722d080e7ba6858f4)
Enum, Custom Types | Did some code refactoring to replace the temporary usage of the `any`-types with proper types. This commit shows examples of using an enum and a Custom Type that is a Function with a very specific structure | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/917b8684347b356dd6592ed722d080e7ba6858f4)
Enum usage | Where previous commit showed how to declare a new `Enum`, this one shows how to use them later in your code logic | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/01e8dc58536c83975b662e130fb843fe486ee3a7)
Generics, Abstract Classes, Abstract methods, Generic Constraints | A lengthy example on how to Refactor the code to avoid duplication and get better code re-use. It covers concepts like Generics,  Abstract Classes, Abstract methods and Generic Constraints to implement class inheritance | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/c08822c1afa88ff6b03309f42023172ff8b543b1)
Implementing Drag & Drop | Here is a series of commits that demostrate how to implement drag and drop with built-in JS features and enchaning it with TS. It also gives examples of creating interfaces to be implemented instead of extended (inherited from). | part 1 [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/e2a29603b14beb4bcb4a29cb3db99e6d899b19bb)
 | | | part 2 [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/554aafb8ae20d176bad4fe489491f4116241534b)
 | | | part 3 [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/6ed74604f4e5ce45c0b3051ca34313b1c0e0477a)
 | | | part 4 [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/69630d997d33998ad7d10428d2afa229a3e8fb65)
 Cypress Drag & Drop tests | Created test specs to create new projects, and drag and drop projects. Also used Cypress commands to go DRY | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/d8ad0fd5091a999f67d95dfb174fa38764574504)
WebPack | The next few commits deal with installing, configuring and running WebPack. Official Webpack Docs: https://webpack.js.org/ | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/36676873c67b6bfcee2cc251f7eaa893eb7655e2)
