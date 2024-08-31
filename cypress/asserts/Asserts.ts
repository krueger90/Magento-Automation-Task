export class Asserts {

    assertUrlContains(fragment: string): void {
        cy.url().should('contain', fragment);
    }


    assertCustomerWelcome(firstName: string, lastName: string): void {
        cy.get('.greet.welcome').eq(0).invoke('text').then(text => {
            expect(text.replace(/^\s+|\s+$/g, ''))
                .to.contains(`Welcome, ` + `${firstName} ` + `${lastName}!`);
        })
    }

    assertMessage(selector: string, message: string): void {
        cy.get(selector).should('contain.text', message);
    }
}


