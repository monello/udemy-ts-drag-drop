// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('submitAndExpectError', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('form#user-input')
        .find('button[type="submit"]')
        .click()
        .then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Invalid input, please try again!')
        });
});

Cypress.Commands.add('submitAndExpectReset', () => {
    cy.get('form#user-input')
        .find('button[type="submit"]')
        .click()

    // Submit form and assert that form field are cleared
    cy.get('@title').should('have.value', '');
    cy.get('@desc').should('have.value', '');
    cy.get('@people').should('have.value', '');
});