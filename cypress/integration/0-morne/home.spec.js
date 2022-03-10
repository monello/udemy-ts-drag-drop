/// <reference types="cypress" />

describe('Tests on the root page', () => {
    // any actions to run before each test
    beforeEach(() => {
        // go to the route page. The baseUrl is set-up in the cypress.json
        cy.visit('/');
    });

    it('checks that the form loads when the page loads', () => {
        // Check that the form loaded
        // - Alias the form as 'form' to reference later
        // - Check that the form is visible
        cy.get('#user-input').as('form').should('be.visible');

        // Check that the title field exists and is empty
        // (by default it confirms that it's visible and not blocked by other elements)
        cy.get('@form').find('#title').should('be.empty');

        // Check that the description field exists and is empty
        cy.get('@form').find('#description').should('be.empty');

        // Check that the people field exists and is empty
        cy.get('@form').find('#people').should('be.empty');

        // Check that the Add Project button exists and has the correct text
        cy.get('@form').find('button[type="submit"]').contains('ADD PROJECT')

        // Check that the Title label is correct
        cy.get('@form').find('label[for="title"]').contains('Title')

        // Check that the Description label is correct
        cy.get('@form').find('label[for="description"]').contains('Description')

        // Check that the people label is correct
        cy.get('@form').find('label[for="people"]').contains('People')
    });
});