/// <reference types="cypress" />

describe('Validates form input', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('checks if projects are created successfully', () => {
        // Project 1
        // -----------------------------------------------------
        let title = 'Project 1';
        let description = 'This is Project 1';
        let people = 1;
        let peopleStr = 'person';

        cy.newProject(title, description, people);

        // Check that the project is in the Active Projects Section
        cy.get('section#active-projects').as('activeProjects');
        // Check that there is exactly 1 project
        cy.get('@activeProjects').find('ul#active-project-list').children().should('have.length', 1);
        // Grab the first (top listed) project (it has to be the first)
        cy.get('@activeProjects').find('ul#active-project-list').find('li').first().as('firstProject');
        // Check the card data
        cy.get('@firstProject').find('h2').should('contain', title);
        cy.get('@firstProject').find('h3').should('contain', `${people} ${peopleStr} assigned`);
        cy.get('@firstProject').find('p').should('contain', description);

        // Project 1
        // -----------------------------------------------------
        title = 'Project 2';
        description = 'This is Project 2';
        people = 2;
        peopleStr = 'people';

        cy.newProject(title, description, people);

        // Check that the project is in the Active Projects Section
        cy.get('section#active-projects').as('activeProjects');
        // Check that there is exactly 2 projects
        cy.get('@activeProjects').find('ul#active-project-list').children().should('have.length', 2);
        // Grab the first (top listed) project (it has to be the first)
        cy.get('@activeProjects').find('ul#active-project-list').find('li').last().as('lastProject');
        // Check the card data
        cy.get('@lastProject').find('h2').should('contain', title);
        cy.get('@lastProject').find('h3').should('contain', `${people} ${peopleStr} assigned`);
        cy.get('@lastProject').find('p').should('contain', description);
    });

    it('tests Drag & Drop funrionality', () => {
        cy.newProject('Draggable 1', 'Draggable 1 Description', 1);

        cy.get('section#active-projects').as('activeProjects');
        cy.get('section#completed-projects').as('completedProjects');

        cy.get('@activeProjects').find('li').first().as('project');

        // Drag the project to completed
        const dataTransfer = new DataTransfer;
        cy.get('@project').trigger('dragstart', { dataTransfer });
        cy.get('#completed-project-list').trigger('drop', { dataTransfer });

        // Check the length of the project lists
        cy.get('@activeProjects').find('ul#active-project-list').children().should('have.length', 0);
        cy.get('@completedProjects').find('ul#completed-project-list').children().should('have.length', 1);

        // ---------

        // Re-grab the project (because Cypress seems to search for it each time, even though is was aliassed)
        cy.get('@completedProjects').find('li').first().as('project2');

        // Drag the project to completed
        cy.get('@project2').trigger('dragstart', { dataTransfer });
        cy.get('#active-project-list').trigger('drop', { dataTransfer });

        // Check the length of the project lists
        cy.get('@activeProjects').find('ul#active-project-list').children().should('have.length', 1);
        cy.get('@completedProjects').find('ul#completed-project-list').children().should('have.length', 0);
    });

});