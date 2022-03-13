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
An autobind decorator | An example of inplementing an autobind decorator as was tought in section 9 of the course | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/7d8f0c5b4408e97f145292bde2d1719d5c5e5b54)
Arrow function and `this` keyword context | Here I removed all the code from the previous commit and converted the `submitHanlder()` function to an arrow function to prove how arrow-functions already handle the `this`-keyword context correctly | [:octocat:](https://github.com/monello/udemy-ts-drag-drop/commit/4a2dc12c2efd776e254fdbc48e03564fda044b11)
