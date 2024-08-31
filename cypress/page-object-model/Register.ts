import { REG_FIRST_NAME_INPUT, REG_LAST_NAME_INPUT, REG_EMAIL_ADDRESS_INPUT, REG_PASSWORD_INPUT, REG_CONFIRM_PASSWORD_INPUT } from "../support/constants";


export class RegisterUser {

    fillRegistrationForm(): void {
        cy.fixture('registerUserData').then(registerUserData => {
            let password = registerUserData[0].password;
            cy.get(REG_FIRST_NAME_INPUT).type(registerUserData[0].firstName);
            cy.get(REG_LAST_NAME_INPUT).type(registerUserData[0].lastName);
            cy.get(REG_EMAIL_ADDRESS_INPUT).type(registerUserData[0].email);
            cy.get(REG_PASSWORD_INPUT).type(password);
            cy.get(REG_CONFIRM_PASSWORD_INPUT).type(password);
        })
    }

    createAccount(): void {
        cy.get('.action.submit.primary').click();
    }

    fillRegistrationFormWithExistingAccount(): void {
        cy.fixture('loginUserData').then(loginUserData => {
            let password = loginUserData.password;
            cy.get(REG_FIRST_NAME_INPUT).type(loginUserData.firstName);
            cy.get(REG_LAST_NAME_INPUT).type(loginUserData.lastName);
            cy.get(REG_EMAIL_ADDRESS_INPUT).type(loginUserData.email);
            cy.get(REG_PASSWORD_INPUT).type(password);
            cy.get(REG_CONFIRM_PASSWORD_INPUT).type(password);
        })
    }
}