import { LOGIN_EMAIL_ADDRESS_INPUT, LOGIN_PASSWORD_INPUT } from "../support/constants";

export class Login {

    fillLoginForm(): void {
        cy.fixture('loginUserData').then(loginUserData => {
            cy.get(LOGIN_EMAIL_ADDRESS_INPUT).type(loginUserData.email);
            cy.get(LOGIN_PASSWORD_INPUT).type(loginUserData.password);
        })
    }

    signIn(): void {
        cy.get('#send2').click();
    }

    fillLoginFormWithIncorrectData(): void {
        cy.get(LOGIN_EMAIL_ADDRESS_INPUT).type('randomemail@test.com');
        cy.get(LOGIN_PASSWORD_INPUT).type('randompass');
    }
}