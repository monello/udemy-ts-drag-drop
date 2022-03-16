/// <reference types="cypress" />

describe('Validates form input', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    // EMPTY FORM
    // ------------------------------------------------------------------------------

    it('tests a blank form submission', () => {
        // Leave all the fields blank
        cy.submitAndExpectError();
    });

    // SUCESSFUL SUBMISSION
    // ------------------------------------------------------------------------------

    it('submit a form successfully and reset to empty fields', () => {
        // Fill in the all fields correctly
        cy.get('input#title').as('title').type('TS');
        cy.get('textarea#description').as('desc').type('TypeScript');
        cy.get('input#people').as('people').type(1);

        // Submit the form and asert that fields are reset
        cy.submitAndExpectReset();
    });

    // REQUIRED
    // ------------------------------------------------------------------------------

    it('checks required validation for the title field', () => {
        // Leave title blank

        // Fill in the other field correctly
        cy.get('textarea#description').type('TypeScript');
        cy.get('input#people').type(1);

        // Submit form and assert error-alert
        cy.submitAndExpectError();
    });

    it('checks required validation for the description field', () => {
        // Leave description blank

        // Fill in the other field correctly
        cy.get('input#title').as('title').type('TS');
        cy.get('input#people').type(1);

        // Submit form and assert error-alert
        cy.submitAndExpectError();
    });

    it('checks required validation for the people field', () => {
        // Leave people blank

        // Fill in the other field correctly
        cy.get('input#title').as('title').type('TS');
        cy.get('textarea#description').as('title').type('TypeSript');

        // Submit form and assert error-alert
        cy.submitAndExpectError();
    });

    // DESCRIPTION SPECIFIC
    // ------------------------------------------------------------------------------

    it('checks minLength:5 validation for the descripion field', () => {
        // Fill in the all field correctly, but < 5 chars in dsecription
        cy.get('input#title').as('title').type('TS');
        cy.get('textarea#description').as('desc').type('Type');
        cy.get('input#people').as('people').type(1);

        // Submit form and assert error-alert
        cy.submitAndExpectError();
    });

    it('checks maxLength:100 validation for the descripion field', () => {
        // Fill in the all field correctly, but > 100 chars in dsecription
        cy.get('input#title').as('title').type('TS');
        cy.get('textarea#description').as('desc').type('TypeScript 2022 TypeScript 2022 TypeScript 2022 TypeScript 2022 TypeScript 2022 TypeScript 2022 TypeScript 2022');
        cy.get('input#people').as('people').type(1);

        // Submit form and assert error-alert
        cy.submitAndExpectError();
    });

    it('checks exactly 5 charcaters pass validation for the descripion field', () => {
        // Fill in the other field correctly, but < 5 chars in dsecription
        cy.get('input#title').as('title').type('TS');
        cy.get('textarea#description').as('desc').type('TypeS');
        cy.get('input#people').as('people').type(1);

        // Submit the form and asert that fields are reset
        cy.submitAndExpectReset();
    });

    // PEOPLE SPECIFIC
    // ------------------------------------------------------------------------------

    it('checks min:1 on people field ', () => {
        // Fill in the all fields correctly, but set people 0
        cy.get('input#title').as('title').type('TS');
        cy.get('textarea#description').as('desc').type('TypeScript');
        cy.get('input#people').as('people').type(0);

        // Submit form and assert error-alert
        cy.submitAndExpectError();
    });

    it('checks max:10 on people field ', () => {
        // Fill in the all fields correctly, but set people 11
        cy.get('input#title').as('title').type('TS');
        cy.get('textarea#description').as('desc').type('TypeScript');

        // Set the people max-attr higher to test maxLengh validation, to bypass the HTML config just for the test purposes
        cy.get('input#people').as('people').then(($people) => {
            $people.prop('max', 20);
        });

        cy.get('@people').type(11);

        // Submit form and assert error-alert
        cy.submitAndExpectError();
    });
});