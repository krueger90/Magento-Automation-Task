export function assertRegistrationSuccessMessage() {
    cy.get('[data-ui-id=message-success]').should('contain.text', "Thank you for registering with Main Website Store.");
}