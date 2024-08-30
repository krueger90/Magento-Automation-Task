export function assertUrlContains(fragment: string) {
    cy.url().should('contain', fragment);
}