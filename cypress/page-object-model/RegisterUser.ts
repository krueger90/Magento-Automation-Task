import { faker } from "@faker-js/faker";

export class RegisterUser {

    fillRegistrationForm(): void {
        cy.fixture('registerUserData').then(registerUserData => {
            let password = registerUserData[0].password;
            cy.get('#firstname').type(registerUserData[0].firstName);
            cy.get('#lastname').type(registerUserData[0].lastName);
            cy.get('#email_address').type(registerUserData[0].email);
            cy.get('#password').type(password);
            cy.get('#password-confirmation').type(password);
        })
    }

    createAccount(): void {
        cy.get('.action.submit.primary').click();
    }
}