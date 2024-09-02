export class CheckoutAsserts {

assertNameInShippingStep(selectorFirstName: string, selectorLastName: string, firstName: string, lastName: string): void {
    cy.get('#shipping-new-address-form').find(selectorFirstName)
    .invoke('val').should('contain', firstName);
    cy.get('#shipping-new-address-form').find(selectorLastName)
    .invoke('val').should('contain', lastName);
        }

        

}